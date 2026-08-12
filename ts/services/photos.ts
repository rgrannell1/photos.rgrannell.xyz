import { PHOTO_WIDTH } from "../constants/layout.ts";
import { KnownRelations, KnownTypes } from "../constants/data.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Country, Location, Photo, Subject } from "../types.ts";
import {
  readCountries,
  readLocations,
  readPhoto,
  readPhotos,
  readSubjects,
} from "./readers.ts";
import { arrayify, one } from "../commons/arrays.ts";
import { isTaxonUrn } from "../commons/urn.ts";
import { thumbHashFromBase64, thumbHashToRGBA } from "../vendor/thumbhash.ts";

/*
 * Determine whether a photo should be eagerly or lazily loaded
 * depending on page position
 */
export function loadingMode(idx: number): "eager" | "lazy" {
  const viewportWidth = globalThis.innerWidth;
  const viewportHeight = globalThis.innerHeight;

  const imageDimension = PHOTO_WIDTH;
  const maxImagesPerRow = Math.floor(viewportWidth / imageDimension);
  const maxRowsInFold = Math.floor(viewportHeight / imageDimension);

  return idx > (maxImagesPerRow * maxRowsInFold) + 1 ? "lazy" : "eager";
}

/*
 * The year a photo was taken. createdAt holds epoch milliseconds as a string.
 * Returns NaN when the value is missing or unparseable.
 */
export function photoYear(photo: Photo): number {
  return new Date(parseInt(photo.createdAt)).getFullYear();
}

// a run of consecutive photos from one year, with its heading state
export type PhotoYearGroup = {
  year: number;
  // the current year runs headerless, matching the albums page
  showHeading: boolean;
  photos: Photo[];
};

/*
 * Pure transform: split a date-sorted photo list into consecutive year runs.
 * Photos with no usable date join the run above them rather than starting one.
 */
export function groupPhotosByYear(
  photos: Photo[],
  currentYear: number,
): PhotoYearGroup[] {
  const groups: PhotoYearGroup[] = [];

  for (const photo of photos) {
    const year = photoYear(photo);
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && (lastGroup.year === year || !Number.isFinite(year))) {
      lastGroup.photos.push(photo);
      continue;
    }

    const showHeading = Number.isFinite(year) && year !== currentYear;
    groups.push({ year, showHeading, photos: [photo] });
  }

  return groups;
}

const PLACEHOLDER_CACHE: Map<string, string> = new Map();

/*
 * Convert an unpadded-base64 ThumbHash string into a placeholder PNG data URL.
 * Returns null for missing, legacy hex-mosaic, or malformed values: a bad
 * placeholder must degrade to no placeholder, never break the page render.
 */
export function thumbHashDataUrl(hash: string | null | undefined): string | null {
  if (!hash || hash.startsWith("#")) {
    return null;
  }

  const cached = PLACEHOLDER_CACHE.get(hash);
  if (cached !== undefined) {
    return cached;
  }

  let decoded;
  try {
    decoded = thumbHashToRGBA(thumbHashFromBase64(hash));
  } catch {
    return null;
  }
  const { width, height, rgba } = decoded;
  if (!width || !height) {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("context missing");
  }

  const pixels = new ImageData(new Uint8ClampedArray(rgba), width, height);
  ctx.putImageData(pixels, 0, 0);

  const dataUrl = canvas.toDataURL("image/png");
  PLACEHOLDER_CACHE.set(hash, dataUrl);
  return dataUrl;
}

/*
 * Read all photos, sorted by date
 */
export function readAllPhotos(tdb: TribbleDB): Photo[] {
  const photos = tdb.search({
    source: { type: KnownTypes.PHOTO },
  }).sources();

  return readPhotos(tdb, photos).sort((photoa, photob) => {
    return parseInt(photob.createdAt) - parseInt(photoa.createdAt);
  });
}

/*
 * Return all photo URNs sorted by date, without parsing each photo.
 * Sorting on raw TripleObjects avoids 1000+ valibot validation calls upfront.
 */
export function readAllPhotoUrns(tdb: TribbleDB): string[] {
  const photoObjects = tdb.search({
    source: { type: KnownTypes.PHOTO },
  }).objects();

  return photoObjects
    .sort((objA, objB) =>
      parseInt(one(objB.createdAt) ?? "0") - parseInt(one(objA.createdAt) ?? "0")
    )
    .map((obj) => one(obj.id))
    .filter((urn): urn is string => urn !== undefined);
}

