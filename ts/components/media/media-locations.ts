/*
 * Shared location rendering for photos and videos, split into geographic
 * (places/countries) and feature (place_feature: museum, city, etc.) modes.
 */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { arrayify } from "../../commons/arrays.ts";
import { KnownTypes } from "../../constants/data.ts";
import { HiddenPlaceFeatures } from "../../constants/display.ts";
import type { Services } from "../../types.ts";

/* a place feature worth showing as a "place type" — excludes overly-generic
   ones (country, continent) that every photo trivially has */
export function isVisiblePlaceFeature(urn: string): boolean {
  const { type, id } = asUrn(urn);
  return type === KnownTypes.PLACE_FEATURE && !HiddenPlaceFeatures.has(id);
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
        ? allUrns.filter(isVisiblePlaceFeature)
        : allUrns.filter(isPlace);

      const $links = services.toThingLinks(urns);
      return m("td", $links.length > 0 ? $links : "—");
    },
  };
}
