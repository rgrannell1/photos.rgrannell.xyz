import m from "mithril";
import type { Photo as PhotoType } from "../../../types/domain.ts";
import { PhotoGrid } from "../../media/images/photo-grid.ts";
import { countLabel } from "../../../commons/strings.ts";

type PhotosPageAttrs = {
  total: number;
  getPhotos: (limit: number) => PhotoType[];
  visible: boolean;
};

function drawPhotosHeading(): m.Children {
  return m("h1", "Photos");
}

function drawPhotosMetadata(countText: string): m.Children {
  return m("section.photos-metadata", [
    drawPhotosHeading(),
    m("p.photo-album-count", countText),
  ]);
}

function drawPhotosGrid(attrs: PhotosPageAttrs): m.Children {
  return m(PhotoGrid, {
    total: attrs.total,
    getPhotos: attrs.getPhotos,
    groupByYear: true,
  });
}

function drawPhotosPageContent(
  attrs: PhotosPageAttrs,
  countText: string,
): m.Children[] {
  return [drawPhotosMetadata(countText), drawPhotosGrid(attrs)];
}

function readPhotosPageClass(visible: boolean): string {
  return visible ? "page sidebar-visible" : "page";
}

function drawPhotosPage(className: string, content: m.Children[]): m.Children {
  return m("main", { class: className }, content);
}

function readPhotosCountText(attrs: PhotosPageAttrs): string {
  return countLabel(attrs.total, "photo");
}

function viewPhotosPage(vnode: m.Vnode<PhotosPageAttrs>): m.Children {
  const countText = readPhotosCountText(vnode.attrs);
  const content = drawPhotosPageContent(vnode.attrs, countText);
  const className = readPhotosPageClass(vnode.attrs.visible);

  return drawPhotosPage(className, content);
}

export function PhotosPage() {
  return { view: viewPhotosPage };
}
