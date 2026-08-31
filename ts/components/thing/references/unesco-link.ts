/* Link a UNESCO site to its external listing. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { one } from "../../../commons/collections/arrays.ts";
import { Component } from "../../component.ts";
import type { Unesco } from "../../../types/domain.ts";
import { drawThingLink } from "../navigation/thing-link-layout.ts";
import { fromNullable, withDefault } from "../../../commons/collections/maybe.ts";

export type UnescoLinkAttrs = {
  urn: string;
  thing: Unesco;
};

/** Reads a UNESCO name, with the URN ID as fallback. */
function readUnescoName(thing: Unesco, fallback: string): string {
  const candidate = one(fromNullable(thing.name));
  return withDefault(candidate, fallback);
}

/** Builds safe new-tab attributes for a UNESCO listing. */
function readUnescoLinkAttrs(id: string) {
  const href = `https://whc.unesco.org/en/list/${id}`;
  return { href, target: "_blank", rel: "noopener noreferrer" };
}

/** Renders a UNESCO site's external listing link. */
function viewUnescoLink(vnode: m.Vnode<UnescoLinkAttrs>): m.Children {
  const { urn, thing } = vnode.attrs;
  const { type, id } = asUrn(urn);
  const name = readUnescoName(thing, id);
  const attrs = readUnescoLinkAttrs(id);

  return drawThingLink("a", type, attrs, name);
}

export const UnescoLink = Component<UnescoLinkAttrs>({
  view: viewUnescoLink,
});
