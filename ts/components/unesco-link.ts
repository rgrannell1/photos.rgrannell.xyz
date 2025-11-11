import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { navigate } from "../events.ts";

import { one } from "../arrays.ts";
import { thingEmoji } from "../services/emoji.ts";

export type UnescoLinkAttrs = {
  urn: string;
  thing: any;
};

/* */
export function UnescoLink() {
  return {
    view(vnode: m.Vnode<UnescoLinkAttrs>) {
      const { urn, thing } = vnode.attrs;
      const { type, id } = asUrn(urn);

      const name = one(thing.name) ?? id;

      return m("a", {
        href: `https://whc.unesco.org/en/list/${id}`,
        target: "_blank",
        rel: "noopener noreferrer",
        class: ["thing-link", `${type}-link`].join(" "),
      }, name);
    },
  };
}
