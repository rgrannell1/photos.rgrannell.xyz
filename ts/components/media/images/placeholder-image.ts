/* Render the small placeholder below a photo thumbnail. */

import m from "mithril";

export type PlaceholderImageAttrs = {
  thumbnailDataUrl: string;
  width?: number;
  height?: number;
};

function viewPlaceholderImage(
  vnode: m.Vnode<PlaceholderImageAttrs>,
): m.Children {
  const { thumbnailDataUrl, width, height } = vnode.attrs;
  const imageAttrs = {
    src: thumbnailDataUrl,
    alt: "",
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
  };
  return m("img.u-photo.thumbnail-image.thumbnail-placeholder", imageAttrs);
}

export function PlaceholderImage() {
  return { view: viewPlaceholderImage };
}
