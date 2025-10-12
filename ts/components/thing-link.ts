import {  asUrn } from "@rgrannell1/tribbledb";
import m from "mithril";
import { navigate } from "../events.ts";

type ThingLinkAttrs = {
  urn: string;
  name: string;
  classes: string[];
};

export function ThingLink() {
  return {
    view(vnode: m.Vnode<ThingLinkAttrs>) {
      const { urn, name, classes } = vnode.attrs;

      const { type, id } = asUrn(urn)

      return m("a", {
        href: urn,
        onclick: navigate(`/thing/${type}:${id}`),
        classes: [...classes, "thing-link"].join(" "),
      }, name);
    },
  };
}
