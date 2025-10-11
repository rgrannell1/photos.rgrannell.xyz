import m from "mithril";
import { parseUrn } from "@rgrannell1/tribbledb";

import { block, broadcast } from "../events.ts";
import { MetadataIcon } from "./metadata-icon.ts";
import { PHOTO_HEIGHT, PHOTO_WIDTH } from "../constants.ts";
import { Photos } from "../services/photos.ts";

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
  imageUrl: string;
  thumbnailUrl: string;
  thumbnailDataUrl: string;
  loading: "eager" | "lazy";
  onclick?: (e: Event) => void;
};

export function ImagePair() {
  return {
    view(vnode: m.Vnode<ImagePairAttrs>) {
      const {
        imageUrl,
        thumbnailUrl,
        thumbnailDataUrl,
        loading,
        onclick,
      } = vnode.attrs;

      return m("a", {
        href: imageUrl,
        target: "_blank",
        rel: "external",
      }, [
        m(PlaceholderImage, { thumbnailDataUrl }),
        m(Image, { thumbnailUrl, loading, onclick }),
      ]);
    },
  };
}

function formatId(id: string): string {
  return id.startsWith("urn:") ? parseUrn(id).id : id;
}

export type PhotoAttrs = {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  mosaicColours: string;
  summary?: string;
  loading: "eager" | "lazy";
};

export function Photo() {
  return {
    view(vnode: m.Vnode<PhotoAttrs>) {
      const id = formatId(vnode.attrs.id);
      const {
        imageUrl,
        thumbnailUrl,
        mosaicColours,
        loading,
      } = vnode.attrs;

      const thumbnailDataUrl = Photos.encodeBitmapDataURL(mosaicColours);

      const $mdIcon = m(MetadataIcon, {
        id,
        imageUrl,
        thumbnailUrl,
        mosaicColours,
      });
      const $imagePage = m(ImagePair, {
        imageUrl,
        thumbnailUrl,
        thumbnailDataUrl,
        loading,
      });

      return m("div.photo", {}, [
        m("a", {
          href: `#/metadata/${id}`,
          onclick: block, // TODO emit event
        }, [
          $mdIcon,
          $imagePage,
        ]),
      ]);
    },
  };
}
