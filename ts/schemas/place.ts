/*
 * Valibot schemas for geographic entities: places, countries, UNESCO sites,
 * and place features.
 */

import * as v from "valibot";

export const PlaceSchema = v.object({
  id: v.string(),
  name: v.string(),
  flag: v.optional(v.string()),
  features: v.optional(v.union([v.string(), v.array(v.string())])),
  in: v.optional(v.union([v.string(), v.array(v.string())])),
  shortName: v.optional(v.string()),
  wikipedia: v.optional(v.string()),
  unescoId: v.optional(v.string()),
  longitude: v.optional(v.pipe(v.string(), v.transform(Number))),
  latitude: v.optional(v.pipe(v.string(), v.transform(Number))),
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

export const FeatureSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
  placesWithFeature: v.optional(v.union([v.string(), v.array(v.string())])),
});
