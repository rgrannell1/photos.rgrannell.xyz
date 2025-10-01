import { Triple } from "../types.ts";
import {
  addSeason,
  addYear,
  countriesAsUrns,
  CURIES,
  expandCdnUrls,
  expandTripleCuries,
  expandUrns,
  placesToCountries,
  ratingsAsUrns,
  renameRelations,
  addContains
} from "../things/things.ts";

/*
 * Modify triples; mostly by expanding URLs and converting things to URNs.
 */
export function processTriples(
  triple: Triple,
): Triple[] {
  const tripleProcessors = [
    renameRelations,
    expandUrns,
    ratingsAsUrns,
    countriesAsUrns,
    placesToCountries,
    expandCdnUrls.bind(null, "https://photos-cdn.rgrannell.xyz"), // todo move
    expandTripleCuries.bind(null, CURIES),
    addContains,
    addSeason,
    addYear,
  ];

  let outputTriples: Triple[] = [triple];
  for (const fn of tripleProcessors) {
    outputTriples = outputTriples.flatMap(fn as any);
  }

  return outputTriples;
}

// TODO rename relations into a JS-friendly name format
