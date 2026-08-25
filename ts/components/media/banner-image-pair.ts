/* Render a full-bleed banner image above its placeholder. */

import m from "mithril";
import { hidePlaceholderOnLoad } from "../../services/browser/images.ts";
import { isSome, type Maybe } from "../../commons/maybe.ts";

export type BannerImagePairAttrs = {
  thumbnailUrl: string;
  thumbnailDataUrl: Maybe<string>;
  alt: string;
};

function viewBannerImagePair(
  vnode: m.Vnode<BannerImagePairAttrs>,
): m.Children {
  const { thumbnailUrl, thumbnailDataUrl, alt } = vnode.attrs;

  const $placeholder = isSome(thumbnailDataUrl)
    ? m("img.banner-placeholder", { src: thumbnailDataUrl, alt: "" })
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

/* Full-bleed banner variant of ImagePair. */
export function BannerImagePair() {
  return { view: viewBannerImagePair };
}
