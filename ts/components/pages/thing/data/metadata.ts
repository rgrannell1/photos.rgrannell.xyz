/* Support thing operations. */

import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { setify } from "../../../../commons/collections/sets.ts";
import { TAXON_RANKS, ThingListKind } from "../../../../constants/data.ts";
import { ListingLink } from "../../../thing/navigation/listing-link.ts";
import type {
  ThingMetadata,
  ThingPageAttrs,
  ThingSectionComponent,
} from "../view/thing.ts";
import { cachedByUrn, drawThingList, readSeenIn } from "./cache.ts";
import { viewThingDetails } from "./details.ts";
import { addSingleThingMetadata } from "../view/media.ts";

/** Adds a linked classification entry for the supplied thing URN. */
export function addClassificationMetadata(
  metadata: Record<string, m.Children>,
  urn: string,
): void {
  metadata.Classification = m(ListingLink, { urn });
}

/** Adds media metadata only when the page represents one thing. */
export function addSingleMetadataWhenPresent(
  metadata: Record<string, m.Children>,
  attrs: ThingPageAttrs,
): void {
  if (attrs.things.length !== 1) {
    return;
  }
  addSingleThingMetadata(metadata, attrs);
}

/** Creates thing details with a URN-scoped cache for observation data. */
export function ThingDetails(): ThingSectionComponent {
  const seenInFor = cachedByUrn(readSeenIn);

  return { view: viewThingDetails.bind(null, seenInFor) };
}

/** Adds a rendered metadata list when the source item has values. */
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

/** Packages a metadata label, list kind, and optional source values. */
export function readThingMetadataItem(
  label: string,
  kind: ThingListKind,
  values: string | string[] | undefined,
): ThingMetadata {
  return { label, kind, values };
}

/** Returns place-type and contained-place metadata for a thing. */
export function readLocationMetadata(thing: TripleObject): ThingMetadata[] {
  const feature = readThingMetadataItem(
    "Place Type",
    ThingListKind.FEATURE,
    thing.features,
  );
  const places = readThingMetadataItem(
    "Places",
    ThingListKind.PLACE,
    thing.placesWithFeature,
  );
  return [feature, places];
}

/** Returns containment and UNESCO metadata for a thing. */
export function readRelationMetadata(thing: TripleObject): ThingMetadata[] {
  const contains = readThingMetadataItem(
    "Contains",
    ThingListKind.PLACE,
    thing.contains,
  );
  const unesco = readThingMetadataItem(
    "UNESCO",
    ThingListKind.UNESCO,
    thing.unescoId,
  );
  return [contains, unesco];
}

/** Combines the standard location and relation metadata for a thing. */
export function readBaseThingMetadata(thing: TripleObject): ThingMetadata[] {
  const locationItems = readLocationMetadata(thing);
  const relationItems = readRelationMetadata(thing);
  return [...locationItems, ...relationItems];
}

/** Maps one configured taxonomic rank to metadata from a thing. */
export function toRankMetadata(
  thing: TripleObject,
  rank: typeof TAXON_RANKS[number],
): ThingMetadata {
  return readThingMetadataItem(
    rank.label,
    ThingListKind.TAXON,
    thing[rank.relation],
  );
}

/** Returns metadata for every configured taxonomic rank. */
export function readRankMetadata(thing: TripleObject): ThingMetadata[] {
  const readRank = toRankMetadata.bind(null, thing);
  const metadata = TAXON_RANKS.map(readRank);
  return metadata;
}
