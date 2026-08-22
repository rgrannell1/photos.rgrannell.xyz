/*
 * A batched photo grid: renders photos in increments so the browser can
 * paint between batches.
 */

import m from "mithril";
import { RENDER_BATCH_SIZE } from "../../constants/layout.ts";
import { BEFORE_TIMES_FINAL_YEAR } from "../../constants/display.ts";
import type { Photo as PhotoType } from "../../types.ts";
import { Photo } from "./photo.ts";
import {
  groupPhotosByYear,
  loadingMode,
  type PhotoYearGroup,
} from "../../services/photos.ts";
import { type BatchRenderer, createBatchRenderer } from "../../services/batch-render.ts";

type PhotoGridAttrs = {
  // total photos available; batches are scheduled until all are rendered
  total: number;
  // read the first `limit` photos; called each redraw as batches grow
  getPhotos: (limit: number) => PhotoType[];
  // restart from the first batch when this changes (e.g a new thing URN)
  resetKey?: string;
  // split the grid into year runs, each under a year heading
  groupByYear?: boolean;
};

function scheduleGridBatch(
  batch: BatchRenderer,
  vnode: m.VnodeDOM<PhotoGridAttrs>,
): void {
  batch.schedule(vnode.attrs.total);
}

function resetGridBatchOnKeyChange(
  batch: BatchRenderer,
  vnode: m.Vnode<PhotoGridAttrs>,
  old: m.VnodeDOM<PhotoGridAttrs>,
): void {
  if (vnode.attrs.resetKey !== old.attrs.resetKey) {
    batch.reset();
  }
}

/* A keyed interactive photo for photo grids, loading-mode set by position. */
export function drawGridPhoto(photo: PhotoType, idx: number): m.Children {
  return m(Photo, {
    key: `photo-${photo.id}`,
    photo,
    loading: loadingMode(idx),
    interactive: true,
  });
}

/*
 * Render one year run: an optional heading, then its photos. startIdx is the
 * first photo's position in the full list, for the loading mode.
 */
function drawYearGroup(
  group: PhotoYearGroup,
  startIdx: number,
): m.Children[] {
  const $components: m.Children[] = [];

  if (group.showHeading) {
    $components.push(m(
      "h2.year-heading",
      {
        key: `year-${group.year}`,
        class: group.year <= BEFORE_TIMES_FINAL_YEAR ? "before-times" : undefined,
      },
      group.year.toString(),
    ));
  }

  for (const [photoIdx, photo] of group.photos.entries()) {
    $components.push(drawGridPhoto(photo, startIdx + photoIdx));
  }

  return $components;
}

/* Photos split into year runs, newest first. */
function drawYearGroups(photos: PhotoType[]): m.Children[] {
  const groups = groupPhotosByYear(photos, new Date().getFullYear());

  const $components: m.Children[] = [];
  let startIdx = 0;

  for (const group of groups) {
    $components.push(...drawYearGroup(group, startIdx));
    startIdx += group.photos.length;
  }

  return $components;
}

function viewPhotoGrid(
  batch: BatchRenderer,
  vnode: m.Vnode<PhotoGridAttrs>,
): m.Children {
  const photos = vnode.attrs.getPhotos(batch.count());

  const $photos = vnode.attrs.groupByYear
    ? drawYearGroups(photos)
    : photos.map(drawGridPhoto);

  return m("section.photo-container", $photos);
}

export function PhotoGrid() {
  const batch = createBatchRenderer(RENDER_BATCH_SIZE);

  return {
    oncreate: scheduleGridBatch.bind(null, batch),
    onbeforeupdate: resetGridBatchOnKeyChange.bind(null, batch),
    onupdate: scheduleGridBatch.bind(null, batch),
    view: viewPhotoGrid.bind(null, batch),
  };
}
