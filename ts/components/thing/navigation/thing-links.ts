/*
 * Present a list of URNs as thing links, skipping missing or unnamed things.
 */

import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { ThingLink } from "./thing-link.ts";
import type { ThingLinkAttrs } from "./thing-link.ts";
import type { ReadThingEmoji } from "./thing-link.ts";
import { isNone, type Maybe } from "../../../commons/collections/maybe.ts";

export type ReadThing = (urn: string) => Maybe<TripleObject>;

/** Draws one known thing as a link. */
function drawThingLink(
  urn: string,
  thing: TripleObject,
  readEmoji: ReadThingEmoji,
): m.Vnode<ThingLinkAttrs>[] {
  const attrs = { urn, thing, readEmoji };
  return [m(ThingLink, attrs)];
}

/** Converts an available named thing into a link. */
function toThingLink(
  readThing: ReadThing,
  readEmoji: ReadThingEmoji,
  urn: Maybe<string>,
): m.Vnode<ThingLinkAttrs>[] {
  if (isNone(urn)) {
    return [];
  }

  const thing = readThing(urn);
  if (isNone(thing) || !thing.name) {
    return [];
  }

  return drawThingLink(urn, thing, readEmoji);
}

/** Converts URNs to links and omits missing or unnamed things. */
export function toThingLinks(
  readThing: ReadThing,
  readEmoji: ReadThingEmoji,
  urns: Maybe<string>[],
): m.Vnode<ThingLinkAttrs>[] {
  const drawLink = toThingLink.bind(null, readThing, readEmoji);
  return urns.flatMap(drawLink);
}
