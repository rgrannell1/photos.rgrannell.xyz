/*
 * Present a list of URNs as thing links, skipping missing or unnamed things.
 */

import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { ThingLink } from "./thing-link.ts";
import type { ThingLinkAttrs } from "./thing-link.ts";
import type { ReadThingEmoji } from "./thing-link.ts";

export type ReadThing = (urn: string) => TripleObject | undefined;

function toThingLink(
  readThing: ReadThing,
  readEmoji: ReadThingEmoji,
  urn: string | undefined,
): m.Vnode<ThingLinkAttrs>[] {
  if (!urn) {
    return [];
  }

  const thing = readThing(urn);
  if (!thing || !thing.name) {
    return [];
  }

  return [m(ThingLink, { urn, thing, readEmoji })];
}

export function toThingLinks(
  readThing: ReadThing,
  readEmoji: ReadThingEmoji,
  urns: (string | undefined)[],
): m.Vnode<ThingLinkAttrs>[] {
  return urns.flatMap(toThingLink.bind(null, readThing, readEmoji));
}
