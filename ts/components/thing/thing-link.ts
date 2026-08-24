/*
 * Links to thing pages, place features, and UNESCO sites. All emit the same
 * `thing-link <type>-link` class contract.
 */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { navigate } from "../../commons/events.ts";

import { one } from "../../commons/arrays.ts";
import { thingEmoji } from "../../services/emoji.ts";
import { customFlagAsset, FlagIcon } from "../flag.ts";
import { KnownTypes } from "../../constants/data.ts";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Feature, Thing, Unesco } from "../../types.ts";
import type { EmojiThing } from "../../services/emoji.ts";

export type ReadThingEmoji = (
  urn: string,
  name: string,
  thing: EmojiThing,
) => string;

/* The class list is a CSS contract, so it is built in exactly one place. */
function drawThingLink(
  tag: string,
  type: string,
  attrs: Record<string, unknown>,
  label: m.Children,
) {
  return m(tag, {
    ...attrs,
    class: ["thing-link", `${type}-link`].join(" "),
  }, label);
}

export type ThingLinkAttrs = {
  urn: string;
  thing: Thing | Unesco | TripleObject;
  readEmoji: ReadThingEmoji;
};

function viewThingLink(vnode: m.Vnode<ThingLinkAttrs>): m.Children {
  const { urn, thing, readEmoji } = vnode.attrs;
  const { type, id } = asUrn(urn);

  let name = id;
  if (Object.prototype.hasOwnProperty.call(thing, "name")) {
    const candidate = one((thing as { name: string | string[] }).name);
    if (candidate) {
      name = candidate;
    }
  }

  // flags render from vexilla assets only; other things keep their emoji.
  // A flagged place with no vexilla asset gets no icon, never an emoji flag
  const hasFlag = type === KnownTypes.PLACE &&
    Boolean(one((thing as TripleObject).flag));
  const icon: m.Children = customFlagAsset(name)
    ? m(FlagIcon, { name })
    : hasFlag
    ? null
    : readEmoji(urn, name, thing) || null;

  // no icon means no separator, or the name sits one space off-column
  const label = icon ? [icon, `\t${name}`] : name;

  return drawThingLink("a", type, {
    href: urn,
    onclick: navigate(`/thing/${type}:${id}`),
  }, label);
}

export function ThingLink() {
  return { view: viewThingLink };
}

export type FeatureLinkAttrs = {
  urn: string;
  thing: Feature;
};

function viewFeatureLink(vnode: m.Vnode<FeatureLinkAttrs>): m.Children {
  const { urn, thing } = vnode.attrs;
  const { type, id } = asUrn(urn);

  const name = one(thing.name) ?? id;

  return drawThingLink("p", type, {}, [
    thingEmoji(urn, name, thing),
    `\t${name}`,
  ]);
}

/*
 * Not a link. A feature page needs the query "photos where the place has
 * feature X", which the thing system cannot express yet.
 */
export function FeatureLink() {
  return { view: viewFeatureLink };
}

export type UnescoLinkAttrs = {
  urn: string;
  thing: Unesco;
};

function viewUnescoLink(vnode: m.Vnode<UnescoLinkAttrs>): m.Children {
  const { urn, thing } = vnode.attrs;
  const { type, id } = asUrn(urn);

  const name = one(thing.name) ?? id;

  return drawThingLink("a", type, {
    href: `https://whc.unesco.org/en/list/${id}`,
    target: "_blank",
    rel: "noopener noreferrer",
  }, name);
}

export function UnescoLink() {
  return { view: viewUnescoLink };
}
