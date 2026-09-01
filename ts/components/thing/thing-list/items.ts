/* Support thing list operations. */

/*
 * Lists of thing links rendered as a <ul>. Each kind keeps its own read
 * function, link component, ordering, and key behaviour.
 */
import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { selectFirst } from "../../../commons/collections/arrays.ts";
import type { Feature, Place, Unesco } from "../../../types/domain.ts";
import { FeatureLabel } from "./feature-label.ts";
import { ThingLink } from "../navigation/thing-link.ts";
import { UnescoLink } from "../references/unesco-link.ts";
import type { ReadThingEmoji } from "../navigation/thing-link.ts";
import { fromNullable, isNone, withDefault } from "../../../commons/collections/maybe.ts";
import type { ThingListItem } from "./thing-list.ts";
import { drawTaxonLink } from "./render.ts";

/** Compare two names with locale-aware ordering. */
export function compareNames(firstName: string, secondName: string): number {
  const comparison = firstName.localeCompare(secondName);
  return comparison;
}

/** Compare thing list items by their first name, with missing names first. */
export function comparePlaceNames(
  loca: ThingListItem,
  locb: ThingListItem,
): number {
  const firstName = withDefault(selectFirst(fromNullable(loca.name)), "");
  const secondName = withDefault(selectFirst(fromNullable(locb.name)), "");
  return compareNames(firstName, secondName);
}

/** Wrap content in a keyed list item. */
export function drawListItem(key: string, content: m.Children): m.Children {
  const attrs = { key };
  return m("li", attrs, content);
}

/** Draw a keyed place link for a known URN. */
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
  const $link = m(ThingLink, attrs);
  return drawListItem(`place-${location.id}`, $link);
}

/** Draw a place item, or nothing when its ID is missing. */
export function drawPlaceItem(
  readEmoji: ReadThingEmoji,
  location: Place | Unesco,
): m.Children {
  const urn = selectFirst(location.id);
  if (isNone(urn)) {
    return null;
  }

  const $item = drawPlaceLink(readEmoji, location, urn);
  return $item;
}

/** Draw a keyed feature link for a known ID. */
export function drawFeatureLink(feature: Feature, id: string): m.Children {
  const $link = m(FeatureLabel, { urn: id, thing: feature });
  return drawListItem(`feature-${id}`, $link);
}

/** Draw a feature item, or nothing when its ID is missing. */
export function drawFeatureItem(feature: Feature): m.Children {
  const id = selectFirst(feature.id);
  if (isNone(id)) {
    return null;
  }

  const $item = drawFeatureLink(feature, id);
  return $item;
}

/** Draw a keyed UNESCO link for a known URN. */
export function drawUnescoLink(unesco: Unesco, urn: string): m.Children {
  const $link = m(UnescoLink, { urn, thing: unesco });
  return drawListItem(`unesco-${urn}`, $link);
}

/** Draw a UNESCO item, or nothing when its ID is missing. */
export function drawUnescoItem(unesco: Unesco): m.Children {
  const urn = selectFirst(unesco.id);
  if (isNone(urn)) {
    return null;
  }

  const $item = drawUnescoLink(unesco, urn);
  return $item;
}

/** Draw a taxon item, or nothing when its ID is missing. */
export function drawTaxonItem(
  readEmoji: ReadThingEmoji,
  taxon: TripleObject,
): m.Children {
  const urn = selectFirst(taxon.id);
  if (isNone(urn)) {
    return null;
  }

  const $item = drawTaxonLink(readEmoji, taxon, urn);
  return $item;
}
