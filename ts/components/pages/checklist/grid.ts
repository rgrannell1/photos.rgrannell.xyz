/* Support checklist operations. */

import m from "mithril";
import type { Photo } from "../../../types/domain.ts";
import type { ChecklistEntry, NemesisSpecies } from "../../../domain/media/stats.ts";
import { LIFE_LIST_FILTERS } from "../../../constants/display.ts";
import { type Maybe, NONE } from "../../../commons/collections/maybe.ts";
import type { PositionedEntry } from "../checklist.ts";
import { firstSeenYear, isIrishWild } from "./dates.ts";
import {
  drawChecklistCard,
  drawMysteryCard,
  viewChecklistGrid,
} from "./cards.ts";
import { formatMammalPreamble } from "./copy.ts";

export function filterIsIrish(filter: string): boolean {
  return filter === LIFE_LIST_FILTERS.IRELAND;
}

export function filterIsAll(filter: string): boolean {
  return filter === LIFE_LIST_FILTERS.ALL;
}

export function drawChecklistCards(
  entries: PositionedEntry[],
  covers: Map<string, Photo>,
  irishView: boolean,
): m.Children[] {
  const drawCard = drawChecklistCard.bind(null, covers, irishView);
  return entries.map(drawCard);
}

export function drawMysteryCards(
  species: NemesisSpecies[],
  glyph: string,
  shown: boolean,
): m.Children[] {
  if (!shown) {
    return [];
  }
  const drawCard = drawMysteryCard.bind(null, glyph);
  const cards = species.map(drawCard);
  return cards;
}

export function ChecklistGrid() {
  return { view: viewChecklistGrid };
}

/*
 * Bird intro line. Null until there is an Irish wild sighting.
 */
export function lifeListPreamble(
  entries: ChecklistEntry[],
  regularCount: number,
): Maybe<string> {
  const irishWild = entries.filter(isIrishWild);
  if (hasNoEntries(irishWild)) {
    return NONE;
  }

  // entries are sorted earliest-first, so the first Irish entry is the earliest
  const sinceYear = readFirstEntryYear(irishWild);
  return formatBirdPreamble(irishWild.length, sinceYear, regularCount);
}

export function readFirstEntryYear(entries: ChecklistEntry[]): number {
  const firstEntry = entries[0];
  return firstSeenYear(firstEntry.firstSeen);
}

export function hasNoEntries(entries: ChecklistEntry[]): boolean {
  return entries.length === 0;
}

export function formatBirdPreamble(
  count: number,
  sinceYear: number,
  regularCount: number,
): string {
  return `I've photographed ${count} wild species in Ireland since ` +
    `${sinceYear}; Ireland regularly records about ${regularCount}.`;
}

/*
 * Mammal intro line. Null until there is an Irish wild sighting.
 */
export function mammalPreamble(
  mammalEntries: ChecklistEntry[],
  irishMammalCount: number,
): Maybe<string> {
  const irishWild = mammalEntries.filter(isIrishWild);
  if (irishWild.length === 0) {
    return NONE;
  }

  const photographedCount = irishWild.length;
  return formatMammalPreamble(photographedCount, irishMammalCount);
}
