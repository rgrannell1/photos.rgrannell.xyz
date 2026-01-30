import m from "mithril";
import type { Services } from "../types.ts";
import { one } from "../commons/arrays.ts";
import { FeatureLink } from "./feature-link.ts";

type FeaturesListAttrs = {
  urns: Set<string>;
  services: Services;
};

/*
 * A list of place features; each links to its thing page.
 */
export function FeaturesList() {
  return {
    view(vnode: m.Vnode<FeaturesListAttrs>) {
      const { urns, services } = vnode.attrs;
      const features = services.readFeatures(urns);

      const $features = features.map((feature) => {
        const id = one(feature.id)!;

        return m("li", {
          key: `feature-${id}`,
        }, m(FeatureLink, { urn: id, thing: feature }));
      });

      return m("ul", $features);
    },
  };
}
