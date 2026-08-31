/* A photo grid rendered in batches, so the browser can paint between them. */

import m from "mithril";
import { RENDER_BATCH_SIZE } from "../../../constants/layout.ts";
import { BEFORE_TIMES_FINAL_YEAR } from "../../../constants/display.ts";
import type { Photo as PhotoType } from "../../../types/domain.ts";
import { Photo } from "./photo.ts";
import { groupPhotosByYear, type PhotoYearGroup } from "../../../domain/media/photos.ts";
import { loadingMode } from "../../../services/rendering/year-scroll/photos.ts";
import {
  type BatchRenderer,
  createBatchRenderer,
} from "../../../services/rendering/batch-render.ts";

export type PhotoGridAttrs = {
  // total available, not the number rendered so far
  total: number;
  // reads the first `limit` photos, called on each redraw
  getPhotos: (limit: number) => PhotoType[];
  // restart from the first batch when this changes (e.g a new thing URN)
  resetKey?: string;
  // split the grid into year runs, each under a year heading
  groupByYear?: boolean;
};

/** Schedules the next grid batch against the latest photo total. */
function scheduleGridBatch(
  batch: BatchRenderer,
  vnode: m.VnodeDOM<PhotoGridAttrs>,
): void {
  batch.schedule(vnode.attrs.total);
}

/** Restarts batch rendering when the grid identity changes. */
function resetGridBatchOnKeyChange(
  batch: BatchRenderer,
  vnode: m.Vnode<PhotoGridAttrs>,
  old: m.VnodeDOM<PhotoGridAttrs>,
): void {
  const resetKey = vnode.attrs.resetKey;
  const oldResetKey = old.attrs.resetKey;
  const hasResetKeyChanged = resetKey !== oldResetKey;
  if (hasResetKeyChanged) {
    batch.reset();
  }
}

/** Renders one photo with a loading mode based on its full-list position. */
export function drawGridPhoto(photo: PhotoType, idx: number): m.Children {
  const key = `photo-${photo.id}`;
  const photoAttrs = {
    key,
    photo,
    loading: loadingMode(idx),
    interactive: true,
  };
  return m(Photo, photoAttrs);
}

/** Marks headings for years in the historical before-times range. */
function yearHeadingClass(year: number): string | undefined {
  const isBeforeTimes = year <= BEFORE_TIMES_FINAL_YEAR;
  return isBeforeTimes ? "before-times" : undefined;
}

/** Renders a year heading with its historical style when applicable. */
function drawYearHeading(group: PhotoYearGroup): m.Children {
  const headingAttrs = {
    key: `year-${group.year}`,
    class: yearHeadingClass(group.year),
  };
  const heading = m("h2.year-heading", headingAttrs, group.year.toString());
  return heading;
}

/** startIdx is the first photo's position in the full list, used for the loading mode. */
function drawYearGroup(
  group: PhotoYearGroup,
  startIdx: number,
): m.Children[] {
  const $components: m.Children[] = [];

  if (group.showHeading) {
    const heading = drawYearHeading(group);
    $components.push(heading);
  }

  for (const [photoIdx, photo] of group.photos.entries()) {
    $components.push(drawGridPhoto(photo, startIdx + photoIdx));
  }

  return $components;
}

/** Photos split into year runs, newest first. */
function drawYearGroups(photos: PhotoType[]): m.Children[] {
  const currentYear = new Date().getFullYear();
  const groups = groupPhotosByYear(photos, currentYear);

  const $components: m.Children[] = [];
  let startIdx = 0;

  for (const group of groups) {
    $components.push(...drawYearGroup(group, startIdx));
    startIdx += group.photos.length;
  }

  return $components;
}

/** Renders photos either as one grid or as year-labelled runs. */
function drawGridPhotos(
  photos: PhotoType[],
  groupByYear: boolean,
): m.Children[] {
  const components = groupByYear
    ? drawYearGroups(photos)
    : photos.map(drawGridPhoto);
  return components;
}

/** Reads the photo prefix allowed by the current batch count. */
function readGridPhotos(
  batch: BatchRenderer,
  attrs: PhotoGridAttrs,
): PhotoType[] {
  const limit = batch.count();
  const photos = attrs.getPhotos(limit);
  return photos;
}

/** Renders the currently visible photo grid. */
function viewPhotoGrid(
  batch: BatchRenderer,
  vnode: m.Vnode<PhotoGridAttrs>,
): m.Children {
  const photos = readGridPhotos(batch, vnode.attrs);
  const groupByYear = vnode.attrs.groupByYear ?? false;
  const $photos = drawGridPhotos(photos, groupByYear);
  return m("section.photo-container", $photos);
}

/** Creates a photo grid with progressive batch rendering. */
export function PhotoGrid() {
  const batch = createBatchRenderer(RENDER_BATCH_SIZE);
  const oncreate = scheduleGridBatch.bind(null, batch);
  const onbeforeupdate = resetGridBatchOnKeyChange.bind(null, batch);
  const onupdate = scheduleGridBatch.bind(null, batch);
  const view = viewPhotoGrid.bind(null, batch);

  return {
    oncreate,
    onbeforeupdate,
    onupdate,
    view,
  };
}
