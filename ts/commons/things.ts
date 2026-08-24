import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../commons/arrays.ts";
import { capitalise, pluralise, titleCase } from "../commons/strings.ts";
import { KnownTypes } from "../constants/data.ts";

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
): TripleObject | undefined {
  const { id, qs, type } = asUrn(urn);

  if (Object.keys(qs).length === 0) {
    const thing = tdb.readThing(urn);
    if (thing) {
      return normaliseThingId(thing);
    }
  }

  for (const matchingUrn of tdb.nodes({ id, type }).urns()) {
    const thing = tdb.readThing(matchingUrn);
    if (thing) {
      return normaliseThingId(thing);
    }
  }

  return undefined;
}

export function readParsedThing<Parsed>(
  parser: (tdb: TribbleDB, thing: TripleObject) => Parsed | undefined,
  tdb: TribbleDB,
  id: string,
): Parsed | undefined {
  const thing = readThing(tdb, id);
  if (!thing) {
    return undefined;
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
    if (thing) {
      things.push(thing);
    }
  }

  return things;
}

export const readParsedThings = function <Parsed>(
  parser: (tdb: TribbleDB, thing: TripleObject) => Parsed | undefined,
  tdb: TribbleDB,
  urns: Set<string>,
): Parsed[] {
  if (typeof parser !== "function") {
    throw new Error("Parser must be a function");
  }

  const parsedThings: Parsed[] = [];

  for (const urn of urns) {
    const thing = readThing(tdb, urn);
    if (!thing) {
      continue;
    }

    const parsed = parser(tdb, thing);
    if (parsed) {
      parsedThings.push(parsed);
    }
  }

  return parsedThings;
};

// Label preference: common name, then Latin name, then URN id.
export function taxonLabel(taxon: TripleObject): string {
  const urn = one(taxon.id);
  const fallback = urn ? asUrn(urn).id.replace(/-/g, " ") : "";
  const label = one(taxon.commonName) ?? one(taxon.name) ?? fallback;

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
    const first = one(thinga.name) ?? "";
    const second = one(thingb.name) ?? "";

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

      const first = one(firstName) ?? "";
      const second = one(secondName) ?? "";

      return first.localeCompare(second);
    });
}

export function readListings(tdb: TribbleDB): TripleObject[] {
  return readNamedTypeThings(tdb, KnownTypes.LISTING);
}

// Published plural label for a type. Falls back to a naive plural.
export function listingLabel(tdb: TribbleDB, type: string): string {
  const listing = readThing(tdb, `urn:ró:${KnownTypes.LISTING}:${type}`);

  const label = one(listing?.name);
  return typeof label === "string" ? label : capitalise(pluralise(type));
}

export function isBinomialType(tdb: TribbleDB, type: string): boolean {
  const listing = readThing(tdb, `urn:ró:${KnownTypes.LISTING}:${type}`);

  return one(listing?.binomial) === "true";
}
