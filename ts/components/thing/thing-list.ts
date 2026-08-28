/*
 * Lists of thing links rendered as a <ul>. Each kind keeps its own read
 * function, link component, ordering, and key behaviour.
 */

import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../commons/arrays.ts";
import type { Feature, Place, Unesco } from "../../types/domain.ts";
import { FeatureLabel } from "./feature-label.ts";
import { ThingLink } from "./thing-link.ts";
import { UnescoLink } from "./unesco-link.ts";
import type { ReadThingEmoji } from "./thing-link.ts";
import { fromNullable, isNone, withDefault } from "../../commons/maybe.ts";
import { THING_LIST_KINDS } from "../../constants/data.ts";

export type ThingListKind =
  typeof THING_LIST_KINDS[keyof typeof THING_LIST_KINDS];

function comparePlaceNames(
  loca: ThingListItem,
  locb: ThingListItem,
): number {
  const first = withDefault(one(fromNullable(loca.name)), "");
  const second = withDefault(one(fromNullable(locb.name)), "");
  return first.localeCompare(second);
}

function drawPlaceItem(
  readEmoji: ReadThingEmoji,
  location: Place | Unesco,
): m.Children {
  const urn = one(location.id);
  if (isNone(urn)) {
    return null;
  }

  const $link = m(ThingLink, {
    urn,
    thing: location,
    readEmoji,
  });
  return m("li", { key: `place-${location.id}` }, $link);
}

function drawFeatureItem(feature: Feature): m.Children {
  const id = one(feature.id);
  if (isNone(id)) {
    return null;
  }

  return m("li", {
    key: `feature-${id}`,
  }, m(FeatureLabel, { urn: id, thing: feature }));
}

function drawUnescoItem(unesco: Unesco): m.Children {
  const urn = one(unesco.id);
  if (isNone(urn)) {
    return null;
  }

  return m("li", { key: `unesco-${urn}` }, m(UnescoLink, { urn, thing: unesco }));
}

function drawTaxonItem(
  readEmoji: ReadThingEmoji,
  taxon: TripleObject,
): m.Children {
  const urn = one(taxon.id);
  if (isNone(urn)) {
    return null;
  }

  return m("li", { key: `taxon-${urn}` }, m(ThingLink, {
    urn,
    thing: taxon,
    readEmoji,
  }));
}

export type ThingListItem = Place | Feature | Unesco | TripleObject;

export type ReadThingList = (
  kind: ThingListKind,
  urns: Set<string>,
) => ThingListItem[];

function drawThingListItem(
  kind: ThingListKind,
  readEmoji: ReadThingEmoji,
  item: ThingListItem,
): m.Children {
  if (kind === THING_LIST_KINDS.PLACE) {
    return drawPlaceItem(readEmoji, item as Place | Unesco);
  }
  if (kind === THING_LIST_KINDS.FEATURE) {
    return drawFeatureItem(item as Feature);
  }
  if (kind === THING_LIST_KINDS.UNESCO) {
    return drawUnescoItem(item as Unesco);
  }
  return drawTaxonItem(readEmoji, item as TripleObject);
}

type ThingListAttrs = {
  kind: ThingListKind;
  urns: Set<string>;
  readItems: ReadThingList;
  readEmoji: ReadThingEmoji;
};

function viewThingList(vnode: m.Vnode<ThingListAttrs>): m.Children {
  const { kind, urns, readItems, readEmoji } = vnode.attrs;
  const items = readItems(kind, urns);

  if (kind === THING_LIST_KINDS.PLACE) {
    items.sort(comparePlaceNames);
  }

  return m("ul", items.map(drawThingListItem.bind(null, kind, readEmoji)));
}

export function ThingList() {
  return { view: viewThingList };
}
