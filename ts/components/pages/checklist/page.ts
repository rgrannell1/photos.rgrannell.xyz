/* Support checklist operations. */

import m from "mithril";
import { LifeListFilter } from "../../../constants/display.ts";
import type { ChecklistPageAttrs, MammalSectionAttrs } from "../checklist.ts";
import { drawBirdSection, MammalSection } from "./copy.ts";

/** Selects the page class for the current sidebar visibility. */
export function selectChecklistPageClass(visible: boolean): string {
  return visible ? "page sidebar-visible" : "page";
}

/** Select the mammal data needed by the mammal section. */
export function buildMammalSectionAttrs(
  attrs: ChecklistPageAttrs,
): MammalSectionAttrs {
  return {
    mammalEntries: attrs.mammalEntries,
    mammalCovers: attrs.mammalCovers,
    irishMammalCount: attrs.irishMammalCount,
    nemesisMammals: attrs.nemesisMammals,
  };
}

/** The mammal section shows in the Irish view only. Other views stay birds-only. */
export function drawOptionalMammalSection(
  attrs: ChecklistPageAttrs,
): m.Children {
  const isIrishFilter = attrs.filter === LifeListFilter.Ireland;
  if (!isIrishFilter) {
    return null;
  }
  const sectionAttrs = buildMammalSectionAttrs(attrs);
  return m(MammalSection, sectionAttrs);
}

/** Combine the bird section with the optional Irish mammal section. */
export function drawChecklistPageChildren(
  attrs: ChecklistPageAttrs,
): m.Children[] {
  const $mammalSection = drawOptionalMammalSection(attrs);
  return [...drawBirdSection(attrs), $mammalSection];
}
