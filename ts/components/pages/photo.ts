import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { sharePhotoUrl } from "../../services/browser/window.ts";
import { Photo } from "../media/photo.ts";
import type { Photo as PhotoType } from "../../types/domain.ts";
import { AlbumButton } from "../album/album-button.ts";
import { ExifData } from "../media/exif-data.ts";
import { MediaInfo } from "../media/media-info.ts";
import type { ReadThing } from "../thing/thing-links.ts";
import type { ReadThingEmoji } from "../thing/thing-link.ts";

type PhotoPageAttrs = {
  photo: PhotoType;
  albumHidden: boolean;
  readThing: ReadThing;
  readEmoji: ReadThingEmoji;
  visible: boolean;
};

function drawPhotoLinks(photo: PhotoType, albumHidden: boolean): m.Children {
  const shareUrl = sharePhotoUrl(`photo/${asUrn(photo.id).id}`);
  return m("ul.link-list", { "data-testid": "photo-links" }, [
    m("li", m("a", { href: photo.fullImage, rel: "noreferrer" }, "[webp]")),
    m("li", m("a", { href: photo.previewJpegUrl, rel: "noreferrer" }, "[jpeg]")),
    m("li", m("a", { href: shareUrl, rel: "noreferrer" }, "[share]")),
    m("li", m(AlbumButton, { id: photo.albumId, hidden: albumHidden })),
  ]);
}

function drawPhotoDetails(attrs: PhotoPageAttrs): m.Children {
  const { photo, readThing, readEmoji, visible } = attrs;
  return m("div", { class: visible ? "page sidebar-visible" : "page" }, [
    m("h3", "Photo Information"),
    m(MediaInfo, { media: photo, readThing, readEmoji }),
    m("h3", "Exif Data"),
    m(ExifData, { photo, readThing, readEmoji }),
  ]);
}

function viewPhotoPage(vnode: m.Vnode<PhotoPageAttrs>): m.Children {
  const { photo, albumHidden } = vnode.attrs;

  return m("main", { "data-testid": "photo-page" }, [
    m("h1", { "data-testid": "photo-heading" }, "Photo"),
    m(Photo, { photo, loading: "eager", interactive: false }),
    drawPhotoLinks(photo, albumHidden),
    drawPhotoDetails(vnode.attrs),
  ]);
}

export function PhotoPage() {
  return { view: viewPhotoPage };
}
