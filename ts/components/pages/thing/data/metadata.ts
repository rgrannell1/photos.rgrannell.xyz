/* Support thing operations. */

import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { type ThingListKind } from "../../../thing/thing-list/thing-list.ts";
import { setify } from "../../../../commons/collections/sets.ts";
import { TAXON_RANKS, THING_LIST_KINDS } from "../../../../constants/data.ts";
import { ListingLink } from "../../../thing/navigation/listing-link.ts";
import type { ThingMetadata, ThingPageAttrs } from "../view/thing.ts";
import { cachedByUrn, drawThingList, readSeenIn } from "./cache.ts";
import { viewThingDetails } from "./details.ts";
import { addSingleThingMetadata } from "../view/media.ts";

export function addClassificationMetadata(
  metadata: Record<string, m.Children>,
  urn: string,
): void {
  metadata.Classification = m(ListingLink, { urn });
}

export function addSingleMetadataWhenPresent(
  metadata: Record<string, m.Children>,
  attrs: ThingPageAttrs,
): void {
  if (attrs.things.length !== 1) {
    return;
  }
  addSingleThingMetadata(metadata, attrs);
}

export function ThingDetails() {
  const seenInFor = cachedByUrn(readSeenIn);

  return { view: viewThingDetails.bind(null, seenInFor) };
}

export function addThingListMetadata(
  metadata: Record<string, m.Children>,
  attrs: ThingPageAttrs,
  item: ThingMetadata,
): void {
  if (!item.values) {
    return;
  }
  const urns = setify(item.values);
  const list = drawThingList(attrs, item.kind, urns);
  metadata[item.label] = list;
}

export function readThingMetadataItem(
  label: string,
  kind: ThingListKind,
  values: string | string[] | undefined,
): ThingMetadata {
  return { label, kind, values };
}

export function readLocationMetadata(thing: TripleObject): ThingMetadata[] {
  const feature = readThingMetadataItem(
    "Place Type",
    THING_LIST_KINDS.FEATURE,
    thing.features,
  );
  const places = readThingMetadataItem(
    "Places",
    THING_LIST_KINDS.PLACE,
    thing.placesWithFeature,
  );
  return [feature, places];
}

export function readRelationMetadata(thing: TripleObject): ThingMetadata[] {
  const contains = readThingMetadataItem(
    "Contains",
    THING_LIST_KINDS.PLACE,
    thing.contains,
  );
  const unesco = readThingMetadataItem(
    "UNESCO",
    THING_LIST_KINDS.UNESCO,
    thing.unescoId,
  );
  return [contains, unesco];
}

export function readBaseThingMetadata(thing: TripleObject): ThingMetadata[] {
  const locationItems = readLocationMetadata(thing);
  const relationItems = readRelationMetadata(thing);
  return [...locationItems, ...relationItems];
}

export function toRankMetadata(
  thing: TripleObject,
  rank: typeof TAXON_RANKS[number],
): ThingMetadata {
  return readThingMetadataItem(
    rank.label,
    THING_LIST_KINDS.TAXON,
    thing[rank.relation],
  );
}

export function readRankMetadata(thing: TripleObject): ThingMetadata[] {
  const readRank = toRankMetadata.bind(null, thing);
  const metadata = TAXON_RANKS.map(readRank);
  return metadata;
}
