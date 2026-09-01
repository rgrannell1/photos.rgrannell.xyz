/* Render one interactive photo and its metadata link. */

import m from "mithril";
import { block } from "../../../services/browser/events.ts";
import { openUrl } from "../../../services/browser/window.ts";
import { formatId } from "../../../commons/urn.ts";
import { MetadataIcon } from "../metadata/metadata-icon.ts";
import { PHOTO_HEIGHT, PHOTO_WIDTH } from "../../../constants/layout.ts";
import type { ImageLoading } from "../../../constants/display.ts";
import { thumbHashDataUrl } from "../../../services/rendering/year-scroll/photos.ts";
import type { Photo as PhotoType } from "../../../types/domain.ts";
import { ImagePair, type ImagePairAttrs } from "./image-pair.ts";

export type PhotoAttrs = {
  photo: PhotoType;
  loading: ImageLoading;
  interactive?: boolean;
};

/** Report whether a photo component input requires a redraw. */
export function hasPhotoChanged(
  attrs: PhotoAttrs,
  oldAttrs: PhotoAttrs,
): boolean {
  const hasPhotoChange = attrs.photo !== oldAttrs.photo;
  const hasLoadingChange = attrs.loading !== oldAttrs.loading;
  const hasInteractionChange = attrs.interactive !== oldAttrs.interactive;
  return hasPhotoChange || hasLoadingChange || hasInteractionChange;
}

/** Compare current and previous attributes for Mithril redraw control. */
function shouldUpdatePhoto(
  vnode: m.Vnode<PhotoAttrs>,
  old: m.VnodeDOM<PhotoAttrs>,
): boolean {
  return hasPhotoChanged(vnode.attrs, old.attrs);
}

/** Render the full photo with its thumbnail placeholder and open action. */
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

/** Render the metadata route icon for an interactive photo. */
function drawPhotoMetadata(photo: PhotoType): m.Children {
  const route = `/photo/${formatId(photo.id)}`;
  const iconAttrs = { route, colour: photo.contrastingGrey };
  return m(MetadataIcon, iconAttrs);
}

/** Add metadata controls only when the photo is interactive. */
function drawPhotoContent(attrs: PhotoAttrs): m.Children[] {
  const $imagePair = drawImagePair(attrs);
  if (!attrs.interactive) {
    return [$imagePair];
  }
  const $metadataIcon = drawPhotoMetadata(attrs.photo);
  return [$metadataIcon, $imagePair];
}

/** Wrap photo content in a link whose click uses component actions. */
function drawPhotoLink(content: m.Children[]): m.Children {
  return m("a", { onclick: block }, content);
}

/** Render one photo and its optional metadata control. */
function viewPhoto(vnode: m.Vnode<PhotoAttrs>): m.Children {
  const $content = drawPhotoContent(vnode.attrs);
  const $link = drawPhotoLink($content);
  const $photo = m("div.photo", [$link]);
  return m("div", $photo);
}

/** Create an interactive photo component with selective redraws. */
export function Photo() {
  return { onbeforeupdate: shouldUpdatePhoto, view: viewPhoto };
}
