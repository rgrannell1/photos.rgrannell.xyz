import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import m from "mithril";
import { one } from "../../commons/arrays.ts";
import { navigate } from "../../commons/events.ts";
import type { Services } from "../../types.ts";
import { PhotoAlbum } from "../album/photo-album.ts";
import { encodeBitmapDataURL, loadingMode } from "../../services/photos.ts";

type CategoryDef = {
  type: string;
  label: string;
  route: string;
};

function toCategoryDef(listing: TripleObject): CategoryDef {
  const type = asUrn(listing.id as string).id;

  return {
    type,
    label: one(listing.name) as string,
    route: `/listing/${type}`,
  };
}

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
    key: `category-${category.type}`,
    label: category.type,
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

function viewListingsPage(vnode: m.Vnode<ListingsPageAttrs>): m.Children {
  const { visible, services } = vnode.attrs;

  const categories = services.readListings().map(toCategoryDef);
  const $albums = categories.flatMap(drawCategoryAlbum.bind(null, services));

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
