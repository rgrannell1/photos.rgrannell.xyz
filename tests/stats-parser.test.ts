/* Stats parser result tests. */

import { parseStats } from "../ts/services/browser/stats.ts";

const VALID_STATS = {
  photos: 1,
  videos: 2,
  albums: 3,
  years: 4,
  countries: 5,
  bird_species: 6,
  mammal_species: 7,
  amphibian_species: 8,
  reptile_species: 9,
  unesco_sites: 10,
};

Deno.test("parseStats returns valid stats", () => {
  const result = parseStats(VALID_STATS);
  if (!result.ok || result.value.photos !== 1) {
    throw new Error("expected valid stats");
  }
});

Deno.test("parseStats keeps validation issues", () => {
  const result = parseStats({ ...VALID_STATS, photos: "one" });
  if (result.ok || result.error.length === 0) {
    throw new Error("expected validation issues");
  }
});
