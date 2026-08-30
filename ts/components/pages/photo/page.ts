/* Support photo operations. */

import m from "mithril";
import { Photo } from "../../media/images/photo.ts";
import type { Photo as PhotoType } from "../../../types/domain.ts";
import type { PhotoPageAttrs } from "./photo.ts";
import { drawPhotoDetails, drawPhotoLinks } from "./links.ts";

export function drawPhoto(photo: PhotoType): m.Children {
  return m(Photo, { photo, loading: "eager", interactive: false });
}

export function drawPhotoPageHeading(): m.Children {
  return m("h1", { "data-testid": "photo-heading" }, "Photo");
}

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

export function viewPhotoPage(vnode: m.Vnode<PhotoPageAttrs>): m.Children {
  const content = drawPhotoPageContent(vnode.attrs);
  return m("main", { "data-testid": "photo-page" }, content);
}
