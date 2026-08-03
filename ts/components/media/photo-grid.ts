/*
 * A batched photo grid: renders photos in increments so the browser can
 * paint between batches.
 */

import m from "mithril";
import { RENDER_BATCH_SIZE } from "../../constants/layout.ts";
import type { Photo as PhotoType } from "../../types.ts";
import { Photo } from "./photo.ts";
import { loadingMode } from "../../services/photos.ts";
import { type BatchRenderer, createBatchRenderer } from "./batch-render.ts";

type PhotoGridAttrs = {
  // total photos available; batches are scheduled until all are rendered
  total: number;
  // read the first `limit` photos; called each redraw as batches grow
  getPhotos: (limit: number) => PhotoType[];
  // restart from the first batch when this changes (e.g a new thing URN)
  resetKey?: string;
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

function viewPhotoGrid(
  batch: BatchRenderer,
  vnode: m.Vnode<PhotoGridAttrs>,
): m.Children {
  const photos = vnode.attrs.getPhotos(batch.count());

  return m("section.photo-container", photos.map(drawGridPhoto));
}

/* */
export function PhotoGrid() {
  const batch = createBatchRenderer(RENDER_BATCH_SIZE);

  return {
    oncreate: scheduleGridBatch.bind(null, batch),
    onbeforeupdate: resetGridBatchOnKeyChange.bind(null, batch),
    onupdate: scheduleGridBatch.bind(null, batch),
    view: viewPhotoGrid.bind(null, batch),
  };
}
