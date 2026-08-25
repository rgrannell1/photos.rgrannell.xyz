/*
 * Present a list of URNs as thing links, skipping missing or unnamed things.
 */

import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { ThingLink } from "./thing-link.ts";
import type { ThingLinkAttrs } from "./thing-link.ts";
import type { ReadThingEmoji } from "./thing-link.ts";
import { isNone, type Maybe } from "../../commons/maybe.ts";

export type ReadThing = (urn: string) => Maybe<TripleObject>;

function toThingLink(
  readThing: ReadThing,
  readEmoji: ReadThingEmoji,
  urn: Maybe<string>,
): m.Vnode<ThingLinkAttrs>[] {
  if (isNone(urn)) {
    return [];
  }

  const thing = readThing(urn);
  const lacksNamedThing = isNone(thing) || !thing.name;
  if (lacksNamedThing) {
    return [];
  }

  return [m(ThingLink, { urn, thing, readEmoji })];
}

export function toThingLinks(
  readThing: ReadThing,
  readEmoji: ReadThingEmoji,
  urns: Maybe<string>[],
): m.Vnode<ThingLinkAttrs>[] {
  return urns.flatMap(toThingLink.bind(null, readThing, readEmoji));
}
