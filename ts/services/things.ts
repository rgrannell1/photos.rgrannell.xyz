import m from "mithril";
import { asUrn, TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { ThingLink, ThingLinkAttrs } from "../components/thing-link.ts";

export function readThing(
  tdb: TribbleDB,
  id: string,
): TripleObject | undefined {
  const parsed = asUrn(id);

  return tdb.search({
    source: { id: parsed.id, type: parsed.type },
  }).firstObject();
}

export function toThingLinks(tdb: TribbleDB, urns: (string | undefined)[]): m.Vnode<ThingLinkAttrs, {}>[] {
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
      name: Array.isArray(thing.name) ? thing.name[0] : thing.name,
      classes: [],
    })];
  });
}
