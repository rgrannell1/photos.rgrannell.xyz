/*
 * Lists of thing links rendered as a <ul>. Each kind keeps its own read
 * function, link component, ordering, and key behaviour.
 */

import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../commons/arrays.ts";
import type { Feature, Place, Unesco } from "../../types.ts";
import { FeatureLink, ThingLink, UnescoLink } from "./thing-link.ts";
import type { ReadThingEmoji } from "./thing-link.ts";

export type ThingListKind = "place" | "feature" | "unesco" | "taxon";

function comparePlaceNames(
  loca: ThingListItem,
  locb: ThingListItem,
): number {
  return (one(loca.name) ?? "").localeCompare(one(locb.name) ?? "");
}

function drawPlaceItem(
  readEmoji: ReadThingEmoji,
  location: Place | Unesco,
): m.Children {
  const $link = m(ThingLink, {
    urn: one(location.id)!,
    thing: location,
    readEmoji,
  });
  return m("li", { key: `place-${location.id}` }, $link);
}

function drawFeatureItem(feature: Feature): m.Children {
  const id = one(feature.id)!;

  return m("li", {
    key: `feature-${id}`,
  }, m(FeatureLink, { urn: id, thing: feature }));
}

function drawUnescoItem(unesco: Unesco): m.Children {
  const urn = one(unesco.id)!;

  return m("li", { key: `unesco-${urn}` }, m(UnescoLink, { urn, thing: unesco }));
}

function drawTaxonItem(
  readEmoji: ReadThingEmoji,
  taxon: TripleObject,
): m.Children {
  const urn = one(taxon.id) as string;

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
  if (kind === "place") {
    return drawPlaceItem(readEmoji, item as Place | Unesco);
  }
  if (kind === "feature") {
    return drawFeatureItem(item as Feature);
  }
  if (kind === "unesco") {
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

  if (kind === "place") {
    items.sort(comparePlaceNames);
  }

  return m("ul", items.map(drawThingListItem.bind(null, kind, readEmoji)));
}

export function ThingList() {
  return { view: viewThingList };
}
