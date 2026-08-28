/* Pair a thumbnail with its placeholder and optional link. */

import m from "mithril";
import { Image } from "./image.ts";
import { PlaceholderImage } from "./placeholder-image.ts";
import { isSome, type Maybe } from "../../commons/maybe.ts";

export type ImagePairAttrs = {
  imageUrl?: string;
  href?: string;
  thumbnailUrl: string;
  thumbnailDataUrl: Maybe<string>;
  loading: "eager" | "lazy";
  onclick?: (event: Event) => void;
  width?: number;
  height?: number;
  // Accessible name for the wrapping link, since the images are decorative.
  label?: string;
};

function drawImageChildren(attrs: ImagePairAttrs): m.Children[] {
  const {
    imageUrl,
    href,
    thumbnailUrl,
    thumbnailDataUrl,
    loading,
    onclick,
    width,
    height,
  } = attrs;

  // When an anchor wraps the image, only the anchor handles its click.
  const isHrefLink = Boolean(href) && !imageUrl;
  const imageOnclick = isHrefLink ? undefined : onclick;

  return [
    isSome(thumbnailDataUrl)
      ? m(PlaceholderImage, { thumbnailDataUrl, width, height })
      : null,
    m(Image, { thumbnailUrl, loading, onclick: imageOnclick, width, height }),
  ];
}

function viewImagePair(vnode: m.Vnode<ImagePairAttrs>): m.Children {
  const { imageUrl, href, onclick, label } = vnode.attrs;
  const children = drawImageChildren(vnode.attrs);

  if (imageUrl) {
    return m("a", {
      href: imageUrl,
      target: "_blank",
      rel: "external",
      "aria-label": label ?? "open full image",
    }, children);
  }

  if (href) {
    return m("a", { href, onclick, "aria-label": label }, children);
  }

  return m("div", children);
}

/*
 * A thumbnail paired with its placeholder. imageUrl opens the image in a new
 * tab. href navigates in-app, leaving modified clicks to the browser.
 */
export function ImagePair() {
  return { view: viewImagePair };
}
