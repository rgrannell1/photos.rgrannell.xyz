/* Render a thing's binomial subtitle when its type supports one. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { Component } from "../component.ts";
import { binomial } from "../../commons/strings.ts";
import { TAXON_TYPES } from "../../constants/data.ts";

export type ThingSubtitleAttrs = {
  urn: string;
  isBinomial: boolean;
};

/** Renders a binomial label with a taxon-specific class. */
function drawBinomial(type: string, id: string): m.Children {
  const attrs = { class: `thing-binomial ${type}-binomial` };
  const label = binomial(id);
  return m("span", attrs, label);
}

/** Renders an allowed binomial, or an empty subtitle for hidden and wildcard IDs. */
function drawOptionalBinomial(
  attrs: ThingSubtitleAttrs,
  type: string,
  id: string,
): m.Children {
  const showsBinomial = attrs.isBinomial && id !== "*";
  if (showsBinomial) {
    return drawBinomial(type, id);
  }
  const emptySubtitle = m("span");
  return emptySubtitle;
}

/** Renders mandatory taxon binomials and optional subtitles for other things. */
function viewThingSubtitle(vnode: m.Vnode<ThingSubtitleAttrs>): m.Children {
  const parsed = asUrn(vnode.attrs.urn);
  const isTaxon = TAXON_TYPES.has(parsed.type);

  // Taxon ids are lowercase Latin names, so they always show as subtitles.
  if (isTaxon) {
    return drawBinomial(parsed.type, parsed.id);
  }
  return drawOptionalBinomial(vnode.attrs, parsed.type, parsed.id);
}

export const ThingSubtitle = Component<ThingSubtitleAttrs>({
  view: viewThingSubtitle,
});
