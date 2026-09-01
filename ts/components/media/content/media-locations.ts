/* Location rendering for photos and videos, in geographic or feature mode. */

import m from "mithril";
import { type ReadThing, toThingLinks } from "../../thing/navigation/thing-links.ts";
import type { ReadThingEmoji } from "../../thing/navigation/thing-link.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { arrayify, selectFirst } from "../../../commons/collections/arrays.ts";
import { DATA_TRUE, KnownTypes } from "../../../constants/data.ts";
import { MediaLocationMode } from "../../../constants/display.ts";
import { isNone, type Maybe } from "../../../commons/collections/maybe.ts";

/** Reports whether a URN identifies a place feature. */
function isPlaceFeature(urn: string): boolean {
  return asUrn(urn).type === KnownTypes.PLACE_FEATURE;
}

/* A place feature worth showing as a "place type". Features published as
   generic (country, continent) apply to every photo, so they are excluded. */
/** Reports whether a place feature is specific enough to show. */
export function isVisiblePlaceFeature(
  readThing: ReadThing,
  urn: string,
): boolean {
  if (!isPlaceFeature(urn)) {
    return false;
  }

  const feature = readThing(urn);
  const isVisible = isNone(feature) || selectFirst(feature.generic) !== DATA_TRUE;
  return isVisible;
}

/* geographic locations exclude country/continent — only concrete places are shown */
/** Reports whether a URN identifies a concrete place. */
export function isPlace(urn: string): boolean {
  return asUrn(urn).type === KnownTypes.PLACE;
}

type MediaLocationsAttrs = {
  location: Maybe<string | string[]>;
  readThing: ReadThing;
  readEmoji: ReadThingEmoji;
  mode: MediaLocationMode;
};

/** Normalises an optional single or plural location into a URN list. */
function listLocationUrns(location: Maybe<string | string[]>): string[] {
  const urns = isNone(location) ? [] : arrayify(location);
  return urns;
}

/** Selects concrete places or visible features for the requested mode. */
function selectLocationUrns(attrs: MediaLocationsAttrs): string[] {
  const { location, readThing, mode } = attrs;
  const allUrns = listLocationUrns(location);
  if (mode === MediaLocationMode.Feature) {
    return allUrns.filter(isVisiblePlaceFeature.bind(null, readThing));
  }
  return allUrns.filter(isPlace);
}

/** Converts location URNs into internal thing links. */
function drawLocationLinks(
  attrs: MediaLocationsAttrs,
  urns: string[],
): m.Children[] {
  const links = toThingLinks(attrs.readThing, attrs.readEmoji, urns);
  return links;
}

/** Uses an em dash when no location links exist. */
function locationContent(links: m.Children[]): m.Children {
  const hasLinks = links.length > 0;
  return hasLinks ? links : "—";
}

/** Draws the selected media locations as a table cell. */
function viewMediaLocations(vnode: m.Vnode<MediaLocationsAttrs>): m.Children {
  const urns = selectLocationUrns(vnode.attrs);
  const $links = drawLocationLinks(vnode.attrs, urns);
  const content = locationContent($links);
  return m("td", content);
}

/** Creates the media locations table-cell component. */
export function MediaLocations() {
  return { view: viewMediaLocations };
}
