import m from "mithril";
import type { Photo as PhotoType } from "../types.ts";
import { Photo } from "../components/photo.ts";
import { loadingMode } from "../services/photos.ts";

/* */
function PhotosList() {
  return {
    view(vnode: m.Vnode<PhotosPageAttrs>) {
      const { photos } = vnode.attrs;

      // TODO: load photos lazily
      return m(
        "section.photo-container",
        photos.map((photo, idx) => {
          const loading = loadingMode(idx);

          return m(Photo, {
            key: `photo-${photo.id}`,
            photo,
            loading,
            interactive: true,
          });
        }),
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
