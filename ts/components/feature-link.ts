import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";

import { one } from "../commons/arrays.ts";
import { navigate } from "../commons/events.ts";
import { thingEmoji } from "../services/emoji.ts";

export type FeatureLinkAttrs = {
  urn: string;
  thing: any;
};

/*
 * Place features link to their thing page. The thing page for a place_feature may show
 * a limited view; ideally we'd extend it to "photos where the place has feature X".
 */
export function FeatureLink() {
  return {
    view(vnode: m.Vnode<FeatureLinkAttrs>) {
      const { urn, thing } = vnode.attrs;
      const { type, id } = asUrn(urn);

      const name = one(thing.name) ?? id;
      const emoji = thingEmoji(urn, name, thing);
      const text = `${emoji}\t${name}`;

      return m("a", {
        href: urn,
        onclick: navigate(`/thing/${type}:${id}`),
        class: ["thing-link", `${type}-link`].join(" "),
      }, text);
    },
  };
}
