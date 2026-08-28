/* Location rendering for photos and videos, in geographic or feature mode. */

import m from "mithril";
import { toThingLinks, type ReadThing } from "../thing/thing-links.ts";
import type { ReadThingEmoji } from "../thing/thing-link.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { arrayify, one } from "../../commons/arrays.ts";
import { DATA_TRUE, KnownTypes } from "../../constants/data.ts";
import { MEDIA_LOCATION_MODES } from "../../constants/display.ts";
import { isNone, type Maybe } from "../../commons/maybe.ts";

export type MediaLocationMode =
  typeof MEDIA_LOCATION_MODES[keyof typeof MEDIA_LOCATION_MODES];

/* A place feature worth showing as a "place type". Features published as
   generic (country, continent) apply to every photo, so they are excluded. */
export function isVisiblePlaceFeature(readThing: ReadThing, urn: string): boolean {
  const { type } = asUrn(urn);
  if (type !== KnownTypes.PLACE_FEATURE) {
    return false;
  }

  const feature = readThing(urn);

  return isNone(feature) || one(feature.generic) !== DATA_TRUE;
}

/* geographic locations exclude country/continent — only concrete places are shown */
export function isPlace(urn: string): boolean {
  return asUrn(urn).type === KnownTypes.PLACE;
}

type MediaLocationsAttrs = {
  location: Maybe<string | string[]>;
  readThing: ReadThing;
  readEmoji: ReadThingEmoji;
  mode: MediaLocationMode;
};

function viewMediaLocations(vnode: m.Vnode<MediaLocationsAttrs>): m.Children {
  const { location, readThing, readEmoji, mode } = vnode.attrs;

  const allUrns = isNone(location) ? [] : arrayify(location);
  const urns = mode === MEDIA_LOCATION_MODES.FEATURE
    ? allUrns.filter(isVisiblePlaceFeature.bind(null, readThing))
    : allUrns.filter(isPlace);

  const $links = toThingLinks(readThing, readEmoji, urns);
  return m("td", $links.length > 0 ? $links : "—");
}

export function MediaLocations() {
  return { view: viewMediaLocations };
}
