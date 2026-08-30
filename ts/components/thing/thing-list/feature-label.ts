/* Show a place feature which cannot yet link to a feature query. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { one } from "../../../commons/collections/arrays.ts";
import { Component } from "../../component.ts";
import { thingEmoji } from "../../../domain/emoji.ts";
import type { Feature } from "../../../types/domain.ts";
import { drawThingLink } from "../navigation/thing-link-layout.ts";
import { fromNullable, withDefault } from "../../../commons/collections/maybe.ts";

export type FeatureLabelAttrs = {
  urn: string;
  thing: Feature;
};

function readFeatureName(thing: Feature, fallback: string): string {
  const candidate = one(fromNullable(thing.name));
  return withDefault(candidate, fallback);
}

function drawFeatureLabel(
  type: string,
  emoji: string,
  name: string,
): m.Children {
  const label = [emoji, `\t${name}`];
  return drawThingLink("p", type, {}, label);
}

function viewFeatureLabel(vnode: m.Vnode<FeatureLabelAttrs>): m.Children {
  const { urn, thing } = vnode.attrs;
  const { type, id } = asUrn(urn);
  const name = readFeatureName(thing, id);
  const emoji = thingEmoji(urn, name, thing);
  return drawFeatureLabel(type, emoji, name);
}

/*
 * Not a link. A feature page needs the query "photos where the place has
 * feature X", which the thing system cannot express yet.
 */
export const FeatureLabel = Component<FeatureLabelAttrs>({
  view: viewFeatureLabel,
});
