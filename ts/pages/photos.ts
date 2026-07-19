import m from "mithril";
import type { Photo as PhotoType, Services } from "../types.ts";
import { PhotoGrid } from "../components/media/photo-grid.ts";
import { countLabel } from "../commons/strings.ts";

/* Read the first `limit` photos by URN, skipping unparseable entries. */
function readPhotosByLimit(
  services: Services,
  photoUrns: string[],
  limit: number,
): PhotoType[] {
  const photos: PhotoType[] = [];
  for (const urn of photoUrns.slice(0, limit)) {
    const photo = services.readPhoto(urn);
    if (photo) {
      photos.push(photo);
    }
  }
  return photos;
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

      const countText = countLabel(photoUrns.length, "photo");

      const $md = m("section.photos-metadata", [
        m("h1", "Photos"),
        m("p.photo-album-count", countText),
      ]);

      return m("div", {
        class: visible ? "page sidebar-visible" : "page",
      }, [
        $md,
        m(PhotoGrid, {
          total: photoUrns.length,
          getPhotos: readPhotosByLimit.bind(null, services, photoUrns),
        }),
      ]);
    },
  };
}
