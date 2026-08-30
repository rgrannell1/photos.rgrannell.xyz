/* Support thing list operations. */

/*
 * Lists of thing links rendered as a <ul>. Each kind keeps its own read
 * function, link component, ordering, and key behaviour.
 */
import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../../commons/collections/arrays.ts";
import type { Feature, Place, Unesco } from "../../../types/domain.ts";
import { FeatureLabel } from "./feature-label.ts";
import { ThingLink } from "../navigation/thing-link.ts";
import { UnescoLink } from "../references/unesco-link.ts";
import type { ReadThingEmoji } from "../navigation/thing-link.ts";
import { fromNullable, isNone, withDefault } from "../../../commons/collections/maybe.ts";
import type { ThingListItem } from "./thing-list.ts";
import { drawTaxonLink } from "./render.ts";

export function compareNames(firstName: string, secondName: string): number {
  const comparison = firstName.localeCompare(secondName);
  return comparison;
}

export function comparePlaceNames(
  loca: ThingListItem,
  locb: ThingListItem,
): number {
  const firstName = withDefault(one(fromNullable(loca.name)), "");
  const secondName = withDefault(one(fromNullable(locb.name)), "");
  return compareNames(firstName, secondName);
}

export function drawListItem(key: string, content: m.Children): m.Children {
  const attrs = { key };
  return m("li", attrs, content);
}

export function drawPlaceLink(
  readEmoji: ReadThingEmoji,
  location: Place | Unesco,
  urn: string,
): m.Children {
  const attrs = {
    urn,
    thing: location,
    readEmoji,
  };
  const link = m(ThingLink, attrs);
  return drawListItem(`place-${location.id}`, link);
}

export function drawPlaceItem(
  readEmoji: ReadThingEmoji,
  location: Place | Unesco,
): m.Children {
  const urn = one(location.id);
  if (isNone(urn)) {
    return null;
  }

  const item = drawPlaceLink(readEmoji, location, urn);
  return item;
}

export function drawFeatureLink(feature: Feature, id: string): m.Children {
  const link = m(FeatureLabel, { urn: id, thing: feature });
  return drawListItem(`feature-${id}`, link);
}

export function drawFeatureItem(feature: Feature): m.Children {
  const id = one(feature.id);
  if (isNone(id)) {
    return null;
  }

  const item = drawFeatureLink(feature, id);
  return item;
}

export function drawUnescoLink(unesco: Unesco, urn: string): m.Children {
  const link = m(UnescoLink, { urn, thing: unesco });
  return drawListItem(`unesco-${urn}`, link);
}

export function drawUnescoItem(unesco: Unesco): m.Children {
  const urn = one(unesco.id);
  if (isNone(urn)) {
    return null;
  }

  const item = drawUnescoLink(unesco, urn);
  return item;
}

export function drawTaxonItem(
  readEmoji: ReadThingEmoji,
  taxon: TripleObject,
): m.Children {
  const urn = one(taxon.id);
  if (isNone(urn)) {
    return null;
  }

  const item = drawTaxonLink(readEmoji, taxon, urn);
  return item;
}
