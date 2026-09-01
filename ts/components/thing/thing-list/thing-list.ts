/*
 * Lists of thing links rendered as a <ul>. Each kind keeps its own read
 * function, link component, ordering, and key behaviour.
 */

import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";

import type { Feature, Place, Unesco } from "../../../types/domain.ts";

import type { ReadThingEmoji } from "../navigation/thing-link.ts";

import { ThingListKind } from "../../../constants/data.ts";
import {
  drawFeatureListItem,
  drawPlaceListItem,
  drawTaxonListItem,
  drawUnescoListItem,
  viewThingList,
} from "./render.ts";

export type ThingListItem = Place | Feature | Unesco | TripleObject;

export type ReadThingList = (
  kind: ThingListKind,
  urns: Set<string>,
) => ThingListItem[];

type DrawThingListItem = (
  readEmoji: ReadThingEmoji,
  item: ThingListItem,
) => m.Children;

export const THING_LIST_DRAWERS: Record<ThingListKind, DrawThingListItem> = {
  [ThingListKind.FEATURE]: drawFeatureListItem,
  [ThingListKind.PLACE]: drawPlaceListItem,
  [ThingListKind.TAXON]: drawTaxonListItem,
  [ThingListKind.UNESCO]: drawUnescoListItem,
};

export type ThingListAttrs = {
  kind: ThingListKind;
  urns: Set<string>;
  readItems: ReadThingList;
  readEmoji: ReadThingEmoji;
};

/** Create the shared thing-list component. */
export function ThingList() {
  return { view: viewThingList };
}
