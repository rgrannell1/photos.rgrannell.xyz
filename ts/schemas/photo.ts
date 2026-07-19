/*
 * Valibot schema for photo entities.
 */

import * as v from "valibot";

export const PhotoSchema = v.object({
  albumId: v.string(),
  country: v.optional(v.union([v.string(), v.array(v.string())])),
  createdAt: v.string(),
  subject: v.optional(v.union([v.string(), v.array(v.string())])),
  exposureTime: v.optional(v.string()),
  fStop: v.optional(v.string()),
  focalLength: v.optional(v.string()),
  fullImage: v.string(),
  height: v.optional(v.string()),
  id: v.string(),
  iso: v.optional(v.string()),
  location: v.optional(v.union([v.string(), v.array(v.string())])),
  midImageLossyUrl: v.string(),
  model: v.optional(v.string()),
  mosaicColours: v.string(),
  previewJpegUrl: v.string(),
  rating: v.optional(v.string()),
  style: v.optional(v.string()),
  thumbnailUrl: v.string(),
  width: v.optional(v.string()),
  description: v.optional(v.string()),
  summary: v.optional(v.string()),
  contrastingGrey: v.string(),
  mosaicBanner: v.optional(v.string()),
});
