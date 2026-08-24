/*
 * Valibot schemas for photo subjects: species and vehicles.
 */

import * as v from "valibot";

export const NamedThingSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
  wikipedia: v.optional(v.string()),
});

export const ReptileSchema = NamedThingSchema;
export const FishSchema = NamedThingSchema;
export const AmphibianSchema = NamedThingSchema;
export const ArthropodSchema = NamedThingSchema;
export const PlaneSchema = NamedThingSchema;

// Mammals always have a name in published data.
export const MammalSchema = v.object({
  id: v.string(),
  name: v.string(),
  wikipedia: v.optional(v.string()),
});

export const BirdSchema = v.object({
  ...NamedThingSchema.entries,
  birdwatchUrl: v.optional(v.union([v.string(), v.array(v.string())])),
});
