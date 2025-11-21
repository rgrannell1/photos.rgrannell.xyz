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
 * Convert a mosaic colour string into a bitmap data URL
 */
export function encodeBitmapDataURL(colours: string): string {
  if (COLOURS_CACHE.has(colours)) {
    return COLOURS_CACHE.get(colours) as string;
  }

  const coloursList = colours.split("#").map((colour: string) => `#${colour}`);
  const canvas = (window as any).document.createElement("canvas");
  canvas.width = 2;
  canvas.height = 2;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("context missing");
  }
  ctx.fillStyle = coloursList[1];
  ctx.fillRect(0, 0, 1, 1);
  ctx.fillStyle = coloursList[2];
  ctx.fillRect(1, 0, 1, 1);
  ctx.fillStyle = coloursList[3];
  ctx.fillRect(0, 1, 1, 1);
  ctx.fillStyle = coloursList[4];
  ctx.fillRect(1, 1, 1, 1);

  COLOURS_CACHE.set(colours, canvas.toDataURL("image/png"));
  return COLOURS_CACHE.get(colours) as string;
}

/*
 * Read all photos, sorted by date
 */
export function readAllPhotos(tdb: TribbleDB): Photo[] {
  const photos = tdb.search({
    source: {type: 'photo'}
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

function sortByRating(photoa: Photo, photob: Photo) {
  const ratingA = photoa.rating;
  const ratingB = photob.rating;

  return ratingB.toLocaleString().localeCompare(ratingA.toLocaleString());
}

/*
 * Read a cover image for a thing
 */
export function chooseThingCover(
  tdb: TribbleDB,
  thingUrn: string,
) {
  const { type, id } = asUrn(thingUrn);

  const cover = readThingCover(tdb, thingUrn);
  if (cover) {
    return cover;
  }

  const results = tdb.search({
    source: { type: "photo" },
    target: { type, id },
  }).sources();

  const photos = readPhotos(tdb, new Set(results)).sort(sortByRating);

  return photos.length > 0 ? photos[0] : null;
}
