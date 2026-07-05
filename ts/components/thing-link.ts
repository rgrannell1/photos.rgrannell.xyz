/*
 * The thing-link family: links to thing pages, place features, and UNESCO
 * sites. All emit the same `thing-link <type>-link` class contract, varying
 * only in tag, attributes, and label.
 */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { navigate } from "../commons/events.ts";

import { one } from "../commons/arrays.ts";
import { thingEmoji } from "../services/emoji.ts";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Thing } from "../types.ts";

/*
 * Shared rendering for the family: the class list is the CSS contract, so it
 * is built in exactly one place.
 */
function drawThingLink(
  tag: string,
  type: string,
  attrs: Record<string, unknown>,
  label: string,
) {
  return m(tag, {
    ...attrs,
    class: ["thing-link", `${type}-link`].join(" "),
  }, label);
}

export type ThingLinkAttrs = {
  urn: string;
  thing: Thing | TripleObject;
};

/* */
export function ThingLink() {
  return {
    view(vnode: m.Vnode<ThingLinkAttrs>) {
      const { urn, thing } = vnode.attrs;
      const { type, id } = asUrn(urn);

      let name = id;
      if (Object.prototype.hasOwnProperty.call(thing, "name")) {
        const candidate = one((thing as { name: string | string[] }).name);
        if (candidate) {
          name = candidate;
        }
      }

      const emoji = thingEmoji(urn, name, thing);

      return drawThingLink("a", type, {
        href: urn,
        onclick: navigate(`/thing/${type}:${id}`),
      }, `${emoji}\t${name}`);
    },
  };
}

export type FeatureLinkAttrs = {
  urn: string;
  thing: any;
};

/*
 * Ideally, we'll extend the `thing` system to support more complex queries, which would
 * be needed here. The query would be "show all photos / videos" where the place has
 * feature X, which is more complex than the current system of "show all photos / videos"
 * where the place is Y.
 */
export function FeatureLink() {
  return {
    view(vnode: m.Vnode<FeatureLinkAttrs>) {
      const { urn, thing } = vnode.attrs;
      const { type, id } = asUrn(urn);

      const name = one(thing.name) ?? id;
      const emoji = thingEmoji(urn, name, thing);

      return drawThingLink("p", type, {}, `${emoji}\t${name}`);
    },
  };
}

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

      return drawThingLink("a", type, {
        href: `https://whc.unesco.org/en/list/${id}`,
        target: "_blank",
        rel: "noopener noreferrer",
      }, name);
    },
  };
}
