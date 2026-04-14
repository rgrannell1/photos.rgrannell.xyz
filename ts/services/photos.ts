import { KnownRelations, PHOTO_WIDTH } from "../constants.ts";
import { asUrn, TribbleDB } from "@rgrannell1/tribbledb";
import type { Location, Photo, Subject } from "../types.ts";
import {
  readLocations,
  readPhoto,
  readPhotos,
  readSubjects,
} from "./readers.ts";

/*
 * Determine whether a photo should be eagerly or lazily loaded
 * depending on page position
 */
export function loadingMode(idx: number): "eager" | "lazy" {
  const viewportWidth = (globalThis as any).innerWidth;
  const viewportHeight = (globalThis as any).innerHeight;

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
export function encodeBitmapDataURL(colours: string, cols = 2, rows = 2): string {
  const cacheKey = `${cols}x${rows}:${colours}`;
  if (COLOURS_CACHE.has(cacheKey)) {
    return COLOURS_CACHE.get(cacheKey) as string;
  }

  const coloursList = colours.split("#").filter(Boolean).map((colour: string) => `#${colour}`);
  const canvas = (window as any).document.createElement("canvas");
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
  const photoIds = new Set<string>();

  for (const thingUrn of thingsUrns) {
    const { type, id } = asUrn(thingUrn);

    const results = tdb.search({
      source: { type: "photo" },
      //relation: KnownRelations.SUBJECT, TODO
      target: { type, id },
    }).sources();

    for (const result of results) {
      photoIds.add(result);
    }
  }

  return readPhotos(tdb, photoIds).sort((photoa, photob) => {
    return parseInt(photob.createdAt) - parseInt(photoa.createdAt);
  });
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

