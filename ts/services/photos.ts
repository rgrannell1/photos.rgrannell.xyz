import { KnownRelations, PHOTO_WIDTH } from "../constants.ts";
import { asUrn, TribbleDB } from "@rgrannell1/tribbledb";
import { Country, Photo, Place, Subject } from "../types.ts";
import { parsePhoto } from "../parsers/photo.ts";
import { readParsedThing, readParsedThings } from "./things.ts";
import { readParsedSubjects } from "./subjects.ts";
import { readParsedLocations } from "./location.ts";

const coloursCache: Map<string, string> = new Map();

export class Photos {
  /*
   * Determine whether a photo should be eagerly or lazily loaded
   * depending on page position
   */
  static loadingMode(idx: number): "eager" | "lazy" {
    const viewportWidth = globalThis.innerWidth;
    const viewportHeight = globalThis.innerHeight;

    const imageDimension = PHOTO_WIDTH;
    const maxImagesPerRow = Math.floor(viewportWidth / imageDimension);
    const maxRowsInFold = Math.floor(viewportHeight / imageDimension);

    return idx > (maxImagesPerRow * maxRowsInFold) + 1 ? "lazy" : "eager";
  }

  /*
   * Convert a mosaic colour string into a bitmap data URL
   */
  static encodeBitmapDataURL(colours: string): string {
    if (coloursCache.has(colours)) {
      return coloursCache.get(colours) as string;
    }

    const coloursList = colours.split("#").map((colour: string) =>
      `#${colour}`
    );
    const canvas = document.createElement("canvas");
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

    coloursCache.set(colours, canvas.toDataURL("image/png"));
    return coloursCache.get(colours) as string;
  }
}

/* */
export function readPhotos(tdb: TribbleDB): Photo[] {
  return tdb.search({
    source: { type: "photo" },
  }).objects().flatMap((obj) => {
    const photo = parsePhoto(tdb, obj);
    return photo ? [photo] : [];
  });
}

/*
 * Read the locations and subjects assaociated with a set of photo ids
 */
export function readThingsByPhotoIds(tdb: TribbleDB, photoIds: Set<string>): {
  locations: (Country | Place)[];
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
    subjects: readParsedSubjects(tdb, subjects),
    locations: readParsedLocations(tdb, locations),
  };
}

export const readPhoto = (
  tdb: TribbleDB,
  id: string,
) => {
  return readParsedThing(parsePhoto, tdb, id);
};

export const readParsedPhotos = (
  tdb: TribbleDB,
  urns: Set<string>,
) => {
  return readParsedThings(parsePhoto, tdb, urns);
};
