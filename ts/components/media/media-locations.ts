/* Location rendering for photos and videos, in geographic or feature mode. */

import m from "mithril";
import { toThingLinks, type ReadThing } from "../thing/thing-links.ts";
import type { ReadThingEmoji } from "../thing/thing-link.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { arrayify, one } from "../../commons/arrays.ts";
import { KnownTypes } from "../../constants/data.ts";

/* A place feature worth showing as a "place type". Features published as
   generic (country, continent) apply to every photo, so they are excluded. */
export function isVisiblePlaceFeature(readThing: ReadThing, urn: string): boolean {
  const { type } = asUrn(urn);
  if (type !== KnownTypes.PLACE_FEATURE) {
    return false;
  }

  const feature = readThing(urn);

  return one(feature?.generic) !== "true";
}

/* geographic locations exclude country/continent — only concrete places are shown */
export function isPlace(urn: string): boolean {
  return asUrn(urn).type === KnownTypes.PLACE;
}

type MediaLocationsAttrs = {
  location: string | string[] | undefined;
  readThing: ReadThing;
  readEmoji: ReadThingEmoji;
  mode: "geographic" | "feature";
};

function viewMediaLocations(vnode: m.Vnode<MediaLocationsAttrs>): m.Children {
  const { location, readThing, readEmoji, mode } = vnode.attrs;

  const allUrns = arrayify(location);
  const urns = mode === "feature"
    ? allUrns.filter(isVisiblePlaceFeature.bind(null, readThing))
    : allUrns.filter(isPlace);

  const $links = toThingLinks(readThing, readEmoji, urns);
  return m("td", $links.length > 0 ? $links : "—");
}

export function MediaLocations() {
  return { view: viewMediaLocations };
}
