/* Pair a thumbnail with its placeholder and optional link. */

import m from "mithril";
import { Image } from "./image.ts";
import { PlaceholderImage } from "./placeholder-image.ts";
import { isSome, type Maybe } from "../../../commons/collections/maybe.ts";

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

function drawPlaceholder(attrs: ImagePairAttrs): m.Children {
  if (!isSome(attrs.thumbnailDataUrl)) {
    return null;
  }
  const placeholderAttrs = {
    thumbnailDataUrl: attrs.thumbnailDataUrl,
    width: attrs.width,
    height: attrs.height,
  };
  return m(PlaceholderImage, placeholderAttrs);
}

function drawImageChildren(attrs: ImagePairAttrs): m.Children[] {
  const {
    imageUrl,
    href,
    thumbnailUrl,
    loading,
    onclick,
    width,
    height,
  } = attrs;

  // When an anchor wraps the image, only the anchor handles its click.
  const isHrefLink = Boolean(href) && !imageUrl;
  const imageOnclick = isHrefLink ? undefined : onclick;
  const placeholder = drawPlaceholder(attrs);
  const imageAttrs = {
    thumbnailUrl,
    loading,
    onclick: imageOnclick,
    width,
    height,
  };
  const image = m(Image, imageAttrs);

  return [placeholder, image];
}

function fullImageLinkAttrs(imageUrl: string, label?: string): m.Attributes {
  return {
    href: imageUrl,
    target: "_blank",
    rel: "external",
    "aria-label": label ?? "open full image",
  };
}

function routeLinkAttrs(
  href: string,
  onclick?: (event: Event) => void,
  label?: string,
): m.Attributes {
  return { href, onclick, "aria-label": label };
}

function viewImagePair(vnode: m.Vnode<ImagePairAttrs>): m.Children {
  const { imageUrl, href, onclick, label } = vnode.attrs;
  const children = drawImageChildren(vnode.attrs);

  if (imageUrl) {
    const linkAttrs = fullImageLinkAttrs(imageUrl, label);
    return m("a", linkAttrs, children);
  }

  if (href) {
    const linkAttrs = routeLinkAttrs(href, onclick, label);
    return m("a", linkAttrs, children);
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
