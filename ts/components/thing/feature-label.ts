/* Show a place feature which cannot yet link to a feature query. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { one } from "../../commons/arrays.ts";
import { Component } from "../component.ts";
import { thingEmoji } from "../../domain/emoji.ts";
import type { Feature } from "../../types/domain.ts";
import { drawThingLink } from "./thing-link-layout.ts";
import { fromNullable, withDefault } from "../../commons/maybe.ts";

export type FeatureLabelAttrs = {
  urn: string;
  thing: Feature;
};

function viewFeatureLabel(vnode: m.Vnode<FeatureLabelAttrs>): m.Children {
  const { urn, thing } = vnode.attrs;
  const { type, id } = asUrn(urn);
  const name = withDefault(one(fromNullable(thing.name)), id);

  return drawThingLink("p", type, {}, [
    thingEmoji(urn, name, thing),
    `\t${name}`,
  ]);
}

/*
 * Not a link. A feature page needs the query "photos where the place has
 * feature X", which the thing system cannot express yet.
 */
export const FeatureLabel = Component<FeatureLabelAttrs>({
  view: viewFeatureLabel,
});
