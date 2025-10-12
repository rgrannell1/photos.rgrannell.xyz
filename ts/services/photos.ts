import { PHOTO_WIDTH } from "../constants";

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

import { TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { Photo } from "../types.ts";
import { z } from "zod";

const PhotoSchema = z.object({
  albumId: z.string(),
  country: z.union([z.string(), z.array(z.string())]).optional(),
  createdAt: z.string(),
  subject: z.string().optional(),
  exposureTime: z.string().optional(),
  fStop: z.string().optional(),
  focalLength: z.string().optional(),
  fullImage: z.string(),
  height: z.string().optional(),
  id: z.string(),
  iso: z.string().optional(),
  location: z.union([z.string(), z.array(z.string())]).optional(),
  midImageLossyUrl: z.string(),
  model: z.string().optional(),
  mosaicColours: z.string(),
  pngUrl: z.string(),
  rating: z.string().optional(),
  style: z.string().optional(),
  thumbnailUrl: z.string(),
  width: z.string().optional(),
  description: z.string().optional(),
});

export function parsePhoto(tdb: TribbleDB, photo: TripleObject): Photo {
  const result = PhotoSchema.safeParse(photo);
  if (!result.success) {
    throw new Error(
      `Invalid photo object: ${JSON.stringify(result.error.issues)}`,
    );
  }

  return {
    albumId: result.data.albumId,
    country: result.data.country,
    createdAt: result.data.createdAt,
    exposureTime: result.data.exposureTime,
    fStop: result.data.fStop,
    focalLength: result.data.focalLength,
    fullImage: result.data.fullImage,
    height: result.data.height,
    id: result.data.id,
    iso: result.data.iso,
    location: result.data.location,
    midImageLossyUrl: result.data.midImageLossyUrl,
    model: result.data.model,
    mosaicColours: result.data.mosaicColours,
    pngUrl: result.data.pngUrl,
    rating: result.data.rating,
    style: result.data.style,
    thumbnailUrl: result.data.thumbnailUrl,
    width: result.data.width,
    description: result.data.description,
  };
}

export function readPhotos(tdb: TribbleDB): Photo[] {
  return tdb.search({
    source: { type: "photo" },
  }).objects().map(parsePhoto.bind(null, tdb));
}
