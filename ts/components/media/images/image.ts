/* Render a photo thumbnail. */

import m from "mithril";
import { hidePlaceholderOnLoad } from "../../../services/browser/images.ts";
import type { ImageLoading } from "../../../constants/display.ts";

export type ImageAttrs = {
  thumbnailUrl: string;
  loading: ImageLoading;
  onclick?: (event: Event) => void;
  width?: number;
  height?: number;
  alt?: string;
};

/** Renders a thumbnail and hides its placeholder after load. */
function viewImage(vnode: m.Vnode<ImageAttrs>): m.Children {
  const { thumbnailUrl, loading, onclick, width, height, alt } = vnode.attrs;
  const imageAttrs = {
    onload: hidePlaceholderOnLoad,
    src: thumbnailUrl,
    loading,
    alt: alt ?? "",
    onclick,
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
  };
  return m("img.thumbnail-image", imageAttrs);
}

/** Defines the thumbnail image component. */
export function Image() {
  return { view: viewImage };
}
