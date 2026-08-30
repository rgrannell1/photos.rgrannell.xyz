import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../../commons/collections/arrays.ts";

import { DATA_TRUE, KnownTypes } from "../../../constants/data.ts";
import { isNone, type Maybe, NONE } from "../../../commons/collections/maybe.ts";

import {
  addParsedThing,
  compareThingNames,
  hasName,
  labelTaxon,
  readTaxonMemberUrns,
  readThingVariant,
  readUnqualifiedThing,
} from "./lookup.ts";
import { defaultListingLabel, readListingThing } from "./listings.ts";

export function readThing(
  tdb: TribbleDB,
  urn: string,
): Maybe<TripleObject> {
  const { id, qs, type } = asUrn(urn);
  const exactThing = readUnqualifiedThing(tdb, urn, qs);
  if (!isNone(exactThing)) return exactThing;
  return readThingVariant(tdb, id, type);
}

export function readParsedThing<Parsed>(
  parser: (tdb: TribbleDB, thing: TripleObject) => Maybe<Parsed>,
  tdb: TribbleDB,
  id: string,
): Maybe<Parsed> {
  const thing = readThing(tdb, id);
  if (isNone(thing)) {
    return NONE;
  }

  return parser(tdb, thing);
}

export function readThings(
  tdb: TribbleDB,
  urns: Set<string>,
): TripleObject[] {
  const things: TripleObject[] = [];

  for (const urn of urns) {
    const thing = readThing(tdb, urn);
    if (!isNone(thing)) {
      things.push(thing);
    }
  }

  return things;
}

export const readParsedThings = function <Parsed>(
  parser: (tdb: TribbleDB, thing: TripleObject) => Maybe<Parsed>,
  tdb: TribbleDB,
  urns: Set<string>,
): Parsed[] {
  const parserIsInvalid = typeof parser !== "function";
  if (parserIsInvalid) {
    throw new Error("Parser must be a function");
  }

  const parsedThings: Parsed[] = [];

  for (const urn of urns) {
    addParsedThing(parsedThings, parser, tdb, urn);
  }

  return parsedThings;
};

export function readTaxons(
  tdb: TribbleDB,
  urns: Set<string>,
): TripleObject[] {
  return readThings(tdb, urns).map(labelTaxon);
}

// The rank relation shares its name with the taxon's URN type.
export function readTaxonMembers(
  tdb: TribbleDB,
  taxonUrn: string,
): TripleObject[] {
  const { type, id } = asUrn(taxonUrn);

  const speciesUrns = readTaxonMemberUrns(tdb, type, id);
  const members = readThings(tdb, speciesUrns).sort(compareThingNames);
  return members;
}

export function readNamedTypeThings<Parsed>(
  tdb: TribbleDB,
  type: string,
): TripleObject[] {
  const things = tdb.search({
    source: { type },
  }).objects();

  const namedThings = things.filter(hasName).sort(compareThingNames);
  return namedThings;
}

export function readListings(tdb: TribbleDB): TripleObject[] {
  return readNamedTypeThings(tdb, KnownTypes.LISTING);
}

// Published plural label for a type. Falls back to a naive plural.
export function listingLabel(tdb: TribbleDB, type: string): string {
  const listing = readListingThing(tdb, type);
  const label = isNone(listing) ? NONE : one(listing.name);
  return typeof label === "string" ? label : defaultListingLabel(type);
}

export function isBinomialType(tdb: TribbleDB, type: string): boolean {
  const listing = readThing(tdb, `urn:ró:${KnownTypes.LISTING}:${type}`);
  const isBinomial = !isNone(listing) && one(listing.binomial) === DATA_TRUE;
  return isBinomial;
}
