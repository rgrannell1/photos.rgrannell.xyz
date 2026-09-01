/* Support thing list operations. */

/*
 * Lists of thing links rendered as a <ul>. Each kind keeps its own read
 * function, link component, ordering, and key behaviour.
 */
import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Feature, Place, Unesco } from "../../../types/domain.ts";
import { ThingLink } from "../navigation/thing-link.ts";
import type { ReadThingEmoji } from "../navigation/thing-link.ts";
import { ThingListKind } from "../../../constants/data.ts";
import type {
  ThingListAttrs,
  ThingListItem,
} from "./thing-list.ts";
import { THING_LIST_DRAWERS } from "./thing-list.ts";
import {
  comparePlaceNames,
  drawFeatureItem,
  drawListItem,
  drawPlaceItem,
  drawTaxonItem,
  drawUnescoItem,
} from "./items.ts";

/** Draw a taxon link inside a keyed list item. */
export function drawTaxonLink(
  readEmoji: ReadThingEmoji,
  taxon: TripleObject,
  urn: string,
): m.Children {
  const attrs = {
    urn,
    thing: taxon,
    readEmoji,
  };
  const $link = m(ThingLink, attrs);
  return drawListItem(`taxon-${urn}`, $link);
}

/** Draw a place or Unesco item with its emoji reader. */
export function drawPlaceListItem(
  readEmoji: ReadThingEmoji,
  item: ThingListItem,
): m.Children {
  return drawPlaceItem(readEmoji, item as Place | Unesco);
}

/** Draw a feature item without an emoji lookup. */
export function drawFeatureListItem(
  _readEmoji: ReadThingEmoji,
  item: ThingListItem,
): m.Children {
  return drawFeatureItem(item as Feature);
}

/** Draw a Unesco item without an emoji lookup. */
export function drawUnescoListItem(
  _readEmoji: ReadThingEmoji,
  item: ThingListItem,
): m.Children {
  return drawUnescoItem(item as Unesco);
}

/** Draw a taxon item with its emoji reader. */
export function drawTaxonListItem(
  readEmoji: ReadThingEmoji,
  item: ThingListItem,
): m.Children {
  return drawTaxonItem(readEmoji, item as TripleObject);
}

/** Dispatch a thing list item to the drawer for its kind. */
export function drawThingListItem(
  kind: ThingListKind,
  readEmoji: ReadThingEmoji,
  item: ThingListItem,
): m.Children {
  const drawItem = THING_LIST_DRAWERS[kind];
  return drawItem(readEmoji, item);
}

/** Apply the ordering required by a thing list kind. */
export function sortThingList(
  kind: ThingListKind,
  items: ThingListItem[],
): void {
  if (kind === ThingListKind.PLACE) {
    items.sort(comparePlaceNames);
  }
}

/** Draw thing list items as an unordered list. */
export function drawThingList(
  kind: ThingListKind,
  readEmoji: ReadThingEmoji,
  items: ThingListItem[],
): m.Children {
  const drawItem = drawThingListItem.bind(null, kind, readEmoji);
  const children = items.map(drawItem);
  return m("ul", children);
}

/** Read, sort, and draw the items for a thing list component. */
export function viewThingList(vnode: m.Vnode<ThingListAttrs>): m.Children {
  const { kind, urns, readItems, readEmoji } = vnode.attrs;
  const items = readItems(kind, urns);
  sortThingList(kind, items);
  return drawThingList(kind, readEmoji, items);
}
