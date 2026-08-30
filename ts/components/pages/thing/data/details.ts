/* Support thing operations. */

import m from "mithril";
import { setOf } from "../../../../commons/collections/sets.ts";
import { KnownRelations, THING_LIST_KINDS } from "../../../../constants/data.ts";
import type { CachedReader, SeenInCountry, ThingPageAttrs } from "../view/thing.ts";
import { drawMetadataRow, drawSeenInCountry, drawThingList } from "./cache.ts";
import {
  addClassificationMetadata,
  addSingleMetadataWhenPresent,
} from "./metadata.ts";

export function drawLocatedInList(
  attrs: ThingPageAttrs,
  urns: Set<string>,
): m.Children {
  const kind = THING_LIST_KINDS.PLACE;
  return drawThingList(attrs, kind, urns);
}

export function addLocatedInMetadata(
  metadata: Record<string, m.Children>,
  attrs: ThingPageAttrs,
): void {
  const locatedIn = setOf<string>(KnownRelations.IN, attrs.things);
  if (locatedIn.size === 0) {
    return;
  }
  const list = drawLocatedInList(attrs, locatedIn);
  metadata["Located In"] = list;
}

export function hasItems(items: unknown[]): boolean {
  return items.length > 0;
}

export function drawSeenInList(countries: SeenInCountry[]): m.Children {
  const children = countries.map(drawSeenInCountry);
  return m(".seen-in-list", children);
}

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

export function readMetadataRows(
  metadata: Record<string, m.Children>,
): m.Children[] {
  const entries = Object.entries(metadata);
  return entries.map(drawMetadataRow);
}

export function drawThingDetails(rows: m.Children[]): m.Children {
  const heading = m("h3", "Details");
  const table = m("table.metadata-table", rows);
  return m("div", [heading, table]);
}

export function addRelatedMetadata(
  metadata: Record<string, m.Children>,
  attrs: ThingPageAttrs,
  seenInFor: CachedReader<SeenInCountry[]>,
): void {
  addLocatedInMetadata(metadata, attrs);
  addSingleMetadataWhenPresent(metadata, attrs);
  addSeenInMetadata(metadata, attrs, seenInFor);
}

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
