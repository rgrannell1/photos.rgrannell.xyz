import { PHOTO_WIDTH } from "../constants/layout.ts";
import { KnownRelations, KnownTypes } from "../constants/data.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Country, Photo } from "../types.ts";
import {
  readCountries,
  readPhoto,
  readPhotos,
} from "./readers.ts";
import { arrayify, one } from "../commons/arrays.ts";
import { thumbHashFromBase64, thumbHashToRGBA } from "../vendor/thumbhash.ts";
import { parsePhoto } from "./parsers.ts";

export function loadingMode(idx: number): "eager" | "lazy" {
  const viewportWidth = globalThis.innerWidth;
  const viewportHeight = globalThis.innerHeight;

  const imageDimension = PHOTO_WIDTH;
  const maxImagesPerRow = Math.floor(viewportWidth / imageDimension);
  const maxRowsInFold = Math.floor(viewportHeight / imageDimension);

  return idx > (maxImagesPerRow * maxRowsInFold) + 1 ? "lazy" : "eager";
}

/* createdAt holds epoch milliseconds as string. Returns NaN if missing/unparseable. */
export function photoYear(photo: Photo): number {
  return new Date(parseInt(photo.createdAt)).getFullYear();
}

// Consecutive photos from one year.
export type PhotoYearGroup = {
  year: number;
  // the current year runs headerless, matching the albums page
  showHeading: boolean;
  photos: Photo[];
};

/* Undated photos join the run above. They do not start one. */
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

/* ThumbHash to placeholder PNG. Null for missing, legacy, or malformed hashes. */
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

export function readAllPhotos(tdb: TribbleDB): Photo[] {
  const photos = tdb.search({
    source: { type: KnownTypes.PHOTO },
  }).sources();

  return readPhotos(tdb, photos).sort((photoa, photob) => {
    return parseInt(photob.createdAt) - parseInt(photoa.createdAt);
  });
}

/* Sorting on raw TripleObjects avoids valibot validation overhead. */
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

/* Bulk equivalent of readThingCover. Single search avoids per-row blocking. */
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
  const [photoUrn] = tdb.nodes({ type, id })
    .referencedBy(KnownRelations.COVER)
    .filter({ type: KnownTypes.PHOTO })
    .urns();
  const photo = photoUrn ? tdb.readThing(photoUrn) : undefined;

  return photo ? parsePhoto(tdb, photo) : undefined;
}

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

/* Pre-computed by mirror. Falls back to entity cover if no listing cover. */
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
