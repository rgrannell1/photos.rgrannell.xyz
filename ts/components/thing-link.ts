import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { navigate } from "../commons/events.ts";

import { one } from "../commons/arrays.ts";
import { thingEmoji } from "../services/emoji.ts";
import type { Thing } from "../types.ts";

export type ThingLinkAttrs = {
  urn: string;
  thing: Thing;
};

/* */
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
