/* Support checklist operations. */

import m from "mithril";
import { LIFE_LIST_FILTERS } from "../../../constants/display.ts";
import type { ChecklistPageAttrs, MammalSectionAttrs } from "../checklist.ts";
import { drawBirdSection, MammalSection } from "./copy.ts";

/** Add the sidebar class when the life list sidebar is visible. */
export function readChecklistPageClass(visible: boolean): string {
  return visible ? "page sidebar-visible" : "page";
}

/** Select the mammal data needed by the mammal section. */
export function readMammalSectionAttrs(
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
  const isIrishFilter = attrs.filter === LIFE_LIST_FILTERS.IRELAND;
  if (!isIrishFilter) {
    return null;
  }
  const sectionAttrs = readMammalSectionAttrs(attrs);
  return m(MammalSection, sectionAttrs);
}

/** Combine the bird section with the optional Irish mammal section. */
export function drawChecklistPageChildren(
  attrs: ChecklistPageAttrs,
): m.Children[] {
  const mammalSection = drawOptionalMammalSection(attrs);
  return [...drawBirdSection(attrs), mammalSection];
}
