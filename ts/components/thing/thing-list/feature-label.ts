/* Show a place feature which cannot yet link to a feature query. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { selectFirst } from "../../../commons/collections/arrays.ts";
import { Component } from "../../component.ts";
import { selectThingEmoji } from "../../../domain/emoji.ts";
import type { Feature } from "../../../types/domain.ts";
import { drawThingLink } from "../navigation/thing-link-layout.ts";
import { fromNullable, withDefault } from "../../../commons/collections/maybe.ts";

export type FeatureLabelAttrs = {
  urn: string;
  thing: Feature;
};

/** Read a feature's first name, or use its identifier as a fallback. */
function readFeatureName(thing: Feature, fallback: string): string {
  const candidate = selectFirst(fromNullable(thing.name));
  return withDefault(candidate, fallback);
}

/** Render a non-navigable feature label with its type and emoji. */
function drawFeatureLabel(
  type: string,
  emoji: string,
  name: string,
): m.Children {
  const label = [emoji, `\t${name}`];
  return drawThingLink("p", type, {}, label);
}

/** Resolve and render the label for one feature. */
function viewFeatureLabel(vnode: m.Vnode<FeatureLabelAttrs>): m.Children {
  const { urn, thing } = vnode.attrs;
  const { type, id } = asUrn(urn);
  const name = readFeatureName(thing, id);
  const emoji = selectThingEmoji(urn, name, thing);
  return drawFeatureLabel(type, emoji, name);
}

/*
 * Not a link. A feature page needs the query "photos where the place has
 * feature X", which the thing system cannot express yet.
 */
export const FeatureLabel = Component<FeatureLabelAttrs>({
  view: viewFeatureLabel,
});
