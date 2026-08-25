/* Render a thing's binomial subtitle when its type supports one. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { Component } from "../../commons/component.ts";
import { binomial } from "../../commons/strings.ts";
import { TAXON_TYPES } from "../../constants/data.ts";

export type ThingSubtitleAttrs = {
  urn: string;
  isBinomial: boolean;
};

function viewThingSubtitle(vnode: m.Vnode<ThingSubtitleAttrs>): m.Children {
  const parsed = asUrn(vnode.attrs.urn);

  // Taxon ids are lowercase Latin names, so they always show as subtitles.
  if (TAXON_TYPES.has(parsed.type)) {
    return m(
      "span",
      { class: `thing-binomial ${parsed.type}-binomial` },
      binomial(parsed.id),
    );
  }

  const showsBinomial = vnode.attrs.isBinomial && parsed.id !== "*";
  return showsBinomial
    ? m(
      "span",
      { class: `thing-binomial ${parsed.type}-binomial` },
      binomial(parsed.id),
    )
    : m("span");
}

export const ThingSubtitle = Component<ThingSubtitleAttrs>({
  view: viewThingSubtitle,
});
