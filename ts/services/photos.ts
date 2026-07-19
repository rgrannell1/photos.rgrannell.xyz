import { KnownRelations, PHOTO_WIDTH } from "../constants.ts";
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

const COLOURS_CACHE: Map<string, string> = new Map();

/*
 * Convert a mosaic colour string into a bitmap data URL.
 * The string is a #-separated list of hex colours in row-major order.
 * cols and rows default to 2 for backward compatibility.
 *
 * This is extremely slow and blocking! 110ms
 */
export function encodeBitmapDataURL(
  colours: string,
  cols = 2,
  rows = 2,
): string {
  const cacheKey = `${cols}x${rows}:${colours}`;
  if (COLOURS_CACHE.has(cacheKey)) {
    return COLOURS_CACHE.get(cacheKey) as string;
  }

  const coloursList = colours.split("#").filter(Boolean).map((colour: string) =>
    `#${colour}`
  );
  const canvas = document.createElement("canvas");
  canvas.width = cols;
  canvas.height = rows;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("context missing");
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const colour = coloursList[row * cols + col];
      if (!colour) break;
      ctx.fillStyle = colour;
      ctx.fillRect(col, row, 1, 1);
    }
  }

  COLOURS_CACHE.set(cacheKey, canvas.toDataURL("image/png"));
  return COLOURS_CACHE.get(cacheKey) as string;
}

/*
 * Read all photos, sorted by date
 */
export function readAllPhotos(tdb: TribbleDB): Photo[] {
  const photos = tdb.search({
    source: { type: "photo" },
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
    source: { type: "photo" },
  }).objects();

  return photoObjects
    .sort((objA, objB) =>
      parseInt(objB.createdAt as string) - parseInt(objA.createdAt as string)
    )
    .map((obj) => one(obj.id)!)
    .filter((urn): urn is string => Boolean(urn));
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

  for (const photoId of photoIds) {
    const pid = asUrn(photoId);

    const obj = tdb.search({
      source: { type: pid.type, id: pid.id },
      relation: [KnownRelations.LOCATION, KnownRelations.SUBJECT],
    }).firstObject(true);

    if (!obj) {
      continue;
    }

    const location = obj?.location ?? [];
    const subject = obj?.subject ?? [];

    for (const loc of location) {
      locations.add(loc);
    }
    for (const subj of subject) {
      subjects.add(subj);
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
    .filter({ type: "photo" })
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
    source: { type: "photo" },
    relation: "cover",
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
    source: { type: "photo" },
    relation: "cover",
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
 */
export function readCategoryCover(
  tdb: TribbleDB,
  type: string,
): Photo | undefined {
  const source = tdb.search({
    source: { type: "photo" },
    relation: "cover",
    target: { type: "listing", id: type },
  }).firstSource();

  return source ? readPhoto(tdb, source) : undefined;
}
