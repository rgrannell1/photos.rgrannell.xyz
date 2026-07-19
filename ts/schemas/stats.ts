/*
 * Valibot schema for the precomputed site statistics object.
 */

import * as v from "valibot";

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
