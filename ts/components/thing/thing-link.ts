/* Link named things to their internal pages. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { navigate } from "../../services/browser/events.ts";

import { one } from "../../commons/arrays.ts";
import { customFlagAsset, FlagIcon } from "../flag.ts";
import { isSome } from "../../commons/maybe.ts";
import { KnownTypes } from "../../constants/data.ts";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Thing, Unesco } from "../../types/domain.ts";
import type { EmojiThing } from "../../domain/emoji.ts";
import { drawThingLink } from "./thing-link-layout.ts";

export type ReadThingEmoji = (
  urn: string,
  name: string,
  thing: EmojiThing,
) => string;

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
    if (isSome(candidate)) {
      name = candidate;
    }
  }

  // flags render from vexilla assets only; other things keep their emoji.
  // A flagged place with no vexilla asset gets no icon, never an emoji flag
  const hasFlag = type === KnownTypes.PLACE &&
    isSome(one((thing as TripleObject).flag));
  const icon: m.Children = isSome(customFlagAsset(name))
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
