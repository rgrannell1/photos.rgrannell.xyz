/* Link named things to their internal pages. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";

import { selectFirst } from "../../../commons/collections/arrays.ts";
import { customFlagAsset, FlagIcon } from "../../flag.ts";
import {
  isSome,
  type Maybe,
  NONE,
} from "../../../commons/collections/maybe.ts";
import { KnownTypes } from "../../../constants/data.ts";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Thing, Unesco } from "../../../types/domain.ts";
import type { EmojiThing } from "../../../domain/emoji.ts";
import { drawThingRouteLink } from "./thing-link-layout.ts";

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

/** Reads a thing's optional name without assuming the field exists. */
function readNameCandidate(thing: ThingLinkAttrs["thing"]): Maybe<string> {
  const hasName = Object.prototype.hasOwnProperty.call(thing, "name");
  if (!hasName) {
    return NONE;
  }
  return selectFirst((thing as { name: string | string[] }).name);
}

/** Reads a thing name, with its URN ID as the fallback. */
function readThingName(
  thing: ThingLinkAttrs["thing"],
  fallback: string,
): string {
  const candidate = readNameCandidate(thing);
  return isSome(candidate) ? candidate : fallback;
}

/** Reports whether a place declares a flag. */
function hasThingFlag(type: string, thing: ThingLinkAttrs["thing"]): boolean {
  const isPlace = type === KnownTypes.PLACE;
  const flag = selectFirst((thing as TripleObject).flag);
  return isPlace && isSome(flag);
}

/** Reads the fallback emoji for a thing. */
function drawFallbackIcon(
  urn: string,
  name: string,
  thing: ThingLinkAttrs["thing"],
  readEmoji: ReadThingEmoji,
): m.Children {
  const emoji = readEmoji(urn, name, thing);
  return emoji || null;
}

/** Draws a custom place flag or the thing's fallback emoji. */
function drawThingIcon(
  urn: string,
  type: string,
  name: string,
  thing: ThingLinkAttrs["thing"],
  readEmoji: ReadThingEmoji,
): m.Children {
  // flags render from vexilla assets only; other things keep their emoji.
  // A flagged place with no vexilla asset gets no icon, never an emoji flag
  if (isSome(customFlagAsset(name))) {
    return m(FlagIcon, { name });
  }
  if (hasThingFlag(type, thing)) {
    return null;
  }
  return drawFallbackIcon(urn, name, thing, readEmoji);
}

/** Joins an optional icon and name with the expected alignment. */
function drawThingLabel(icon: m.Children, name: string): m.Children {
  // no icon means no separator, or the name sits one space off-column
  return icon ? [icon, `\t${name}`] : name;
}

/** Draws an internal thing link that routes without a page load. */
function drawLinkedThing(
  type: string,
  id: string,
  label: m.Children,
): m.Children {
  const route = `/thing/${type}:${id}`;
  return drawThingRouteLink(type, route, label);
}

/** Resolves a thing's name and icon, then draws its internal link. */
function viewThingLink(vnode: m.Vnode<ThingLinkAttrs>): m.Children {
  const { urn, thing, readEmoji } = vnode.attrs;
  const { type, id } = asUrn(urn);
  const name = readThingName(thing, id);
  const icon = drawThingIcon(urn, type, name, thing, readEmoji);
  const label = drawThingLabel(icon, name);
  return drawLinkedThing(type, id, label);
}

/** Creates the component for one linked thing. */
export function ThingLink(): m.Component<ThingLinkAttrs> {
  return { view: viewThingLink };
}
