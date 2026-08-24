/* Location rendering for photos and videos, in geographic or feature mode. */

import m from "mithril";
import { toThingLinks } from "../thing/thing-links.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { arrayify, one } from "../../commons/arrays.ts";
import { KnownTypes } from "../../constants/data.ts";
import { getTribbleDB } from "../../semantic/data.ts";
import type { Services } from "../../types.ts";

/* A place feature worth showing as a "place type". Features published as
   generic (country, continent) apply to every photo, so they are excluded. */
export function isVisiblePlaceFeature(urn: string): boolean {
  const { type, id } = asUrn(urn);
  if (type !== KnownTypes.PLACE_FEATURE) {
    return false;
  }

  const feature = getTribbleDB().search({
    source: { type: KnownTypes.PLACE_FEATURE, id },
  }).firstObject();

  return one(feature?.generic) !== "true";
}

/* geographic locations exclude country/continent — only concrete places are shown */
export function isPlace(urn: string): boolean {
  return asUrn(urn).type === KnownTypes.PLACE;
}

type MediaLocationsAttrs = {
  location: string | string[] | undefined;
  services: Services;
  mode: "geographic" | "feature";
};

function viewMediaLocations(vnode: m.Vnode<MediaLocationsAttrs>): m.Children {
  const { location, services, mode } = vnode.attrs;

  const allUrns = arrayify(location);
  const urns = mode === "feature"
    ? allUrns.filter(isVisiblePlaceFeature)
    : allUrns.filter(isPlace);

  const $links = toThingLinks(services, urns);
  return m("td", $links.length > 0 ? $links : "—");
}

export function MediaLocations() {
  return { view: viewMediaLocations };
}
