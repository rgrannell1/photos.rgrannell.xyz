/*
 * A batched photo grid: renders photos in increments so the browser can
 * paint between batches.
 */

import m from "mithril";
import type { Photo as PhotoType } from "../../types.ts";
import { Photo } from "./photo.ts";
import { loadingMode } from "../../services/photos.ts";
import { createBatchRenderer } from "./batch-render.ts";

// photos rendered per batch
const PHOTO_BATCH_SIZE = 10;

type PhotoGridAttrs = {
  // total photos available; batches are scheduled until all are rendered
  total: number;
  // read the first `limit` photos; called each redraw as batches grow
  getPhotos: (limit: number) => PhotoType[];
  // restart from the first batch when this changes (e.g a new thing URN)
  resetKey?: string;
};

/* */
export function PhotoGrid() {
  const batch = createBatchRenderer(PHOTO_BATCH_SIZE);
  let lastResetKey: string | undefined;

  return {
    oncreate(vnode: m.VnodeDOM<PhotoGridAttrs>) {
      batch.schedule(vnode.attrs.total);
    },
    onupdate(vnode: m.VnodeDOM<PhotoGridAttrs>) {
      batch.schedule(vnode.attrs.total);
    },
    view(vnode: m.Vnode<PhotoGridAttrs>) {
      if (vnode.attrs.resetKey !== lastResetKey) {
        lastResetKey = vnode.attrs.resetKey;
        batch.reset();
      }

      const photos = vnode.attrs.getPhotos(batch.count());

      return m(
        "section.photo-container",
        photos.map((photo, idx) =>
          m(Photo, {
            key: `photo-${photo.id}`,
            photo,
            loading: loadingMode(idx),
            interactive: true,
          })
        ),
      );
    },
  };
}
