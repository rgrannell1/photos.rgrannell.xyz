/*
 * Defines Zod schemas that we use to convert Tribble objects into something
 * with actual type-safety.
 */

import {
  any,
  array,
  object,
  optional,
  pipe,
  integer,
  string,
  union,
  url,
  number,
  transform,
} from "valibot";

const v = {
  string,
  array,
  object,
  optional,
  union,
  any,
  pipe,
  url,
  integer,
  number,
  transform
};

export const AlbumSchema = v.object({
  name: v.string(),
  id: v.string(),
  trip: v.optional(v.string()),
  minDate: v.pipe(v.string(), v.transform(Number)),
  maxDate: v.pipe(v.string(), v.transform(Number)),
  thumbnailUrl: v.string(),
  // TODO this is silly
  mosaic: v.string(),
  photosCount: v.pipe(v.string(), v.transform(Number)),
  videosCount: v.pipe(v.string(), v.transform(Number)),
  country: v.union( [v.string(), v.array(v.string())] ),
  description: v.optional(v.string()),
});

export const CountrySchema = v.object({
  id: v.string(),
  flag: v.optional(v.string()),
  name: v.string(),
  contains: v.optional(v.union([v.string(), v.array(v.string())])),
  in: v.optional(v.union([v.string(), v.array(v.string())])),
});

export const UnescoSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
  longitude: v.optional(v.string()),
  latitude: v.optional(v.string()),
});

export const PlaceSchema = v.object({
  id: v.string(),
  name: v.string(),
  features: v.optional(v.union([v.string(), v.array(v.string())])),
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
  rating: v.string(),
  style: v.optional(v.string()),
  thumbnailUrl: v.string(),
  width: v.optional(v.string()),
  description: v.optional(v.string()),
  summary: v.optional(v.string()),
  contrastingGrey: v.string(),
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

export const FishSchema = v.object({
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

export const StatsSchema = v.object({
  photos: v.pipe(v.number(), v.integer()),
  videos: v.pipe(v.number(), v.integer()),
  albums: v.pipe(v.number(), v.integer()),
  years: v.pipe(v.number(), v.integer()),
  countries: v.pipe(v.number(), v.integer()),
  bird_species: v.pipe(v.number(), v.integer()),
  mammal_species: v.pipe(v.number(), v.integer()),
  amphibian_species: v.pipe(v.number(), v.integer()),
  reptile_species: v.pipe(v.number(), v.integer()),
  unesco_sites: v.pipe(v.number(), v.integer()),
});

export const FeatureSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
});
