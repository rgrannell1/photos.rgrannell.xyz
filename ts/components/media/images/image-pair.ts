/* Pair a thumbnail with its placeholder and optional link. */

import m from "mithril";
import { Image } from "./image.ts";
import { PlaceholderImage } from "./placeholder-image.ts";
import { isSome, type Maybe } from "../../../commons/collections/maybe.ts";
import { routeLinkAttrs } from "../../../services/browser/routes.ts";
import type { ImageLoading } from "../../../constants/display.ts";

export type ImagePairAttrs = {
  imageUrl?: string;
  href?: string;
  thumbnailUrl: string;
  thumbnailDataUrl: Maybe<string>;
  loading: ImageLoading;
  onclick?: (event: Event) => void;
  width?: number;
  height?: number;
  // Accessible name for the wrapping link, since the images are decorative.
  label?: string;
};

/** Renders a placeholder only when thumbnail data is available. */
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

/** Renders the placeholder and thumbnail with one effective click target. */
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
  const $image = m(Image, imageAttrs);

  return [placeholder, $image];
}

/** Builds attributes for a new-tab link to the full image. */
function fullImageLinkAttrs(imageUrl: string, label?: string): m.Attributes {
  return {
    href: imageUrl,
    target: "_blank",
    rel: "external",
    "aria-label": label ?? "open full image",
  };
}

/** Renders an image pair with a full-image link, route link, or plain wrapper. */
function viewImagePair(vnode: m.Vnode<ImagePairAttrs>): m.Children {
  const { imageUrl, href, label } = vnode.attrs;
  const children = drawImageChildren(vnode.attrs);

  if (href) {
    const linkAttrs = routeLinkAttrs(href, { "aria-label": label });
    return m(m.route.Link, linkAttrs, children);
  }

  if (imageUrl) {
    const linkAttrs = fullImageLinkAttrs(imageUrl, label);
    return m("a", linkAttrs, children);
  }

  return m("div", children);
}

/** Modified image-link clicks remain browser-managed. */
export function ImagePair(): m.Component<ImagePairAttrs> {
  return { view: viewImagePair };
}
