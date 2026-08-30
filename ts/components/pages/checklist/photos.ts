/* Support checklist operations. */

import m from "mithril";
import type { ChecklistEntry } from "../../../domain/media/stats.ts";
import { FlagIcon } from "../../flag.ts";
import type {
  ChecklistCardAttrs,
  ChecklistMysteryCardAttrs,
} from "../checklist.ts";
import { formatFirstSeen } from "./dates.ts";
import { viewChecklistPhoto } from "./filters.ts";
import { drawMysteryMetadata } from "./cards.ts";

/*
 * The per-species cover image. Renders an empty block when a species has no
 * cover photo.
 */
export function ChecklistPhoto() {
  return { view: viewChecklistPhoto };
}

/*
 * Inline status tags after a species name. Target and nemesis always show.
 * Scarce shows in the Irish view only.
 */
export function speciesTags(
  entry: { scarce: boolean; nemesis: boolean; target: boolean },
  showScarce: boolean,
): m.Children[] {
  const tags: m.Children[] = [];
  addSpeciesTag(tags, entry.nemesis, "nemesis");
  addSpeciesTag(tags, entry.target, "target");
  const showsScarceTag = showScarce && entry.scarce;
  addSpeciesTag(tags, showsScarceTag, "scarce");
  return tags;
}

export function addSpeciesTag(
  tags: m.Children[],
  shown: boolean,
  label: string,
): void {
  if (!shown) {
    return;
  }
  const className = `span.checklist-tag.checklist-tag--${label}`;
  const tag = m(className, label);
  tags.push(tag);
}

export function viewChecklistCard(
  vnode: m.Vnode<ChecklistCardAttrs>,
): m.Children {
  const { entry, cover, position, showScarce } = vnode.attrs;
  const href = `#/thing/${entry.speciesType}:${entry.speciesId}`;
  const badge = m("span.checklist-card-badge", `#${position}`);
  const photo = m(ChecklistPhoto, { cover, href, label: entry.name });
  const metadata = drawChecklistCardMetadata(entry, href, showScarce);
  const children = [badge, photo, metadata];
  return m("div.checklist-card", children);
}

export function drawChecklistCardMetadata(
  entry: ChecklistEntry,
  href: string,
  showScarce: boolean,
): m.Children {
  const name = drawChecklistCardName(entry, href, showScarce);
  const firstSeen = m(
    "p.checklist-first-seen",
    formatFirstSeen(entry.firstSeen),
  );
  return m("div.checklist-card-metadata", [name, firstSeen]);
}

export function drawChecklistCardName(
  entry: ChecklistEntry,
  href: string,
  showScarce: boolean,
): m.Children {
  const irishFlag = drawIrishFlag(entry.isIrish);
  const name = drawChecklistNameLink(entry.name, href);
  const tags = speciesTags(entry, showScarce);
  return m("p.checklist-card-name", [irishFlag, name, ...tags]);
}

export function drawChecklistNameLink(name: string, href: string): m.Children {
  return m("a.checklist-name-link", { href }, name);
}

export function drawIrishFlag(isIrish: boolean): m.Children {
  if (!isIrish) {
    return null;
  }
  const flagName = "Ireland";
  const flag = m(FlagIcon, { name: flagName });
  return m("span.checklist-irish-flag", [flag, " "]);
}

export function ChecklistCard() {
  return { view: viewChecklistCard };
}

export function viewChecklistMysteryCard(
  vnode: m.Vnode<ChecklistMysteryCardAttrs>,
): m.Children {
  const { species, glyph } = vnode.attrs;
  const mysteryGlyph = m(
    "div.mystery-bird",
    m("span.mystery-bird-glyph", glyph),
  );
  const metadata = drawMysteryMetadata(species);
  return m("div.checklist-card.checklist-card--mystery", [
    mysteryGlyph,
    metadata,
  ]);
}
