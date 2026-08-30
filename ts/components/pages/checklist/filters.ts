/* Support checklist operations. */

import m from "mithril";
import { ImagePair, type ImagePairAttrs } from "../../media/images/image-pair.ts";
import { thumbHashDataUrl } from "../../../services/rendering/year-scroll/photos.ts";
import type { Photo } from "../../../types/domain.ts";
import type { ChecklistEntry } from "../../../domain/media/stats.ts";
import { PHOTO_WIDTH } from "../../../constants/layout.ts";
import { LIFE_LIST_FILTERS } from "../../../constants/display.ts";
import { isNone, type Maybe } from "../../../commons/collections/maybe.ts";
import type {
  ChecklistDetailsAttrs,
  ChecklistPhotoAttrs,
} from "../checklist.ts";
import { FILTER_DEFINITIONS } from "../checklist.ts";
import { drawFilterDefinition, isIrishWild, isWild } from "./dates.ts";

export function countIrishEntries(entries: ChecklistEntry[]): number {
  const matchingEntries = entries.filter(isIrishWild);
  return matchingEntries.length;
}

export function countWildEntries(entries: ChecklistEntry[]): number {
  const matchingEntries = entries.filter(isWild);
  return matchingEntries.length;
}

export function readChecklistDisplayCount(
  entries: ChecklistEntry[],
  filter: string,
): number {
  const isIrishFilter = filter === LIFE_LIST_FILTERS.IRELAND;
  const isAllFilter = filter === LIFE_LIST_FILTERS.ALL;
  if (isIrishFilter) {
    return countIrishEntries(entries);
  }
  if (isAllFilter) {
    return entries.length;
  }
  return countWildEntries(entries);
}

export function drawChecklistDetails(
  controls: m.Children[],
  displayCount: number,
): m.Children {
  const count = ` · ${displayCount} species`;
  return m("p.listing-details", [...controls, count]);
}

export function viewChecklistDetails(
  vnode: m.Vnode<ChecklistDetailsAttrs>,
): m.Children {
  const { entries, filter, onSelect } = vnode.attrs;
  const controls = readFilterControls(filter, onSelect);
  const displayCount = readChecklistDisplayCount(entries, filter);
  return drawChecklistDetails(controls, displayCount);
}

export function readFilterControls(
  filter: string,
  onSelect: (filter: string) => void,
): m.Children[] {
  const drawDefinition = drawFilterDefinition.bind(null, { filter, onSelect });
  return FILTER_DEFINITIONS.flatMap(drawDefinition);
}

/*
 * Details line above the checklist. Filters to Irish wild, all wild, or all
 * species including captive ones.
 */
export function ChecklistDetails() {
  return { view: viewChecklistDetails };
}

export function viewChecklistPhoto(
  vnode: m.Vnode<ChecklistPhotoAttrs>,
): m.Children {
  const { cover, href, label } = vnode.attrs;

  if (isNone(cover)) {
    const emptyPhoto = m("div.checklist-card-empty");
    return emptyPhoto;
  }
  return drawChecklistPhoto(cover, href, label);
}

export function drawChecklistPhoto(
  cover: Photo,
  href: string,
  label: string,
): m.Children {
  const imageAttrs = readChecklistImageAttrs(cover);
  const attrs: ImagePairAttrs = { href, label, ...imageAttrs };
  return m(ImagePair, attrs);
}

export function readChecklistImageAttrs(
  cover: Photo,
): Omit<ImagePairAttrs, "href" | "label"> {
  const thumbnailDataUrl: Maybe<string> = thumbHashDataUrl(cover.mosaicColours);
  const { thumbnailUrl } = cover;
  return {
    thumbnailUrl,
    thumbnailDataUrl,
    loading: "lazy",
    onclick: undefined,
    width: PHOTO_WIDTH,
    height: PHOTO_WIDTH,
  };
}
