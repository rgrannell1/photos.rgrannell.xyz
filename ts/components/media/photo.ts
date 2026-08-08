import m from "mithril";
import { block } from "../../commons/events.ts";
import { hidePlaceholderOnLoad } from "../../services/images.ts";
import { openUrl } from "../../services/window.ts";
import { formatId } from "../../commons/urn.ts";
import { MetadataIcon } from "./metadata-icon.ts";
import { PHOTO_HEIGHT, PHOTO_WIDTH } from "../../constants/layout.ts";
import { thumbHashDataUrl } from "../../services/photos.ts";
import type { Photo as PhotoType } from "../../types.ts";

type ImageAttrs = {
  thumbnailUrl: string;
  loading: "eager" | "lazy";
  onclick: ((e: Event) => void) | undefined;
  width?: number | undefined;
  height?: number | undefined;
  alt?: string | undefined;
};

function viewImage(vnode: m.Vnode<ImageAttrs>): m.Children {
  const { thumbnailUrl, loading, onclick, width, height, alt } = vnode.attrs;

  return m("img.thumbnail-image", {
    onload: hidePlaceholderOnLoad,
    src: thumbnailUrl,
    loading: loading,
    alt: alt ?? "",
    onclick,
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
  });
}

/*
 * The thumbnail image itself
 */
function Image() {
  return { view: viewImage };
}

type PlaceholderImageAttrs = {
  thumbnailDataUrl: string;
  width?: number | undefined;
  height?: number | undefined;
};

function viewPlaceholderImage(
  vnode: m.Vnode<PlaceholderImageAttrs>,
): m.Children {
  const { thumbnailDataUrl, width, height } = vnode.attrs;

  return m("img.u-photo.thumbnail-image.thumbnail-placeholder", {
    src: thumbnailDataUrl,
    alt: "",
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
  });
}

/*
 * The placeholder data URL
 */
function PlaceholderImage() {
  return { view: viewPlaceholderImage };
}

type ImagePairAttrs = {
  imageUrl?: string;
  href?: string;
  thumbnailUrl: string;
  thumbnailDataUrl: string | null;
  loading: "eager" | "lazy";
  onclick: ((e: Event) => void) | undefined;
  width?: number;
  height?: number;
  // accessible name for the wrapping link, since the images are decorative
  label?: string;
};

type BannerImagePairAttrs = {
  thumbnailUrl: string;
  thumbnailDataUrl: string | null;
  alt: string;
};

function viewBannerImagePair(
  vnode: m.Vnode<BannerImagePairAttrs>,
): m.Children {
  const { thumbnailUrl, thumbnailDataUrl, alt } = vnode.attrs;

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
      alt,
      loading: "eager",
      fetchpriority: "high",
      onload: hidePlaceholderOnLoad,
    }),
  ]);
}

/*
 * Variant of ImagePair for full-bleed banners. Uses .album-banner-image so existing
 * CSS and the parallax querySelector stay intact. Placeholder is inlined to fill the
 * container without requiring new CSS.
 */
export function BannerImagePair() {
  return { view: viewBannerImagePair };
}

function viewImagePair(vnode: m.Vnode<ImagePairAttrs>): m.Children {
  const {
    imageUrl,
    href,
    thumbnailUrl,
    thumbnailDataUrl,
    loading,
    onclick,
    width,
    height,
    label,
  } = vnode.attrs;

  // when wrapping in an href anchor the onclick lives on the anchor, so the
  // inner image must not also fire it
  const isHrefLink = Boolean(href) && !imageUrl;
  const imageOnclick = isHrefLink ? undefined : onclick;

  const children = [
    thumbnailDataUrl
      ? m(PlaceholderImage, { thumbnailDataUrl, width, height })
      : null,
    m(Image, { thumbnailUrl, loading, onclick: imageOnclick, width, height }),
  ];

  if (imageUrl) {
    return m(
      "a",
      {
        href: imageUrl,
        target: "_blank",
        rel: "external",
        "aria-label": label ?? "open full image",
      },
      children,
    );
  }

  if (href) {
    return m("a", { href, onclick, "aria-label": label }, children);
  }

  return m("div", children);
}

/*
 * The underlying pair of images. One is the actual thumbnail, which
 * takes time to load. The other will be a grid data URL that instantly loads.
 * If imageUrl is provided the pair is wrapped in a new-tab link to that image.
 * If href is provided instead, the pair is wrapped in a same-tab link (e.g. an
 * album route) whose onclick drives SPA navigation but leaves modified clicks
 * to the browser, so the target can be opened in a new tab.
 */
export function ImagePair() {
  return { view: viewImagePair };
}

export type PhotoAttrs = {
  photo: PhotoType;
  loading: "eager" | "lazy";
  interactive?: boolean;
};


function viewPhoto(vnode: m.Vnode<PhotoAttrs>): m.Children {
  const { photo, loading, interactive } = vnode.attrs;
  const id = formatId(photo.id);
  const {
    fullImage,
    thumbnailUrl,
    mosaicColours,
  } = photo;

  // decode the ThumbHash placeholder into a data URL
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

/*
 * Represents a photo, with a metadata link and the fake-progressive-loading
 * features (https://rgrannell.xyz/replacing-google-photos) to make images appear blank for
 * less time.
 */
export function Photo() {
  return { view: viewPhoto };
}
