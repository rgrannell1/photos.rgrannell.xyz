import { asUrn } from "@rgrannell1/tribbledb";
import m from "mithril";
import { navigate } from "../events.ts";

import { KnownTypes, PLACE_FEATURES_TO_EMOJI } from "../constants.ts";
import { one } from "../arrays.ts";

export type ThingLinkAttrs = {
  urn: string;
  thing: any;
};

export function thingEmoji(urn: string, name: string, thing: any): string {
  const { type } = asUrn(urn);

  if (type === KnownTypes.PLACE) {
    const feature = one(thing.feature);
    const { id: featureId } = asUrn(feature);

    if (PLACE_FEATURES_TO_EMOJI.hasOwnProperty(featureId)) {
      return PLACE_FEATURES_TO_EMOJI[
        featureId as keyof typeof PLACE_FEATURES_TO_EMOJI
      ];
    }

    return "📍";
  } else if (type === KnownTypes.BIRD) {
    return "🐤";
  }

  return "";
}

export function ThingLink() {
  return {
    view(vnode: m.Vnode<ThingLinkAttrs>) {
      const { urn, thing } = vnode.attrs;
      const { type, id } = asUrn(urn);

      const name = one(thing.name) ?? id;
      const emoji = thingEmoji(urn, name, thing);

      return m("a", {
        href: urn,
        onclick: navigate(`/thing/${type}:${id}`),
        class: ["thing-link", `${type}-link`].join(" "),
      }, `${emoji}\t${name}`);
    },
  };
}
