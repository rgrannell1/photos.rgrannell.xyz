/* Render one interactive photo and its metadata link. */

import m from "mithril";
import { block } from "../../app/events.ts";
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

function viewPhoto(vnode: m.Vnode<PhotoAttrs>): m.Children {
  const { photo, loading, interactive } = vnode.attrs;
  const id = formatId(photo.id);
  const {
    fullImage,
    thumbnailUrl,
    mosaicColours,
  } = photo;

  const thumbnailDataUrl = thumbHashDataUrl(mosaicColours);

  const $mdIcon = m(MetadataIcon, { route: `/photo/${id}`, colour: photo.contrastingGrey });
  const $imagePair = m(ImagePair, {
    imageUrl: photo.fullImage,
    thumbnailUrl,
    thumbnailDataUrl,
    loading,
    width: PHOTO_WIDTH,
    height: PHOTO_HEIGHT,
    onclick: openUrl.bind(null, fullImage),
  });

  return m(
    "div",
    m("div.photo", {}, [
      m(
        "a",
        { onclick: block },
        interactive
          ? [
            $mdIcon,
            $imagePair,
          ]
          : [$imagePair],
      ),
    ]),
  );
}

export function Photo() {
  return { onbeforeupdate: shouldUpdatePhoto, view: viewPhoto };
}
