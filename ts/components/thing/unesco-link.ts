/* Link a UNESCO site to its external listing. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { one } from "../../commons/arrays.ts";
import { Component } from "../component.ts";
import type { Unesco } from "../../types/domain.ts";
import { drawThingLink } from "./thing-link-layout.ts";
import { fromNullable, withDefault } from "../../commons/maybe.ts";

export type UnescoLinkAttrs = {
  urn: string;
  thing: Unesco;
};

function viewUnescoLink(vnode: m.Vnode<UnescoLinkAttrs>): m.Children {
  const { urn, thing } = vnode.attrs;
  const { type, id } = asUrn(urn);
  const name = withDefault(one(fromNullable(thing.name)), id);

  return drawThingLink("a", type, {
    href: `https://whc.unesco.org/en/list/${id}`,
    target: "_blank",
    rel: "noopener noreferrer",
  }, name);
}

export const UnescoLink = Component<UnescoLinkAttrs>({
  view: viewUnescoLink,
});
