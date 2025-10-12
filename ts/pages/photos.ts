import m from "mithril";
import { Photo as PhotoType } from "../types.ts";
import { Photos } from "../services/photos.ts";
import { Photo } from "../components/photo.ts";

function PhotosList() {
  return {
    view(vnode: m.Vnode<PhotosPageAttrs>) {
      const { photos } = vnode.attrs;

      // TODO: load photos lazily
      return m(
        "section.photo-container",
        photos.map((photo, idx) => {
          const loading = Photos.loadingMode(idx);

          return m(Photo, {
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
};

export function PhotosPage() {
  return {
    view(vnode: m.Vnode<PhotosPageAttrs>) {
      const { photos } = vnode.attrs;

      const countText = `${photos.length} photo${
        photos.length === 1 ? "" : "s"
      }`;

      const $md = m("section.photos-metadata", [
        m("h1", "Photos"),
        m("p.photo-album-count", countText),
      ]);

      return m("div", [$md, m(PhotosList, { photos })]);
    },
  };
}
