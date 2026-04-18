import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { Photo } from "../components/photo.ts";
import type { Photo as PhotoType, Services } from "../types.ts";
import { AlbumButton } from "../components/album-button.ts";
import { ExifData } from "../components/exif-data.ts";
import { PhotoInfo } from "../components/photo-info.ts";

type PhotoPageAttrs = {
  photo: PhotoType;
  services: Services;
  visible: boolean;
};

/* */
export function PhotoPage() {
  return {
    view(vnode: m.Vnode<PhotoPageAttrs>) {
      const { photo, services, visible } = vnode.attrs;

      const shareUrl = `https://sharephoto.rgrannell.xyz/photo/${asUrn(photo.id).id}`;

      // TODO this should be a ul
      const $links = m("li.link-list", [
        m("a", { href: photo.fullImage, rel: "noreferrer" }, "[webp]"),
        " ",
        m("a", { href: photo.previewJpegUrl, rel: "noreferrer" }, "[jpeg]"),
        " ",
        m("a", { href: shareUrl, rel: "noreferrer" }, "[share]"),
        " ",
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
          {
            class: visible ? "page sidebar-visible" : "page",
          },
          m("h3", "Photo Information"),
          $photoInfo,
          m("h3", "Exif Data"),
          $exif,
        ),
      ]);
    },
  };
}
