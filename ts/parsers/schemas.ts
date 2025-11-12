/*
 * Defines Zod schemas that we use to convert Tribble objects into something
 * with actual type-safety
 */

import {
  string, array, object, optional, union, any, pipe, url
} from "valibot";

const v = {
  string,
  array,
  object,
  optional,
  union,
  any,
  pipe,
  url
}

export const AlbumSchema = v.object({
  name: v.string(),
  minDate: v.string(),
  maxDate: v.string(),
  thumbnailUrl: v.string(),
  mosaic: v.any(),
  id: v.string(),
  photosCount: v.string(),
  videosCount: v.string(),
  flags: v.any(),
  description: v.optional(v.string()),
});

export const CountrySchema = v.object({
  id: v.string(),
  flag: v.optional(v.string()),
  name: v.string(),
  contains: v.optional(v.union([v.string(), v.array(v.string())])),
});

export const UnescoSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
});

export const PlaceSchema = v.object({
  id: v.string(),
  name: v.string(),
  feature: v.optional(v.union([v.string(), v.array(v.string())])),
  in: v.optional(v.union([v.string(), v.array(v.string())])),
  shortName: v.optional(v.string()),
  wikipedia: v.optional(v.string()),
  unescoId: v.optional(v.string()),
});

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
  pngUrl: v.string(),
  rating: v.optional(v.string()),
  style: v.optional(v.string()),
  thumbnailUrl: v.string(),
  width: v.optional(v.string()),
  description: v.optional(v.string()),
  summary: v.optional(v.string()),
});

export const MammalSchema = v.object({
  id: v.string(),
  name: v.string(),
  wikipedia: v.optional(v.string()),
});

export const ReptileSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
  wikipedia: v.optional(v.string()),
});

export const AmphibianSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
  wikipedia: v.optional(v.string()),
});

export const InsectSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
  wikipedia: v.optional(v.string()),
});

export const SubjectSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
  wikipedia: v.optional(v.string()),
});

export const BirdSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
  wikipedia: v.optional(v.string()),
  birdwatchUrl: v.optional(v.union([v.string(), v.array(v.string())])),
});

export const VideoSchema = v.object({
  id: v.string(),
  albumId: v.string(),
  description: v.string(),
  posterUrl: v.pipe(v.string(), v.url()),
  videoUrl1080p: v.pipe(v.string(), v.url()),
  videoUrl480p: v.pipe(v.string(), v.url()),
  videoUrl720p: v.pipe(v.string(), v.url()),
  videoUrlUnscaled: v.pipe(v.string(), v.url()),
});

export const FeatureSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
});
