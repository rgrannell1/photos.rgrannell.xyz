/* Support photo operations. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { sharePhotoUrl } from "../../../services/browser/window.ts";
import type { Photo as PhotoType } from "../../../types/domain.ts";
import { AlbumButton } from "../../album/album-button.ts";
import { ExifData } from "../../media/metadata/exif-data.ts";
import { MediaInfo } from "../../media/metadata/media-info.ts";
import type { PhotoPageAttrs } from "./photo.ts";

export function drawPhotoLink(href: string, label: string): m.Children {
  return m("li", m("a", { href, rel: "noreferrer" }, label));
}

export function drawPhotoResourceLinks(
  photo: PhotoType,
  shareUrl: string,
): m.Children[] {
  const webpLink = drawPhotoLink(photo.fullImage, "[webp]");
  const jpegLink = drawPhotoLink(photo.previewJpegUrl, "[jpeg]");
  const shareLink = drawPhotoLink(shareUrl, "[share]");
  return [webpLink, jpegLink, shareLink];
}

export function drawPhotoAlbumLink(
  photo: PhotoType,
  albumHidden: boolean,
): m.Children {
  const attrs = { id: photo.albumId, hidden: albumHidden };
  const button = m(AlbumButton, attrs);
  return m("li", button);
}

export function readPhotoShareUrl(photo: PhotoType): string {
  return sharePhotoUrl(`photo/${asUrn(photo.id).id}`);
}

export function drawPhotoLinks(
  photo: PhotoType,
  albumHidden: boolean,
): m.Children {
  const shareUrl = readPhotoShareUrl(photo);
  const links = drawPhotoResourceLinks(photo, shareUrl);
  links.push(drawPhotoAlbumLink(photo, albumHidden));
  return drawPhotoLinkList(links);
}

export function drawPhotoLinkList(links: m.Children[]): m.Children {
  return m("ul.link-list", { "data-testid": "photo-links" }, links);
}

export function drawPhotoInformation(attrs: PhotoPageAttrs): m.Children {
  return m(MediaInfo, {
    media: attrs.photo,
    readThing: attrs.readThing,
    readEmoji: attrs.readEmoji,
  });
}

export function drawExifInformation(attrs: PhotoPageAttrs): m.Children {
  return m(ExifData, {
    photo: attrs.photo,
    readThing: attrs.readThing,
    readEmoji: attrs.readEmoji,
  });
}

export function drawPhotoDetails(attrs: PhotoPageAttrs): m.Children {
  const className = attrs.visible ? "page sidebar-visible" : "page";
  const details = drawPhotoDetailSections(attrs);
  return m("div", { class: className }, details);
}

export function drawPhotoDetailSections(attrs: PhotoPageAttrs): m.Children[] {
  const photoDetails = [
    m("h3", "Photo Information"),
    drawPhotoInformation(attrs),
  ];
  const exifDetails = [m("h3", "Exif Data"), drawExifInformation(attrs)];
  return [...photoDetails, ...exifDetails];
}
