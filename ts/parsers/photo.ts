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
  summary: z.string().optional(),
});

/*
 * Parse photo from a triple object
 *
 * @param tdb - The TribbleDB instance
 * @param photo - The triple object representing the photo
 * @returns The parsed Photo or undefined if parsing fails
 */
export function parsePhoto(
  tdb: TribbleDB,
  photo: TripleObject,
): Photo | undefined {
  const result = PhotoSchema.safeParse(photo);
  if (!result.success) {
    console.error(result.error.issues);
    return;
  }

  return result.data satisfies Photo;
}
