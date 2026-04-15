import m from "mithril";
import { parseUrn } from "@rgrannell1/tribbledb";

import { block, broadcast } from "../commons/events.ts";
import { MetadataIcon } from "./metadata-icon.ts";
import { PHOTO_HEIGHT, PHOTO_WIDTH } from "../constants.ts";
import { encodeBitmapDataURL } from "../services/photos.ts";
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
  onclick: ((e: Event) => void) | undefined;
  width?: number;
  height?: number;
};

/*
 * The thumbnail image itself
 */
function Image() {
  return {
    view(vnode: m.Vnode<ImageAttrs>) {
      const { thumbnailUrl, loading, onclick, width, height } = vnode.attrs;

      return m("img.thumbnail-image", {
        onload: loadImage.bind(null, thumbnailUrl),
        src: thumbnailUrl,
        loading: loading,
        onclick,
        ...(width !== undefined && { width }),
        ...(height !== undefined && { height }),
      });
    },
  };
}

type PlaceholderImageAttrs = {
  thumbnailDataUrl: string;
  width?: number;
  height?: number;
};

/*
 * The placeholder data URL
 */
function PlaceholderImage() {
  return {
    view(vnode: m.Vnode<PlaceholderImageAttrs>) {
      const { thumbnailDataUrl, width, height } = vnode.attrs;

      return m("img.u-photo.thumbnail-image.thumbnail-placeholder", {
        src: thumbnailDataUrl,
        ...(width !== undefined && { width }),
        ...(height !== undefined && { height }),
      });
    },
  };
}

type ImagePairAttrs = {
  imageUrl?: string;
  thumbnailUrl: string;
  thumbnailDataUrl: string | null;
  loading: "eager" | "lazy";
  onclick: ((e: Event) => void) | undefined;
  width?: number;
  height?: number;
};

type BannerImagePairAttrs = {
  thumbnailUrl: string;
  thumbnailDataUrl: string | null;
};

/*
 * Variant of ImagePair for full-bleed banners. Uses .album-banner-image so existing
 * CSS and the parallax querySelector stay intact. Placeholder is inlined to fill the
 * container without requiring new CSS.
 */
export function BannerImagePair() {
  return {
    view(vnode: m.Vnode<BannerImagePairAttrs>) {
      const { thumbnailUrl, thumbnailDataUrl } = vnode.attrs;

      const $placeholder = thumbnailDataUrl
        ? m("img.banner-placeholder", {
          src: thumbnailDataUrl,
          alt: "",
        })
        : null;

      return m("div", { style: "position:relative;width:100%;height:100%;" }, [
        $placeholder,
        m("img.album-banner-image", {
          src: thumbnailUrl,
          loading: "eager",
          onload: loadImage.bind(null, thumbnailUrl),
        }),
      ]);
    },
  };
}

/*
 * The underlying pair of images. One is the actual thumbnail, which
 * takes time to load. The other will be a grid data URL that instantly loads.
 * If imageUrl is provided the pair is wrapped in a link to that image.
 */
export function ImagePair() {
  return {
    view(vnode: m.Vnode<ImagePairAttrs>) {
      const {
        imageUrl,
        thumbnailUrl,
        thumbnailDataUrl,
        loading,
        onclick,
        width,
        height,
      } = vnode.attrs;

      const children = [
        thumbnailDataUrl
          ? m(PlaceholderImage, { thumbnailDataUrl, width, height })
          : null,
        m(Image, { thumbnailUrl, loading, onclick, width, height }),
      ];

      return imageUrl
        ? m(
          "a",
          { href: imageUrl, target: "_blank", rel: "external" },
          children,
        )
        : m("div", children);
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
      const thumbnailDataUrl = encodeBitmapDataURL(mosaicColours);

      const $mdIcon = m(MetadataIcon, { id, colour: photo.contrastingGrey });
      const $imagePair = m(ImagePair, {
        imageUrl: photo.fullImage,
        thumbnailUrl,
        thumbnailDataUrl,
        loading,
        width: PHOTO_WIDTH,
        height: PHOTO_HEIGHT,
        onclick: () => {
          window.location.href = fullImage;
        },
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
