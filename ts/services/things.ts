import m from "mithril";
import { asUrn, TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { ThingLink, ThingLinkAttrs } from "../components/thing-link.ts";
import { one } from "../arrays.ts";

export function readThing(
  tdb: TribbleDB,
  id: string,
): TripleObject | undefined {
  const parsed = asUrn(id);

  return tdb.search({
    source: { id: parsed.id, type: parsed.type },
  }).firstObject();
}

export function readThings(
  tdb: TribbleDB,
  ids: Set<string>,
): TripleObject[] {
  const things: TripleObject[] = [];

  for (const id of ids) {
    const thing = readThing(tdb, id);
    if (thing) {
      things.push(thing);
    }
  }

  return things;
}

// TODO: remove mithril, move to presenter
export function toThingLinks(tdb: TribbleDB, urns: (string | undefined)[]): m.Vnode<ThingLinkAttrs, {}>[] {
  return urns.flatMap((urn) => {
    if (!urn) {
      return [];
    }
    const thing = readThing(tdb, urn);
    if (!thing || !thing.name) {
      return [];
    }

    const id = asUrn(urn);

    return [m(ThingLink, {
      urn,
      name: one(thing.name) ?? id.id,
      classes: [],
    })];
  });
}
