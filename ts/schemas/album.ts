/*
 * Valibot schema for album entities.
 */

import * as v from "valibot";

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
  country: v.optional(v.union([v.string(), v.array(v.string())])),
  description: v.optional(v.string()),

  // 200ms to compute on the client, so now it's precomputed
  dateRange: v.string(),
  shortDateRange: v.string(),
  albumBanner: v.optional(v.string()),
});
