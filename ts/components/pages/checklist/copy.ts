/* Support checklist operations. */

import m from "mithril";
import { setRoute } from "../../../services/browser/routes.ts";
import type { Photo } from "../../../types/domain.ts";
import type {
  ChecklistEntry,
  NemesisSpecies,
} from "../../../domain/media/stats.ts";
import { LifeListFilter } from "../../../constants/display.ts";
import { isSome, type Maybe } from "../../../commons/collections/maybe.ts";
import type { ChecklistPageAttrs, MammalSectionAttrs } from "../checklist.ts";
import { ChecklistDetails } from "./filters.ts";
import {
  buildLifeListPreamble,
  buildMammalPreamble,
  ChecklistGrid,
} from "./grid.ts";
import { drawChecklistPageChildren, selectChecklistPageClass } from "./page.ts";

/** Summarise photographed and recorded Irish mammal species counts. */
export function formatMammalPreamble(
  photographedCount: number,
  totalCount: number,
): string {
  return `I've photographed ${photographedCount} wild Irish mammal species; ` +
    `the island has about ${totalCount}.`;
}

/** Draw a preamble only when one is available. */
export function drawOptionalPreamble(preamble: Maybe<string>): m.Children {
  return isSome(preamble) ? m("p.photo-album-description", preamble) : null;
}

/** Draw the Irish mammal entries with mammal-specific mystery markers. */
export function drawMammalGrid(
  entries: ChecklistEntry[],
  covers: Map<string, Photo>,
  nemesisSpecies: NemesisSpecies[],
): m.Children {
  const $grid = m(ChecklistGrid, {
    entries,
    covers,
    nemesisSpecies,
    mysteryGlyph: "🐾",
    filter: LifeListFilter.Ireland,
  });
  const $section = m("section.checklist-container", $grid);
  return $section;
}

/** Render the mammal heading, optional summary, and species grid. */
export function viewMammalSection(
  vnode: m.Vnode<MammalSectionAttrs>,
): m.Children {
  const { mammalEntries, mammalCovers, irishMammalCount, nemesisMammals } =
    vnode.attrs;

  const preamble = buildMammalPreamble(mammalEntries, irishMammalCount);
  const $heading = m(
    "section.album-metadata",
    m("h2.albums-header", "Mammals"),
  );
  const description = drawOptionalPreamble(preamble);
  const $grid = drawMammalGrid(mammalEntries, mammalCovers, nemesisMammals);

  return [$heading, description, $grid];
}

/**
 * The Irish mammal section, below the bird table in the Irish view.
 */
export function MammalSection(): m.Component<MammalSectionAttrs> {
  return { view: viewMammalSection };
}

/** Navigate to the selected life-list filter route. */
export function selectLifeListFilter(newFilter: string): void {
  setRoute(`/life-list/${newFilter}`);
}

/** Draw the life-list title and filter controls. */
export function drawBirdHeading(
  entries: ChecklistEntry[],
  filter: string,
): m.Children {
  const $title = m("h1.albums-header", "Life List");
  const $details = m(ChecklistDetails, {
    entries,
    filter,
    onSelect: selectLifeListFilter,
  });
  return m("section.album-metadata", [$title, $details]);
}

/** Draw bird entries for the active life-list filter. */
export function drawBirdGrid(
  entries: ChecklistEntry[],
  covers: Map<string, Photo>,
  nemesisSpecies: NemesisSpecies[],
  filter: string,
): m.Children {
  const $grid = m(ChecklistGrid, {
    entries,
    covers,
    nemesisSpecies,
    mysteryGlyph: "🐦",
    filter,
  });
  const $section = m("section.checklist-container", $grid);
  return $section;
}

/** Compose the bird heading, narrative text, and species grid. */
export function drawBirdSection(attrs: ChecklistPageAttrs): m.Children[] {
  const { entries, covers, regularCount, nemesisBirds, filter } = attrs;
  const preamble = buildLifeListPreamble(entries, regularCount);
  const description = "I am not a very committed birder, but I do like " +
    "photographing the different species I see. Here's my life list.";
  const heading = drawBirdHeading(entries, filter);
  const preambleNode = drawOptionalPreamble(preamble);
  const $description = m("p.photo-album-description", description);
  const $grid = drawBirdGrid(entries, covers, nemesisBirds, filter);

  return [heading, preambleNode, $description, $grid];
}

/** Render the life-list page with its sidebar-aware class. */
export function viewChecklistPage(
  vnode: m.Vnode<ChecklistPageAttrs>,
): m.Children {
  const { attrs } = vnode;
  const pageClass = selectChecklistPageClass(attrs.visible);
  const children = drawChecklistPageChildren(attrs);
  const pageAttrs = { class: pageClass };
  return m("main", pageAttrs, children);
}
