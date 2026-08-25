import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../commons/arrays.ts";
import { capitalise, pluralise, titleCase } from "../commons/strings.ts";
import { KnownTypes } from "../constants/data.ts";
import { isNone, type Maybe, NONE, withDefault } from "./maybe.ts";

function normaliseThingId(thing: TripleObject): TripleObject {
  const thingIds = thing.id;
  if (!Array.isArray(thingIds)) {
    return thing;
  }

  const uniqueIds = [...new Set(thingIds)];
  const thingId = uniqueIds.length === 1 ? uniqueIds[0] : uniqueIds;
  return { ...thing, id: thingId };
}

export function readThing(
  tdb: TribbleDB,
  urn: string,
): Maybe<TripleObject> {
  const { id, qs, type } = asUrn(urn);

  if (Object.keys(qs).length === 0) {
    const thing = tdb.readThing(urn);
    if (thing !== undefined) {
      return normaliseThingId(thing);
    }
  }

  for (const matchingUrn of tdb.nodes({ id, type }).urns()) {
    const thing = tdb.readThing(matchingUrn);
    if (thing !== undefined) {
      return normaliseThingId(thing);
    }
  }

  return NONE;
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
  if (typeof parser !== "function") {
    throw new Error("Parser must be a function");
  }

  const parsedThings: Parsed[] = [];

  for (const urn of urns) {
    const thing = readThing(tdb, urn);
    if (isNone(thing)) {
      continue;
    }

    const parsed = parser(tdb, thing);
    if (!isNone(parsed)) {
      parsedThings.push(parsed);
    }
  }

  return parsedThings;
};

// Label preference: common name, then Latin name, then URN id.
export function taxonLabel(taxon: TripleObject): string {
  const urn = one(taxon.id);
  const fallback = isNone(urn) ? "" : asUrn(urn).id.replace(/-/g, " ");
  const name = withDefault(one(taxon.name), fallback);
  const label = withDefault(one(taxon.commonName), name);

  return titleCase(String(label));
}

export function readTaxons(
  tdb: TribbleDB,
  urns: Set<string>,
): TripleObject[] {
  return readThings(tdb, urns).map((taxon) => {
    return { ...taxon, name: taxonLabel(taxon) };
  });
}

// The rank relation shares its name with the taxon's URN type.
export function readTaxonMembers(
  tdb: TribbleDB,
  taxonUrn: string,
): TripleObject[] {
  const { type, id } = asUrn(taxonUrn);

  const speciesUrns = tdb.search({
    relation: type,
    target: { type, id },
  }).sources();

  return readThings(tdb, new Set(speciesUrns)).sort((thinga, thingb) => {
    const first = withDefault(one(thinga.name), "");
    const second = withDefault(one(thingb.name), "");

    return first.localeCompare(second);
  });
}

export function readNamedTypeThings<Parsed>(
  tdb: TribbleDB,
  type: string,
): TripleObject[] {
  const things = tdb.search({
    source: { type },
  }).objects();

  return things
    .filter((thing) => {
      return Object.prototype.hasOwnProperty.call(thing, "name");
    })
    .sort((thinga, thingb) => {
      const firstName = thinga.name;
      const secondName = thingb.name;

      const first = withDefault(one(firstName), "");
      const second = withDefault(one(secondName), "");

      return first.localeCompare(second);
    });
}

export function readListings(tdb: TribbleDB): TripleObject[] {
  return readNamedTypeThings(tdb, KnownTypes.LISTING);
}

// Published plural label for a type. Falls back to a naive plural.
export function listingLabel(tdb: TribbleDB, type: string): string {
  const listing = readThing(tdb, `urn:ró:${KnownTypes.LISTING}:${type}`);

  const label = isNone(listing) ? NONE : one(listing.name);
  return typeof label === "string" ? label : capitalise(pluralise(type));
}

export function isBinomialType(tdb: TribbleDB, type: string): boolean {
  const listing = readThing(tdb, `urn:ró:${KnownTypes.LISTING}:${type}`);

  return !isNone(listing) && one(listing.binomial) === "true";
}
