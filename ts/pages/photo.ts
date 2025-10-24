import m from "mithril";
import { Photo } from "../components/photo.ts";
import type { Photo as PhotoType, Services } from "../types.ts";
import { AlbumButton } from "../components/album-button.ts";
import { ExifData } from "../components/exif-data.ts";
import { PhotoInfo } from "../components/photo-info.ts";

type PhotoPageAttrs = {
  photo: PhotoType;
  services: Services;
};

/* */
export function PhotoPage() {
  return {
    view(vnode: m.Vnode<PhotoPageAttrs>) {
      const { photo, services } = vnode.attrs;

      const $links = m("p", [
        m("a", { href: photo.fullImage, rel: "noreferrer" }, "[webp]"),
        " ",
        m("a", { href: photo.pngUrl, rel: "noreferrer" }, "[png]"),
        " ",
        // [share]
        m(AlbumButton, { id: photo.albumId }),
      ]);

      const $exif = m(ExifData, { photo, services });
      const $photoInfo = m(PhotoInfo, { photo, services });

      return m("section", [
        m("h1", "Photo"),
        m(Photo, {
          photo,
          loading: "eager",
          interactive: false,
        }),
        $links,
        m(
          "div",
          m("h3", "Photo Information"),
          $photoInfo,
          m("h3", "Exif Data"),
          $exif,
        ),
      ]);
    },
  };
}
