/* Support checklist operations. */

import m from "mithril";
import { broadcast } from "../../../services/browser/events.ts";
import type { Photo } from "../../../types/domain.ts";
import type { ChecklistEntry, NemesisSpecies } from "../../../domain/media/stats.ts";
import { LIFE_LIST_FILTERS } from "../../../constants/display.ts";
import { isSome, type Maybe } from "../../../commons/collections/maybe.ts";
import type { ChecklistPageAttrs, MammalSectionAttrs } from "../checklist.ts";
import { ChecklistDetails } from "./filters.ts";
import { ChecklistGrid, lifeListPreamble, mammalPreamble } from "./grid.ts";
import { drawChecklistPageChildren, readChecklistPageClass } from "./page.ts";

export function formatMammalPreamble(
  photographedCount: number,
  totalCount: number,
): string {
  return `I've photographed ${photographedCount} wild Irish mammal species; ` +
    `the island has about ${totalCount}.`;
}

export function viewMammalSection(
  vnode: m.Vnode<MammalSectionAttrs>,
): m.Children {
  const { mammalEntries, mammalCovers, irishMammalCount, nemesisMammals } =
    vnode.attrs;

  const preamble = mammalPreamble(mammalEntries, irishMammalCount);
  const heading = m("section.album-metadata", m("h2.albums-header", "Mammals"));
  const description = drawOptionalPreamble(preamble);
  const grid = drawMammalGrid(mammalEntries, mammalCovers, nemesisMammals);

  return [heading, description, grid];
}

export function drawOptionalPreamble(preamble: Maybe<string>): m.Children {
  return isSome(preamble) ? m("p.photo-album-description", preamble) : null;
}

export function drawMammalGrid(
  entries: ChecklistEntry[],
  covers: Map<string, Photo>,
  nemesisSpecies: NemesisSpecies[],
): m.Children {
  const grid = m(ChecklistGrid, {
    entries,
    covers,
    nemesisSpecies,
    mysteryGlyph: "🐾",
    filter: LIFE_LIST_FILTERS.IRELAND,
  });
  const section = m("section.checklist-container", grid);
  return section;
}

/*
 * The Irish mammal section, below the bird table in the Irish view.
 */
export function MammalSection() {
  return { view: viewMammalSection };
}

export function selectLifeListFilter(newFilter: string): void {
  broadcast("navigate", { route: `/life-list/${newFilter}` });
}

export function drawBirdSection(attrs: ChecklistPageAttrs): m.Children[] {
  const { entries, covers, regularCount, nemesisBirds, filter } = attrs;
  const preamble = lifeListPreamble(entries, regularCount);
  const description = "I am not a very committed birder, but I do like " +
    "photographing the different species I see. Here's my life list.";
  const heading = drawBirdHeading(entries, filter);
  const preambleNode = drawOptionalPreamble(preamble);
  const descriptionNode = m("p.photo-album-description", description);
  const grid = drawBirdGrid(entries, covers, nemesisBirds, filter);

  return [heading, preambleNode, descriptionNode, grid];
}

export function drawBirdHeading(
  entries: ChecklistEntry[],
  filter: string,
): m.Children {
  const title = m("h1.albums-header", "Life List");
  const details = m(ChecklistDetails, {
    entries,
    filter,
    onSelect: selectLifeListFilter,
  });
  return m("section.album-metadata", [title, details]);
}

export function drawBirdGrid(
  entries: ChecklistEntry[],
  covers: Map<string, Photo>,
  nemesisSpecies: NemesisSpecies[],
  filter: string,
): m.Children {
  const grid = m(ChecklistGrid, {
    entries,
    covers,
    nemesisSpecies,
    mysteryGlyph: "🐦",
    filter,
  });
  const section = m("section.checklist-container", grid);
  return section;
}

export function viewChecklistPage(
  vnode: m.Vnode<ChecklistPageAttrs>,
): m.Children {
  const { attrs } = vnode;
  const pageClass = readChecklistPageClass(attrs.visible);
  const children = drawChecklistPageChildren(attrs);
  const pageAttrs = { class: pageClass };
  return m("main", pageAttrs, children);
}
