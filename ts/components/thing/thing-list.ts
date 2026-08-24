/*
 * Lists of thing links rendered as a <ul>. Each kind keeps its own read
 * function, link component, ordering, and key behaviour.
 */

import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../commons/arrays.ts";
import type { Feature, Place, Services, Unesco } from "../../types.ts";
import { FeatureLink, ThingLink, UnescoLink } from "./thing-link.ts";

export type ThingListKind = "place" | "feature" | "unesco" | "taxon";

type DrawItems = (services: Services, urns: Set<string>) => m.Children[];

function comparePlaceNames(
  loca: Place | Unesco,
  locb: Place | Unesco,
): number {
  return (one(loca.name) ?? "").localeCompare(one(locb.name) ?? "");
}

function drawPlaceItem(location: Place | Unesco): m.Children {
  const $link = m(ThingLink, {
    urn: one(location.id)!,
    thing: location,
  });
  return m("li", { key: `place-${location.id}` }, $link);
}

function drawPlaceItems(services: Services, urns: Set<string>): m.Children[] {
  const locations = services.readLocations(urns).sort(comparePlaceNames);
  return locations.map(drawPlaceItem);
}

function drawFeatureItem(feature: Feature): m.Children {
  const id = one(feature.id)!;

  return m("li", {
    key: `feature-${id}`,
  }, m(FeatureLink, { urn: id, thing: feature }));
}

function drawFeatureItems(services: Services, urns: Set<string>): m.Children[] {
  return services.readFeatures(urns).map(drawFeatureItem);
}

function drawUnescoItem(unesco: Unesco): m.Children {
  const urn = one(unesco.id)!;

  return m("li", { key: `unesco-${urn}` }, m(UnescoLink, { urn, thing: unesco }));
}

function drawUnescoItems(services: Services, urns: Set<string>): m.Children[] {
  return services.readUnescos(urns).map(drawUnescoItem);
}

function drawTaxonItem(taxon: TripleObject): m.Children {
  const urn = one(taxon.id) as string;

  return m("li", { key: `taxon-${urn}` }, m(ThingLink, { urn, thing: taxon }));
}

function drawTaxonItems(services: Services, urns: Set<string>): m.Children[] {
  return services.readTaxons(urns).map(drawTaxonItem);
}

const LIST_KINDS: Record<ThingListKind, DrawItems> = {
  place: drawPlaceItems,
  feature: drawFeatureItems,
  unesco: drawUnescoItems,
  taxon: drawTaxonItems,
};

type ThingListAttrs = {
  kind: ThingListKind;
  urns: Set<string>;
  services: Services;
};

function viewThingList(vnode: m.Vnode<ThingListAttrs>): m.Children {
  const { kind, urns, services } = vnode.attrs;
  const drawItems = LIST_KINDS[kind];

  return m("ul", drawItems(services, urns));
}

export function ThingList() {
  return { view: viewThingList };
}
