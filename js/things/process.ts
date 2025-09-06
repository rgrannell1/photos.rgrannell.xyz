
import { Triple } from "../types.ts";
import {
  CURIES,
  countriesAsUrns,
  expandBirdwatchUrl,
  expandCdnUrls,
  expandTripleCuries,
  expandUrns,
  ratingsAsUrns,
} from "../things/things.ts";

/*
 * Modify triples; mostly by expanding URLs and converting things to URNs.
 */
export function processTriples(
  triple: Triple,
): Triple[] {
  const tripleProcessors = [
    expandUrns,
    ratingsAsUrns,
    countriesAsUrns,
    expandCdnUrls.bind(null, 'https://photos-cdn.rgrannell.xyz'), // todo move
    expandBirdwatchUrl,
    expandTripleCuries.bind(null, CURIES),
  ];

  let outputTriples: Triple[] = [triple];
  for (const fn of tripleProcessors) {
    outputTriples = outputTriples.flatMap(fn as any);
  }

  return outputTriples;
}