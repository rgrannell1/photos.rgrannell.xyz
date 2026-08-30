/* Render one interactive photo and its metadata link. */

import m from "mithril";
import { block } from "../../../services/browser/events.ts";
import { openUrl } from "../../../services/browser/window.ts";
import { formatId } from "../../../commons/urn.ts";
import { MetadataIcon } from "../metadata/metadata-icon.ts";
import { PHOTO_HEIGHT, PHOTO_WIDTH } from "../../../constants/layout.ts";
import { thumbHashDataUrl } from "../../../services/rendering/year-scroll/photos.ts";
import type { Photo as PhotoType } from "../../../types/domain.ts";
import { ImagePair, type ImagePairAttrs } from "./image-pair.ts";

export type PhotoAttrs = {
  photo: PhotoType;
  loading: "eager" | "lazy";
  interactive?: boolean;
};

export function hasPhotoChanged(
  attrs: PhotoAttrs,
  oldAttrs: PhotoAttrs,
): boolean {
  const hasPhotoChange = attrs.photo !== oldAttrs.photo;
  const hasLoadingChange = attrs.loading !== oldAttrs.loading;
  const hasInteractionChange = attrs.interactive !== oldAttrs.interactive;
  return hasPhotoChange || hasLoadingChange || hasInteractionChange;
}

function shouldUpdatePhoto(
  vnode: m.Vnode<PhotoAttrs>,
  old: m.VnodeDOM<PhotoAttrs>,
): boolean {
  return hasPhotoChanged(vnode.attrs, old.attrs);
}

function drawImagePair(attrs: PhotoAttrs): m.Children {
  const { photo, loading } = attrs;
  const thumbnailDataUrl = thumbHashDataUrl(photo.mosaicColours);
  const imageAttrs: ImagePairAttrs = {
    imageUrl: photo.fullImage,
    thumbnailUrl: photo.thumbnailUrl,
    thumbnailDataUrl,
    loading,
    width: PHOTO_WIDTH,
    height: PHOTO_HEIGHT,
    onclick: openUrl.bind(null, photo.fullImage),
  };
  return m(ImagePair, imageAttrs);
}

function drawPhotoMetadata(photo: PhotoType): m.Children {
  const route = `/photo/${formatId(photo.id)}`;
  const iconAttrs = { route, colour: photo.contrastingGrey };
  return m(MetadataIcon, iconAttrs);
}

function drawPhotoContent(attrs: PhotoAttrs): m.Children[] {
  const imagePair = drawImagePair(attrs);
  if (!attrs.interactive) {
    return [imagePair];
  }
  const metadataIcon = drawPhotoMetadata(attrs.photo);
  return [metadataIcon, imagePair];
}

function drawPhotoLink(content: m.Children[]): m.Children {
  return m("a", { onclick: block }, content);
}

function viewPhoto(vnode: m.Vnode<PhotoAttrs>): m.Children {
  const content = drawPhotoContent(vnode.attrs);
  const link = drawPhotoLink(content);
  const photo = m("div.photo", [link]);
  return m("div", photo);
}

export function Photo() {
  return { onbeforeupdate: shouldUpdatePhoto, view: viewPhoto };
}
