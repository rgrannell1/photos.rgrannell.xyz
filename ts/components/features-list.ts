
import m from "mithril";
import type { Services } from "../types.ts";
import { one } from "../commons/arrays.ts";
import { ThingLink } from "./thing-link.ts";

type FeaturesListAttrs = {
  urns: Set<string>;
  services: Services;
};

export function FeaturesList() {
  return {
    view(vnode: m.Vnode<FeaturesListAttrs>) {
      const { urns, services } = vnode.attrs;
      const features = services.readParsedFeatures(urns);

      const $features = features.map((feature) => {
        const id = one(feature.id)!;

        return m('li', {
          key: `feature-${id}`,
        }, m(ThingLink, { urn: id, thing: feature }));
      });

      return m('ul', $features)
    }
  }
}
