/* Check indexed thing readers against the legacy search results. */

import { asUrn } from "@rgrannell1/tribbledb";
import type { Triple, TripleObject } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { one } from "../ts/commons/arrays.ts";
import { fromNullable } from "../ts/commons/maybe.ts";
import {
  isBinomialType,
  listingLabel,
  readThing,
} from "../ts/commons/things.ts";

const BIRD = "urn:ró:bird:robin";
const BIRD_VARIANT = `${BIRD}?sex=male`;
const LISTING = "urn:ró:listing:bird";

const TRIPLES: Triple[] = [
  [BIRD, "id", BIRD],
  [BIRD, "name", "European Robin"],
  [BIRD, "family", "urn:ró:family:turdidae?source=ioc"],
  [BIRD_VARIANT, "name", "Male European Robin"],
  [LISTING, "name", "Birds"],
  [LISTING, "binomial", "true"],
];

function readLegacyThing(
  tdb: TribbleDB,
  urn: string,
): TripleObject | undefined {
  const { id, type } = asUrn(urn);
  return tdb.search({ source: { id, type } }).firstObject();
}

function blockSearch(tdb: TribbleDB): void {
  Object.defineProperty(tdb, "search", {
    value: () => {
      throw new Error("legacy search called");
    },
  });
}

function assertEqual(actual: unknown, expected: unknown): void {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);
  if (actualJson !== expectedJson) {
    throw new Error(`expected ${expectedJson}, got ${actualJson}`);
  }
}

Deno.test("readThing matches legacy point reads, including qs variants", () => {
  for (const urn of [BIRD, BIRD_VARIANT, "urn:ró:bird:missing"]) {
    const tdb = new TribbleDB(TRIPLES);
    const expected = readLegacyThing(tdb, urn);
    blockSearch(tdb);

    assertEqual(readThing(tdb, urn), fromNullable(expected));
  }
});

Deno.test("listing metadata matches legacy point reads", () => {
  const tdb = new TribbleDB(TRIPLES);
  const listing = readLegacyThing(tdb, LISTING);
  const expectedLabel = one(fromNullable(listing?.name));
  const expectedBinomial = one(fromNullable(listing?.binomial)) === "true";
  blockSearch(tdb);

  assertEqual(listingLabel(tdb, "bird"), expectedLabel);
  assertEqual(isBinomialType(tdb, "bird"), expectedBinomial);
});
