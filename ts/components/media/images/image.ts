/* Render a photo thumbnail. */

import m from "mithril";
import { hidePlaceholderOnLoad } from "../../../services/browser/images.ts";

export type ImageAttrs = {
  thumbnailUrl: string;
  loading: "eager" | "lazy";
  onclick?: (event: Event) => void;
  width?: number;
  height?: number;
  alt?: string;
};

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

export function Image() {
  return { view: viewImage };
}
