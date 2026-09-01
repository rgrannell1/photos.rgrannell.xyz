/* Support thing operations. */

import m from "mithril";
import { setOf } from "../../../../commons/collections/sets.ts";
import { KnownRelations, ThingListKind } from "../../../../constants/data.ts";
import type { CachedReader, SeenInCountry, ThingPageAttrs } from "../view/thing.ts";
import { drawMetadataRow, drawSeenInCountry, drawThingList } from "./cache.ts";
import {
  addClassificationMetadata,
  addSingleMetadataWhenPresent,
} from "./metadata.ts";

/** Render place URNs with the place-specific thing-list rules. */
export function drawLocatedInList(
  attrs: ThingPageAttrs,
  urns: Set<string>,
): m.Children {
  const kind = ThingListKind.PLACE;
  return drawThingList(attrs, kind, urns);
}

/** Add the containing places when the thing has `in` relations. */
export function addLocatedInMetadata(
  metadata: Record<string, m.Children>,
  attrs: ThingPageAttrs,
): void {
  const locatedIn = setOf<string>(KnownRelations.IN, attrs.things);
  if (locatedIn.size === 0) {
    return;
  }
  const $list = drawLocatedInList(attrs, locatedIn);
  metadata["Located In"] = $list;
}

/** Report whether a collection contains at least one item. */
export function hasItems(items: unknown[]): boolean {
  return items.length > 0;
}

/** Render countries where the thing has appeared. */
export function drawSeenInList(countries: SeenInCountry[]): m.Children {
  const children = countries.map(drawSeenInCountry);
  return m(".seen-in-list", children);
}

/** Add country sightings for binomial things that have sighting data. */
export function addSeenInMetadata(
  metadata: Record<string, m.Children>,
  attrs: ThingPageAttrs,
  seenInFor: CachedReader<SeenInCountry[]>,
): void {
  if (!attrs.isBinomial) {
    return;
  }
  const seenIn = seenInFor(attrs);
  const hasCountries = hasItems(seenIn);
  if (!hasCountries) {
    return;
  }
  metadata["Seen In"] = drawSeenInList(seenIn);
}

/** Convert metadata entries to rows in their insertion order. */
export function readMetadataRows(
  metadata: Record<string, m.Children>,
): m.Children[] {
  const entries = Object.entries(metadata);
  return entries.map(drawMetadataRow);
}

/** Render non-empty thing metadata as a details table. */
export function drawThingDetails(rows: m.Children[]): m.Children {
  const $heading = m("h3", "Details");
  const $table = m("table.metadata-table", rows);
  return m("div", [$heading, $table]);
}

/** Add relation-based metadata to a thing's metadata map. */
export function addRelatedMetadata(
  metadata: Record<string, m.Children>,
  attrs: ThingPageAttrs,
  seenInFor: CachedReader<SeenInCountry[]>,
): void {
  addLocatedInMetadata(metadata, attrs);
  addSingleMetadataWhenPresent(metadata, attrs);
  addSeenInMetadata(metadata, attrs, seenInFor);
}

/** Build the classification and relation metadata for one thing. */
export function readThingMetadata(
  seenInFor: CachedReader<SeenInCountry[]>,
  attrs: ThingPageAttrs,
): Record<string, m.Children> {
  const metadata: Record<string, m.Children> = {};
  const urn = attrs.urn;
  addClassificationMetadata(metadata, urn);
  addRelatedMetadata(metadata, attrs, seenInFor);
  return metadata;
}

/** Render thing details, or nothing when no metadata rows exist. */
export function viewThingDetails(
  seenInFor: CachedReader<SeenInCountry[]>,
  vnode: m.Vnode<ThingPageAttrs>,
): m.Children {
  const attrs = vnode.attrs;
  const metadata = readThingMetadata(seenInFor, attrs);
  const rows = readMetadataRows(metadata);
  if (!rows.length) {
    return null;
  }
  return drawThingDetails(rows);
}
