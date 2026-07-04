/*
 * Shared location rendering for photos and videos, split into geographic
 * (places/countries) and feature (place_feature: museum, city, etc.) modes.
 */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { arrayify } from "../commons/arrays.ts";
import { KnownTypes } from "../constants.ts";
import type { Services } from "../types.ts";

export function isPlaceFeature(urn: string): boolean {
  return asUrn(urn).type === KnownTypes.PLACE_FEATURE;
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

/* geographic = places/countries; feature = place_feature types (museum, city, etc.) */
export function MediaLocations() {
  return {
    view(vnode: m.Vnode<MediaLocationsAttrs>) {
      const { location, services, mode } = vnode.attrs;

      const allUrns = arrayify(location);
      const urns = mode === "feature"
        ? allUrns.filter(isPlaceFeature)
        : allUrns.filter(isPlace);

      const $links = services.toThingLinks(urns);
      return m("td", $links.length > 0 ? $links : "—");
    },
  };
}