/*
 * Read the locations and subjects associated with a set of photo ids
 */
export function readThingsByPhotoIds(tdb: TribbleDB, photoIds: Set<string>): {
  locations: Location[];
  subjects: Subject[];
} {
  const locations = new Set<string>();
  const subjects = new Set<string>();

  // one search for the whole photo set, not one per photo
  const photoIdList = [...photoIds].map((photoUrn) => asUrn(photoUrn).id);
  const triples = tdb.search({
    source: { type: KnownTypes.PHOTO, id: photoIdList },
    relation: [KnownRelations.LOCATION, KnownRelations.SUBJECT],
  }).triples();

  for (const [, relation, target] of triples) {
    if (relation === KnownRelations.LOCATION) {
      locations.add(target);
    } else if (!isTaxonUrn(target)) {
      // derived taxon subjects stay out of subject lists; species only
      subjects.add(target);
    }
  }

  return {
    subjects: readSubjects(tdb, subjects),
    locations: readLocations(tdb, locations),
  };
}

/* */
export function readPhotosByThingIds(
  tdb: TribbleDB,
  thingsUrns: Set<string>,
): Photo[] {
  // select the things by type and id, so qs-variant URNs match too
  let things = tdb.nodes([]);
  for (const thingUrn of thingsUrns) {
    const { type, id } = asUrn(thingUrn);
    things = things.union(tdb.nodes({ type, id }));
  }

  const photoIds = things
    .referencedBy()
    .filter({ type: KnownTypes.PHOTO })
    .urns();

  return readPhotos(tdb, photoIds).sort((photoa, photob) => {
    return parseInt(photob.createdAt) - parseInt(photoa.createdAt);
  });
}

/*
 * Read every cover photo for a given thing type in a single search, keyed by URN id.
 * Bulk equivalent of readThingCover — avoids a per-row search, each of which
 * re-resolves the full photo node set and blocks the main thread.
 */
export function readThingCovers(tdb: TribbleDB, type: string): Map<string, Photo> {
  const coverTriples = tdb.search({
    source: { type: KnownTypes.PHOTO },
    relation: KnownRelations.COVER,
    target: { type },
  }).triples();

  const covers = new Map<string, Photo>();
  for (const coverTriple of coverTriples) {
    const source: string = coverTriple[0];
    const id = asUrn(coverTriple[2]).id;
    if (covers.has(id)) {
      continue;
    }
    const photo = readPhoto(tdb, source);
    if (photo) {
      covers.set(id, photo);
    }
  }

  return covers;
}

export function readThingCover(
  tdb: TribbleDB,
  thingUrn: string,
): Photo | undefined {
  const { type, id } = asUrn(thingUrn);

  const source = tdb.search({
    source: { type: KnownTypes.PHOTO },
    relation: KnownRelations.COVER,
    target: { type, id },
  }).firstSource();

  return source ? readPhoto(tdb, source) : undefined;
}

/*
 * Find all unique countries where photos of a given set of things were taken, sorted by name.
 */
export function readSeenInCountries(
  tdb: TribbleDB,
  thingUrns: Set<string>,
): Country[] {
  const photos = readPhotosByThingIds(tdb, thingUrns);
  const countryUrnSet = new Set<string>();

  for (const photo of photos) {
    for (const countryUrn of arrayify(photo.country)) {
      countryUrnSet.add(countryUrn);
    }
  }

  return readCountries(tdb, countryUrnSet).sort(
    (countryA, countryB) => countryA.name.localeCompare(countryB.name),
  );
}

/*
 * Look up the pre-computed cover photo for a top-level listing type (e.g. "bird", "place").
 * The cover triple is written by mirror's ListingCoverReader during publish and has the form:
 *   urn:ró:photo:<id>  cover  urn:ró:listing:<type>
 * Falls back to any entity cover of the type when mirror has no listing cover.
 */
export function readCategoryCover(
  tdb: TribbleDB,
  type: string,
): Photo | undefined {
  const source = tdb.search({
    source: { type: KnownTypes.PHOTO },
    relation: KnownRelations.COVER,
    target: { type: KnownTypes.LISTING, id: type },
  }).firstSource() ?? tdb.search({
    source: { type: KnownTypes.PHOTO },
    relation: KnownRelations.COVER,
    target: { type },
  }).firstSource();

  return source ? readPhoto(tdb, source) : undefined;
}
