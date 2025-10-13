import { TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { z } from "zod";
import { Photo } from "../types";

const PhotoSchema = z.object({
  albumId: z.string(),
  country: z.union([z.string(), z.array(z.string())]).optional(),
  createdAt: z.string(),
  subject: z.union([z.string(), z.array(z.string())]).optional(),
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

export function parsePhoto(
  tdb: TribbleDB,
  photo: TripleObject,
): Photo | undefined {
  const result = PhotoSchema.safeParse(photo);
  if (!result.success) {
    console.error(result.error.issues);

    return undefined;
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
