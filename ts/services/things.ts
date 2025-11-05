import m from "mithril";
import { asUrn, TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { ThingLink, ThingLinkAttrs } from "../components/thing-link.ts";
import { one } from "../arrays.ts";

/*
 * Read a thing as an undifferentiated TripleObject
 * by URN
 */
export function readThing(
  tdb: TribbleDB,
  urn: string,
): TripleObject | undefined {
  const parsed = asUrn(urn);

  return tdb.search({
    source: { id: parsed.id, type: parsed.type },
  }).firstObject();
}

/*
 * Read and parse a thing by URN
 */
export function readParsedThing<T>(
  parser: (tdb: TribbleDB, thing: TripleObject) => T | undefined,
  tdb: TribbleDB,
  id: string,
): T | undefined {
  const thing = readThing(tdb, id);
  if (!thing) {
    return undefined;
  }

  return parser(tdb, thing);
}

/*
 * Read an array of things by URN
 *
 * @param tdb TribbleDB instance
 * @param urns Set of URNs to read
 */
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

/*
 * Read an array of parsed things by URNs
 */
export const readParsedThings = function <T>(
  parser: (tdb: TribbleDB, thing: TripleObject) => T | undefined,
  tdb: TribbleDB,
  urns: Set<string>,
): T[] {
  const parsedThings: T[] = [];

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

/*
 * Read all things of a given type that have a name
 */
export function readNamedTypeThings<T>(
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

      const first = one(firstName) as string;
      const second = one(secondName) as string;

      return first.localeCompare(second);
    });
}

// TODO: remove mithril, move to presenter folder!!
export function toThingLinks(
  tdb: TribbleDB,
  urns: (string | undefined)[],
): m.Vnode<ThingLinkAttrs, {}>[] {
  return urns.flatMap((urn) => {
    if (!urn) {
      return [];
    }
    const thing = readThing(tdb, urn);
    if (!thing || !thing.name) {
      return [];
    }

    return [m(ThingLink, {
      urn,
      thing: readThing(tdb, urn),
    })];
  });
}
