import m from "mithril";
import { navigate } from "../../services/browser/events.ts";
import type { Photo } from "../../types/domain.ts";
import { PhotoAlbum } from "../album/photo-album.ts";
import { thumbHashDataUrl, loadingMode } from "../../services/rendering/photos.ts";
import { NONE } from "../../commons/maybe.ts";

type CategoryDef = {
  type: string;
  label: string;
  route: string;
  cover: Photo;
};

/*
 * Returns an empty array when the category has no cover photo.
 */
function drawCategoryAlbum(
  category: CategoryDef,
  idx: number,
): m.Children[] {
  const { cover } = category;

  const labelAttrs = {
    "data-testid": "listing-card-label",
    "data-listing-type": category.type,
  };

  return [m(PhotoAlbum, {
    key: `category-${category.type}`,
    label: category.type,
    imageUrl: cover.fullImage,
    thumbnailUrl: cover.thumbnailUrl,
    thumbnailDataUrl: thumbHashDataUrl(cover.mosaicColours),
    loading: loadingMode(idx),
    trip: NONE,
    child: m("p.album-title", labelAttrs, category.label),
    onclick: navigate(category.route),
  })];
}

type ListingsPageAttrs = {
  visible: boolean;
  categories: CategoryDef[];
};

function viewListingsPage(vnode: m.Vnode<ListingsPageAttrs>): m.Children {
  const { visible, categories } = vnode.attrs;
  const $albums = categories.flatMap(drawCategoryAlbum);

  return m("main", {
    class: visible ? "page sidebar-visible" : "page",
  }, [
    m("section.album-metadata", [
      m("h1.albums-header", { "data-testid": "listings-heading" }, "Listings"),
      m("p", "Collections of all places and animals"),
    ]),
    m("section.album-container", { "data-testid": "listings-grid" }, $albums),
  ]);
}

export function ListingsPage() {
  return { view: viewListingsPage };
}
