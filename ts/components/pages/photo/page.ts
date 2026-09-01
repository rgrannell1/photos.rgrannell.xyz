/* Support photo operations. */

import m from "mithril";
import { Photo } from "../../media/images/photo.ts";
import type { Photo as PhotoType } from "../../../types/domain.ts";
import type { PhotoPageAttrs } from "./photo.ts";
import { drawPhotoDetails, drawPhotoLinks } from "./links.ts";
import { ImageLoadingMode } from "../../../constants/display.ts";

/** Renders the selected photo eagerly without grid interaction. */
export function drawPhoto(photo: PhotoType): m.Children {
  return m(Photo, {
    photo,
    loading: ImageLoadingMode.Eager,
    interactive: false,
  });
}

/** Renders the photo page heading. */
export function drawPhotoPageHeading(): m.Children {
  return m("h1", { "data-testid": "photo-heading" }, "Photo");
}

/** Renders the ordered heading, photo, links, and details content. */
export function drawPhotoPageContent(attrs: PhotoPageAttrs): m.Children[] {
  const photo = drawPhoto(attrs.photo);
  const links = drawPhotoLinks(attrs.photo, attrs.albumHidden);
  return [
    drawPhotoPageHeading(),
    photo,
    links,
    drawPhotoDetails(attrs),
  ];
}

/** Renders the photo page main element. */
export function viewPhotoPage(vnode: m.Vnode<PhotoPageAttrs>): m.Children {
  const content = drawPhotoPageContent(vnode.attrs);
  return m("main", { "data-testid": "photo-page" }, content);
}
