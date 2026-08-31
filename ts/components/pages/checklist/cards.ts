/* Support checklist operations. */

import m from "mithril";
import type { Photo } from "../../../types/domain.ts";
import type { ChecklistEntry, NemesisSpecies } from "../../../domain/media/stats.ts";
import { LIFE_LIST_FILTERS } from "../../../constants/display.ts";
import { fromNullable } from "../../../commons/collections/maybe.ts";
import type {
  ChecklistCardAttrs,
  ChecklistGridAttrs,
  PositionedEntry,
} from "../checklist.ts";
import { isIrishWild, isWild } from "./dates.ts";
import { ChecklistCard, viewChecklistMysteryCard } from "./photos.ts";
import {
  drawChecklistCards,
  drawMysteryCards,
  filterIsAll,
  filterIsIrish,
} from "./grid.ts";

/** Renders the name and pending status for an unphotographed species. */
export function drawMysteryMetadata(species: NemesisSpecies): m.Children {
  const name = m("span.checklist-mystery-name", species.name);
  const tag = m("span.checklist-tag.checklist-tag--nemesis", "nemesis");
  const title = m("p.checklist-card-name", [name, tag]);
  const status = m(
    "p.checklist-first-seen.checklist-first-seen--pending",
    "yet to photograph",
  );
  return m("div.checklist-card-metadata", [title, status]);
}

/**
 * A "yet to see" card for an unphotographed nemesis species. A mystery
 * silhouette stands in for the photo.
 */
export function ChecklistMysteryCard() {
  return { view: viewChecklistMysteryCard };
}

/** Adds a one-based life-list position to a checklist entry. */
export function toPositionedEntry(
  entry: ChecklistEntry,
  idx: number,
): PositionedEntry {
  return { entry, position: idx + 1 };
}

/** Tests whether an entry records a wild sighting in Ireland. */
export function positionedIsIrishWild(positioned: PositionedEntry): boolean {
  return isIrishWild(positioned.entry);
}

/** Tests whether an entry records any wild sighting. */
export function positionedIsWild(positioned: PositionedEntry): boolean {
  return isWild(positioned.entry);
}

/** Builds card attributes from a checklist entry and its optional cover. */
export function readChecklistCardAttrs(
  covers: Map<string, Photo>,
  irishView: boolean,
  entry: ChecklistEntry,
  position: number,
): ChecklistCardAttrs & m.Attributes {
  const cover = fromNullable(covers.get(entry.speciesId));
  const key = `card-${entry.speciesType}-${entry.speciesId}`;
  return {
    key,
    entry,
    cover,
    position,
    showScarce: irishView,
  };
}

/** Renders a photographed checklist entry at its life-list position. */
export function drawChecklistCard(
  covers: Map<string, Photo>,
  irishView: boolean,
  positioned: PositionedEntry,
): m.Children {
  const { entry, position } = positioned;
  const attrs = readChecklistCardAttrs(covers, irishView, entry, position);
  return m(ChecklistCard, attrs);
}

/** Renders a placeholder card for an unphotographed nemesis species. */
export function drawMysteryCard(
  mysteryGlyph: string,
  species: NemesisSpecies,
): m.Children {
  return m(ChecklistMysteryCard, {
    key: `mystery-${species.speciesId}`,
    species,
    glyph: mysteryGlyph,
  });
}

/** Applies the Ireland, wild, or unfiltered checklist view. */
export function filterPositionedEntries(
  entries: PositionedEntry[],
  filter: string,
): PositionedEntry[] {
  const isIrishFilter = filterIsIrish(filter);
  const isAllFilter = filterIsAll(filter);
  if (isIrishFilter) {
    return entries.filter(positionedIsIrishWild);
  }
  if (isAllFilter) {
    return entries;
  }
  return entries.filter(positionedIsWild);
}

/** Renders photographed entries and Irish nemesis placeholders as one grid. */
export function viewChecklistGrid(
  vnode: m.Vnode<ChecklistGridAttrs>,
): m.Children {
  const { entries, covers, nemesisSpecies, mysteryGlyph, filter } = vnode.attrs;

  // scarce tags and "yet to see" birds show in the Irish view only
  const irishView = filter === LIFE_LIST_FILTERS.IRELAND;

  // position numbers come from the full unfiltered list
  const withPositions = entries.map(toPositionedEntry);
  const displayed = filterPositionedEntries(withPositions, filter);
  const cards = drawChecklistCards(displayed, covers, irishView);
  const mysteries = drawMysteryCards(nemesisSpecies, mysteryGlyph, irishView);
  return m("div.checklist-grid", [...cards, ...mysteries]);
}
