/* Support things operations. */

/* Support things operations. */
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../../commons/collections/arrays.ts";
import {
  isNone,
  type Maybe,
  NONE,
  withDefault,
} from "../../../commons/collections/maybe.ts";
import { taxonLabel } from "../../../domain/things.ts";
import { readThing } from "./things.ts";

/** Deduplicates thing IDs and unwraps the result when only one remains. */
export function normaliseThingIds(thingIds: string[]): string | string[] {
  const uniqueIds = [...new Set(thingIds)];
  return uniqueIds.length === 1 ? uniqueIds[0] : uniqueIds;
}

/** Normalises an array-valued thing ID without changing other properties. */
export function normaliseThingId(thing: TripleObject): TripleObject {
  const thingIds = thing.id;
  if (!Array.isArray(thingIds)) {
    return thing;
  }

  const thingId = normaliseThingIds(thingIds);
  return { ...thing, id: thingId };
}

/** Reads an exact URN and returns NONE when the database has no match. */
export function readExactThing(
  tdb: TribbleDB,
  urn: string,
): Maybe<TripleObject> {
  const thing = tdb.readThing(urn);
  return thing === undefined ? NONE : normaliseThingId(thing);
}

/** Returns the first thing that matches an ID and type, or NONE. */
export function readThingVariant(
  tdb: TribbleDB,
  id: string,
  type: string,
): Maybe<TripleObject> {
  const matchingUrns = tdb.nodes({ id, type }).urns();
  for (const matchingUrn of matchingUrns) {
    const thing = readExactThing(tdb, matchingUrn);
    if (!isNone(thing)) return thing;
  }
  return NONE;
}

/** Reads an exact thing only when no qualifying query fields are present. */
export function readUnqualifiedThing(
  tdb: TribbleDB,
  urn: string,
  query: Record<string, string>,
): Maybe<TripleObject> {
  if (Object.keys(query).length > 0) return NONE;
  return readExactThing(tdb, urn);
}

/** Parses an existing thing and appends only a successful parse result. */
export function addParsedThing<Parsed>(
  parsedThings: Parsed[],
  parser: (tdb: TribbleDB, thing: TripleObject) => Maybe<Parsed>,
  tdb: TribbleDB,
  urn: string,
): void {
  const thing = readThing(tdb, urn);
  if (isNone(thing)) return;
  const parsed = parser(tdb, thing);
  if (!isNone(parsed)) parsedThings.push(parsed);
}

/** Returns a taxon copy with its display name derived from taxonomic data. */
export function labelTaxon(taxon: TripleObject): TripleObject {
  return { ...taxon, name: taxonLabel(taxon) };
}

/** Compares thing names in locale order and treats an absent name as empty. */
export function compareThingNames(
  thingA: TripleObject,
  thingB: TripleObject,
): number {
  const nameA = withDefault(one(thingA.name), "");
  const nameB = withDefault(one(thingB.name), "");
  return nameA.localeCompare(nameB);
}

/** Returns URNs whose relation links them to the requested taxon. */
export function readTaxonMemberUrns(
  tdb: TribbleDB,
  type: string,
  id: string,
): Set<string> {
  const query = {
    relation: type,
    target: { type, id },
  };
  const speciesUrns = tdb.search(query).sources();
  return new Set(speciesUrns);
}

/** Tests whether a thing defines its own name property. */
export function hasName(thing: TripleObject): boolean {
  return Object.prototype.hasOwnProperty.call(thing, "name");
}
