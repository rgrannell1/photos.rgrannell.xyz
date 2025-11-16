import m from "mithril";
import { one } from "../commons/arrays.ts";
import type { Services } from "../types.ts";
import { ThingLink } from "./thing-link.ts";

type PlacesListAttrs = {
  urns: Set<string>;
  services: Services;
};

export function PlacesList() {
  return {
    view(vnode: m.Vnode<PlacesListAttrs>) {
      const { urns, services } = vnode.attrs;
      const locations = services.readLocations(urns).sort(
        (loca, locb) => {
          return (one(loca.name) ?? "").localeCompare(one(locb.name) ?? "");
        },
      );

      const $places = locations.map((location) => {
        const $link = m(ThingLink, {
          urn: one(location.id)!,
          thing: location,
        });
        return m("li", { key: `place-${location.id}` }, $link);
      });

      return m("ul", $places);
    },
  };
}
