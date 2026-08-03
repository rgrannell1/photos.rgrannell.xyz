import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { sharePhotoUrl } from "../../services/window.ts";
import { Photo } from "../media/photo.ts";
import type { Photo as PhotoType, Services } from "../../types.ts";
import { AlbumButton } from "../album/album-button.ts";
import { ExifData } from "../media/exif-data.ts";
import { MediaInfo } from "../media/media-info.ts";

type PhotoPageAttrs = {
  photo: PhotoType;
  services: Services;
  visible: boolean;
};

function viewPhotoPage(vnode: m.Vnode<PhotoPageAttrs>): m.Children {
  const { photo, services, visible } = vnode.attrs;

  const shareUrl = sharePhotoUrl(`photo/${asUrn(photo.id).id}`);

  const $links = m("ul.link-list", { "data-testid": "photo-links" }, [
    m("li", m("a", { href: photo.fullImage, rel: "noreferrer" }, "[webp]")),
    m("li", m("a", { href: photo.previewJpegUrl, rel: "noreferrer" }, "[jpeg]")),
    m("li", m("a", { href: shareUrl, rel: "noreferrer" }, "[share]")),
    m("li", m(AlbumButton, { id: photo.albumId })),
  ]);

  const $exif = m(ExifData, { photo, services });
  const $photoInfo = m(MediaInfo, { media: photo, services });

  return m("main", { "data-testid": "photo-page" }, [
    m("h1", { "data-testid": "photo-heading" }, "Photo"),
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
}

/* */
export function PhotoPage() {
  return { view: viewPhotoPage };
}
