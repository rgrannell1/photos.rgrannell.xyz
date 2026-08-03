/*
 * Present a list of URNs as thing links, skipping missing or unnamed things.
 */

import m from "mithril";
import { ThingLink } from "./thing-link.ts";
import type { ThingLinkAttrs } from "./thing-link.ts";
import type { Services } from "../../types.ts";

function toThingLink(
  services: Services,
  urn: string | undefined,
): m.Vnode<ThingLinkAttrs>[] {
  if (!urn) {
    return [];
  }

  const thing = services.readThing(urn);
  if (!thing || !thing.name) {
    return [];
  }

  return [m(ThingLink, { urn, thing })];
}

export function toThingLinks(
  services: Services,
  urns: (string | undefined)[],
): m.Vnode<ThingLinkAttrs>[] {
  return urns.flatMap(toThingLink.bind(null, services));
}
