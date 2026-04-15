import m from "mithril";
import type { Photo as PhotoType, Services } from "../types.ts";
import { Photo } from "../components/photo.ts";
import { loadingMode } from "../services/photos.ts";

const BATCH_SIZE = 10;

type PhotosListAttrs = {
  photoUrns: string[];
  services: Services;
  visible: boolean;
};

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
    oncreate(vnode: m.VnodeDOM<PhotosListAttrs>) {
      scheduleBatch(vnode.attrs.photoUrns.length);
    },
    onupdate(vnode: m.VnodeDOM<PhotosListAttrs>) {
      scheduleBatch(vnode.attrs.photoUrns.length);
    },
    view(vnode: m.Vnode<PhotosListAttrs>) {
      const { photoUrns, services } = vnode.attrs;

      const photos: PhotoType[] = [];
      for (const urn of photoUrns.slice(0, rendered)) {
        const photo = services.readPhoto(urn);
        if (photo) {
          photos.push(photo);
        }
      }

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

type PhotosPageAttrs = {
  photoUrns: string[];
  services: Services;
  visible: boolean;
};

/* */
export function PhotosPage() {
  return {
    view(vnode: m.Vnode<PhotosPageAttrs>) {
      const { photoUrns, services, visible } = vnode.attrs;

      const countText = `${photoUrns.length} photo${
        photoUrns.length === 1 ? "" : "s"
      }`;

      const $md = m("section.photos-metadata", [
        m("h1", "Photos"),
        m("p.photo-album-count", countText),
      ]);

      return m("div", {
        class: visible ? "page sidebar-visible" : "page",
      }, [$md, m(PhotosList, { photoUrns, services, visible })]);
    },
  };
}
