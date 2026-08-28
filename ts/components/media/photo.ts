/* Render one interactive photo and its metadata link. */

import m from "mithril";
import { block } from "../../services/browser/events.ts";
import { openUrl } from "../../services/browser/window.ts";
import { formatId } from "../../commons/urn.ts";
import { MetadataIcon } from "./metadata-icon.ts";
import { PHOTO_HEIGHT, PHOTO_WIDTH } from "../../constants/layout.ts";
import { thumbHashDataUrl } from "../../services/rendering/photos.ts";
import type { Photo as PhotoType } from "../../types/domain.ts";
import { ImagePair } from "./image-pair.ts";

export type PhotoAttrs = {
  photo: PhotoType;
  loading: "eager" | "lazy";
  interactive?: boolean;
};

export function hasPhotoChanged(attrs: PhotoAttrs, oldAttrs: PhotoAttrs): boolean {
  return attrs.photo !== oldAttrs.photo ||
    attrs.loading !== oldAttrs.loading ||
    attrs.interactive !== oldAttrs.interactive;
}

function shouldUpdatePhoto(
  vnode: m.Vnode<PhotoAttrs>,
  old: m.VnodeDOM<PhotoAttrs>,
): boolean {
  return hasPhotoChanged(vnode.attrs, old.attrs);
}

function drawImagePair(attrs: PhotoAttrs): m.Children {
  const { photo, loading } = attrs;
  return m(ImagePair, {
    imageUrl: photo.fullImage,
    thumbnailUrl: photo.thumbnailUrl,
    thumbnailDataUrl: thumbHashDataUrl(photo.mosaicColours),
    loading,
    width: PHOTO_WIDTH,
    height: PHOTO_HEIGHT,
    onclick: openUrl.bind(null, photo.fullImage),
  });
}

function viewPhoto(vnode: m.Vnode<PhotoAttrs>): m.Children {
  const { photo, interactive } = vnode.attrs;
  const imagePair = drawImagePair(vnode.attrs);
  const metadataIcon = m(MetadataIcon, {
    route: `/photo/${formatId(photo.id)}`,
    colour: photo.contrastingGrey,
  });
  const content = interactive ? [metadataIcon, imagePair] : [imagePair];

  return m(
    "div",
    m("div.photo", {}, [m("a", { onclick: block }, content)]),
  );
}

export function Photo() {
  return { onbeforeupdate: shouldUpdatePhoto, view: viewPhoto };
}
