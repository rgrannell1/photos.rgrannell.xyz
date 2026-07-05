/*
 * Lists of thing links (places, place features, UNESCO sites) rendered as a
 * <ul>. One config-driven component; each kind keeps its own read function,
 * link component, ordering, and key behaviour.
 */

import m from "mithril";
import { one } from "../commons/arrays.ts";
import type { Services } from "../types.ts";
import { FeatureLink, ThingLink, UnescoLink } from "./thing-link.ts";

export type ThingListKind = "place" | "feature" | "unesco";

type DrawItems = (services: Services, urns: Set<string>) => m.Children[];

const LIST_KINDS: Record<ThingListKind, DrawItems> = {
  place: (services, urns) => {
    const locations = services.readLocations(urns).sort(
      (loca, locb) => {
        return (one(loca.name) ?? "").localeCompare(one(locb.name) ?? "");
      },
    );

    return locations.map((location) => {
      const $link = m(ThingLink, {
        urn: one(location.id)!,
        thing: location,
      });
      return m("li", { key: `place-${location.id}` }, $link);
    });
  },
  feature: (services, urns) => {
    return services.readFeatures(urns).map((feature) => {
      const id = one(feature.id)!;

      return m("li", {
        key: `feature-${id}`,
      }, m(FeatureLink, { urn: id, thing: feature }));
    });
  },
  unesco: (services, urns) => {
    return services.readUnescos(urns).map((unesco) => {
      const urn = one(unesco.id)!;

      return m("li", m(UnescoLink, { urn, thing: unesco }));
    });
  },
};

type ThingListAttrs = {
  kind: ThingListKind;
  urns: Set<string>;
  services: Services;
};

export function ThingList() {
  return {
    view(vnode: m.Vnode<ThingListAttrs>) {
      const { kind, urns, services } = vnode.attrs;
      const drawItems = LIST_KINDS[kind];

      return m("ul", drawItems(services, urns));
    },
  };
}
