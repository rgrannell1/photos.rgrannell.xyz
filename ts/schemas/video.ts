/*
 * Valibot schema for video entities.
 */

import * as v from "valibot";

export const VideoSchema = v.object({
  id: v.string(),
  albumId: v.string(),
  description: v.optional(v.string()),
  posterUrl: v.optional(v.pipe(v.string(), v.url())),
  videoUrl1080p: v.optional(v.pipe(v.string(), v.url())),
  videoUrl480p: v.optional(v.pipe(v.string(), v.url())),
  videoUrl720p: v.optional(v.pipe(v.string(), v.url())),
  videoUrlUnscaled: v.optional(v.pipe(v.string(), v.url())),
  location: v.optional(v.union([v.string(), v.array(v.string())])),
  rating: v.optional(v.string()),
  style: v.optional(v.string()),
  subject: v.optional(v.union([v.string(), v.array(v.string())])),
});
