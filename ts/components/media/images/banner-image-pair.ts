/* Render a full-bleed banner image above its placeholder. */

import m from "mithril";
import { hidePlaceholderOnLoad } from "../../../services/browser/images.ts";
import { isSome, type Maybe } from "../../../commons/collections/maybe.ts";

export type BannerImagePairAttrs = {
  thumbnailUrl: string;
  thumbnailDataUrl: Maybe<string>;
  alt: string;
};

function drawBannerPlaceholder(thumbnailDataUrl: Maybe<string>): m.Children {
  if (!isSome(thumbnailDataUrl)) {
    return null;
  }
  const placeholderAttrs = { src: thumbnailDataUrl, alt: "" };
  const placeholder = m("img.banner-placeholder", placeholderAttrs);
  return placeholder;
}

function drawBannerImage(attrs: BannerImagePairAttrs): m.Children {
  const imageAttrs = {
    src: attrs.thumbnailUrl,
    alt: attrs.alt,
    loading: "eager",
    fetchpriority: "high",
    onload: hidePlaceholderOnLoad,
  };
  const image = m("img.album-banner-image", imageAttrs);
  return image;
}

function viewBannerImagePair(
  vnode: m.Vnode<BannerImagePairAttrs>,
): m.Children {
  const placeholder = drawBannerPlaceholder(vnode.attrs.thumbnailDataUrl);
  const image = drawBannerImage(vnode.attrs);
  const containerAttrs = { style: "position:relative;width:100%;height:100%;" };
  return m("div", containerAttrs, [placeholder, image]);
}

/* Full-bleed banner variant of ImagePair. */
export function BannerImagePair() {
  return { view: viewBannerImagePair };
}
