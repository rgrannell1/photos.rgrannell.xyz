/*
 * Defines Zod schemas that we use to convert Tribble objects into something
 * with actual type-safety
 */

import { z } from "zod";

export const AlbumSchema = z.object({
  name: z.string(),
  minDate: z.string(),
  maxDate: z.string(),
  thumbnailUrl: z.string(),
  mosaic: z.any(),
  id: z.string(),
  photosCount: z.string(),
  videosCount: z.string(),
  flags: z.any(),
  description: z.string().optional(),
});


export const CountrySchema = z.object({
  id: z.string(),
  flag: z.string().optional(),
  name: z.string(),
  contains: z.union([z.string(), z.array(z.string())]).optional(),
});

export const PlaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  feature: z.union([z.string(), z.array(z.string())]).optional(),
  in: z.union([z.string(), z.array(z.string())]).optional(),
  shortName: z.string().optional(),
  wikipedia: z.string().optional(),
  unescoId: z.string().optional(),
});


export const PhotoSchema = z.object({
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

export const MammalSchema = z.object({
  id: z.string(),
  name: z.string(),
  wikipedia: z.string().optional(),
});

export const ReptileSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  wikipedia: z.string().optional(),
});

export const AmphibianSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  wikipedia: z.string().optional(),
});

export const InsectSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  wikipedia: z.string().optional(),
});

export const SubjectSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  wikipedia: z.string().optional(),
});

export const BirdSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  wikipedia: z.string().optional(),
  birdwatchUrl: z.union([z.string(), z.array(z.string())]).optional(),
});

export const VideoSchema = z.object({
  id: z.string(),
  albumId: z.string(),
  description: z.string(),
  posterUrl: z.string().url(),
  videoUrl1080p: z.string().url(),
  videoUrl480p: z.string().url(),
  videoUrl720p: z.string().url(),
  videoUrlUnscaled: z.string().url(),
});
