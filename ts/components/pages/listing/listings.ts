import m from "mithril";
import { navigate } from "../../../services/browser/events.ts";
import type { Photo } from "../../../types/domain.ts";
import { PhotoAlbum, type PhotoAlbumAttrs } from "../../album/photo-album.ts";
import {
  loadingMode,
  thumbHashDataUrl,
} from "../../../services/rendering/year-scroll/photos.ts";
import { NONE } from "../../../commons/collections/maybe.ts";

type CategoryDef = {
  type: string;
  label: string;
  route: string;
  cover: Photo;
};

function drawCategoryLabel(category: CategoryDef): m.Children {
  const attrs = {
    "data-testid": "listing-card-label",
    "data-listing-type": category.type,
  };
  const label = m("p.album-title", attrs, category.label);
  return label;
}

function readCategoryImageAttrs(
  category: CategoryDef,
  idx: number,
): Pick<
  PhotoAlbumAttrs,
  "imageUrl" | "thumbnailUrl" | "thumbnailDataUrl" | "loading"
> {
  const { cover } = category;
  const thumbnailDataUrl = thumbHashDataUrl(cover.mosaicColours);
  const loading = loadingMode(idx);
  return {
    imageUrl: cover.fullImage,
    thumbnailUrl: cover.thumbnailUrl,
    thumbnailDataUrl,
    loading,
  };
}

function readCategoryCardAttrs(
  category: CategoryDef,
):
  & Pick<PhotoAlbumAttrs, "label" | "trip" | "child" | "onclick">
  & m.Attributes {
  const key = `category-${category.type}`;
  const child = drawCategoryLabel(category);
  const onclick = navigate(category.route);
  return {
    key,
    label: category.type,
    trip: NONE,
    child,
    onclick,
  };
}

/*
 * Returns an empty array when the category has no cover photo.
 */
function drawCategoryAlbum(
  category: CategoryDef,
  idx: number,
): m.Children[] {
  const imageAttrs = readCategoryImageAttrs(category, idx);
  const cardAttrs = readCategoryCardAttrs(category);
  const attrs: PhotoAlbumAttrs & m.Attributes = { ...imageAttrs, ...cardAttrs };
  return [m(PhotoAlbum, attrs)];
}

type ListingsPageAttrs = {
  visible: boolean;
  categories: CategoryDef[];
};

function drawListingsMetadata(): m.Children {
  const heading = m(
    "h1.albums-header",
    { "data-testid": "listings-heading" },
    "Listings",
  );
  const description = m("p", "Collections of all places and animals");
  return m("section.album-metadata", [heading, description]);
}

function drawListingsGrid(albums: m.Children[]): m.Children {
  return m(
    "section.album-container",
    { "data-testid": "listings-grid" },
    albums,
  );
}

function drawListingsPageContent(albums: m.Children[]): m.Children[] {
  return [drawListingsMetadata(), drawListingsGrid(albums)];
}

function readListingsPageClass(visible: boolean): string {
  return visible ? "page sidebar-visible" : "page";
}

function drawListingsPage(className: string, albums: m.Children[]): m.Children {
  return m("main", { class: className }, drawListingsPageContent(albums));
}

function viewListingsPage(vnode: m.Vnode<ListingsPageAttrs>): m.Children {
  const { categories } = vnode.attrs;
  const $albums = categories.flatMap(drawCategoryAlbum);
  const className = readListingsPageClass(vnode.attrs.visible);

  return drawListingsPage(className, $albums);
}

export function ListingsPage() {
  return { view: viewListingsPage };
}
