import m from "mithril";
import { parseUrn } from "@rgrannell1/tribbledb";

import { block, broadcast } from "../events.ts";
import { MetadataIcon } from "./metadata-icon.ts";
import { PHOTO_HEIGHT, PHOTO_WIDTH } from "../constants.ts";
import { Photos } from "../services/photos.ts";
import type { Photo as PhotoType } from "../types.ts";

/*
 * Broadcast an event when a photo loads, and swap out the placeholder
 */
function loadImage(url: string, event: Event) {
  broadcast("photo_loaded", { url });

  const $placeholder = (event.target as HTMLElement)?.parentNode
    ?.querySelector(
      ".thumbnail-placeholder",
    ) as HTMLElement;

  if (!$placeholder) {
    return;
  }

  $placeholder.style.zIndex = "-1";
}

type ImageAttrs = {
  thumbnailUrl: string;
  loading: "eager" | "lazy";
  onclick?: (e: Event) => void;
};

/*
 * The thumbnail image itself
 */
function Image() {
  return {
    view(vnode: m.Vnode<ImageAttrs>) {
      const { thumbnailUrl, loading, onclick } = vnode.attrs;

      return m("img.thumbnail-image", {
        onload: loadImage.bind(null, thumbnailUrl),
        width: PHOTO_WIDTH,
        height: PHOTO_HEIGHT,
        src: thumbnailUrl,
        loading: loading,
        onclick,
      });
    },
  };
}

type PlaceholderImageAttrs = {
  thumbnailDataUrl: string;
};

/*
 * The placeholder data URL
 */
function PlaceholderImage() {
  return {
    view(vnode: m.Vnode<PlaceholderImageAttrs>) {
      const { thumbnailDataUrl } = vnode.attrs;

      return m("img.u-photo.thumbnail-image.thumbnail-placeholder", {
        width: PHOTO_WIDTH,
        height: PHOTO_HEIGHT,
        src: thumbnailDataUrl,
      });
    },
  };
}

type ImagePairAttrs = {
  fullImage: string;
  thumbnailUrl: string;
  thumbnailDataUrl: string;
  loading: "eager" | "lazy";
  onclick?: (e: Event) => void;
};

/*
 * The underlying pair of images. One is the actual thumbnail, which
 * takes time to load. The other will be a grid data URL that instantly loads.
 */
export function ImagePair() {
  return {
    view(vnode: m.Vnode<ImagePairAttrs>) {
      const {
        fullImage,
        thumbnailUrl,
        thumbnailDataUrl,
        loading,
        onclick,
      } = vnode.attrs;

      return m("a", {
        href: fullImage,
        target: "_blank",
        rel: "external",
      }, [
        m(PlaceholderImage, { thumbnailDataUrl }),
        m(Image, { thumbnailUrl, loading, onclick }),
      ]);
    },
  };
}

/* */
function formatId(id: string): string {
  return id.startsWith("urn:") ? parseUrn(id).id : id;
}

export type PhotoAttrs = {
  photo: PhotoType;
  loading: "eager" | "lazy";
  interactive?: boolean;
};

/*
 * Represents a photo, with a metadata link and the fake-progressive-loading
 * features (https://rgrannell.xyz/replacing-google-photos) to make images appear blank for
 * less time.
 */
export function Photo() {
  return {
    view(vnode: m.Vnode<PhotoAttrs>) {
      const { photo, loading, interactive } = vnode.attrs;
      const id = formatId(photo.id);
      const {
        fullImage,
        thumbnailUrl,
        mosaicColours,
      } = photo;

      // encode a grid of colours into a data URL
      const thumbnailDataUrl = Photos.encodeBitmapDataURL(mosaicColours);

      const $mdIcon = m(MetadataIcon, { id });
      const $imagePair = m(ImagePair, {
        fullImage,
        thumbnailUrl,
        thumbnailDataUrl,
        loading,
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
    },
  };
}
