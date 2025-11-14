import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";

import { one } from "../commons/arrays.ts";
import { thingEmoji } from "../services/emoji.ts";

export type FeatureLinkAttrs = {
  urn: string;
  thing: any;
};

/*
 * Ideally, we'll extend the `thing` system to support more complex queries, which would
 * be needed here. The query would be "show all photos / videos" where the place has feature X, which
 * is more complex than the current system of "show all photos / videos" where the place is Y.
 *
 */
export function FeatureLink() {
  return {
    view(vnode: m.Vnode<FeatureLinkAttrs>) {
      const { urn, thing } = vnode.attrs;
      const { type, id } = asUrn(urn);

      const name = one(thing.name) ?? id;
      const emoji = thingEmoji(urn, name, thing);

      return m("p", {
        class: ["thing-link", `${type}-link`].join(" "),
      }, `${emoji}\t${name}`);
    },
  };
}
