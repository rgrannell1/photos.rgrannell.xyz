import m from "mithril";
import type { Photo as PhotoType } from "../../types.ts";
import { PhotoGrid } from "../media/photo-grid.ts";
import { countLabel } from "../../commons/strings.ts";

type PhotosPageAttrs = {
  total: number;
  getPhotos: (limit: number) => PhotoType[];
  visible: boolean;
};

function viewPhotosPage(vnode: m.Vnode<PhotosPageAttrs>): m.Children {
  const { total, getPhotos, visible } = vnode.attrs;

  const countText = countLabel(total, "photo");

  const $md = m("section.photos-metadata", [
    m("h1", "Photos"),
    m("p.photo-album-count", countText),
  ]);

  return m("main", {
    class: visible ? "page sidebar-visible" : "page",
  }, [
    $md,
    m(PhotoGrid, {
      total,
      getPhotos,
      groupByYear: true,
    }),
  ]);
}

export function PhotosPage() {
  return { view: viewPhotosPage };
}
