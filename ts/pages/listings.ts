import m from "mithril";
import { navigate } from "../commons/events.ts";
import type { Services } from "../types.ts";
import { PhotoAlbum } from "../components/album/photo-album.ts";
import { encodeBitmapDataURL, loadingMode } from "../services/photos.ts";
import { LISTED_TYPES } from "../constants/display.ts";

type CategoryDef = {
  type: string;
  label: string;
  route: string;
};

const CATEGORIES: CategoryDef[] = LISTED_TYPES.map(([type, label]) => ({
  type,
  label,
  route: `/listing/${type}`,
}));

/*
 * Render a single category album card with its best-rated cover photo.
 * Returns an empty array if no cover photo is available for the category.
 */
function drawCategoryAlbum(
  services: Services,
  category: CategoryDef,
  idx: number,
): m.Children[] {
  const cover = services.readCategoryCover(category.type);
  if (!cover) {
    return [];
  }

  const labelAttrs = {
    "data-testid": "listing-card-label",
    "data-listing-type": category.type,
  };

  return [m(PhotoAlbum, {
    imageUrl: cover.fullImage,
    thumbnailUrl: cover.thumbnailUrl,
    thumbnailDataUrl: encodeBitmapDataURL(cover.mosaicColours),
    loading: loadingMode(idx),
    trip: undefined,
    child: m("p.album-title", labelAttrs, category.label),
    onclick: navigate(category.route),
  })];
}

type ListingsPageAttrs = {
  visible: boolean;
  services: Services;
};

export function ListingsPage() {
  return {
    view(vnode: m.Vnode<ListingsPageAttrs>) {
      const { visible, services } = vnode.attrs;

      const $albums = CATEGORIES.flatMap((category, idx) =>
        drawCategoryAlbum(services, category, idx)
      );

      return m("div", {
        class: visible ? "page sidebar-visible" : "page",
      }, [
        m("section.album-metadata", [
          m("h1.albums-header", { "data-testid": "listings-heading" }, "Listings"),
          m("p", "Collections of all places and animals"),
        ]),
        m("section.album-container", { "data-testid": "listings-grid" }, $albums),
      ]);
    },
  };
}
