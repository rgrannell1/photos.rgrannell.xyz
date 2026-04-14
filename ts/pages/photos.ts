import m from "mithril";
import type { Photo as PhotoType } from "../types.ts";
import { Photo } from "../components/photo.ts";
import { loadingMode } from "../services/photos.ts";

const BATCH_SIZE = 10;

function PhotosList() {
  let rendered = BATCH_SIZE;
  let batchScheduled = false;

  function scheduleBatch(total: number) {
    if (rendered >= total || batchScheduled) return;
    batchScheduled = true;
    setTimeout(() => {
      rendered = Math.min(rendered + BATCH_SIZE, total);
      batchScheduled = false;
      m.redraw();
    }, 1);
  }

  return {
    oncreate(vnode: m.VnodeDOM<PhotosPageAttrs>) {
      scheduleBatch(vnode.attrs.photos.length);
    },
    onupdate(vnode: m.VnodeDOM<PhotosPageAttrs>) {
      scheduleBatch(vnode.attrs.photos.length);
    },
    view(vnode: m.Vnode<PhotosPageAttrs>) {
      const { photos } = vnode.attrs;
      return m("section.photo-container",
        photos.slice(0, rendered).map((photo, idx) =>
          m(Photo, { key: `photo-${photo.id}`, photo, loading: loadingMode(idx), interactive: true })
        ),
      );
    },
  };
}

type PhotosPageAttrs = {
  photos: PhotoType[];
  visible: boolean;
};

/* */
export function PhotosPage() {
  return {
    view(vnode: m.Vnode<PhotosPageAttrs>) {
      const { photos, visible } = vnode.attrs;

      const countText = `${photos.length} photo${
        photos.length === 1 ? "" : "s"
      }`;

      const $md = m("section.photos-metadata", [
        m("h1", "Photos"),
        m("p.photo-album-count", countText),
      ]);

      return m("div", {
        class: visible ? "page sidebar-visible" : "page",
      }, [$md, m(PhotosList, { photos, visible })]);
    },
  };
}
