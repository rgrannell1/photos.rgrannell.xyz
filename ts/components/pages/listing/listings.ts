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

/** Renders a category label with stable listing identifiers. */
function drawCategoryLabel(category: CategoryDef): m.Children {
  const attrs = {
    "data-testid": "listing-card-label",
    "data-listing-type": category.type,
  };
  const label = m("p.album-title", attrs, category.label);
  return label;
}

/** Builds the image, placeholder, and loading attributes for a category cover. */
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

/** Builds the identity and navigation attributes for a category card. */
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

/**
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

/** Renders the heading and description for the listings page. */
function drawListingsMetadata(): m.Children {
  const heading = m(
    "h1.albums-header",
    { "data-testid": "listings-heading" },
    "Listings",
  );
  const description = m("p", "Collections of all places and animals");
  return m("section.album-metadata", [heading, description]);
}

/** Renders category albums in the listings grid. */
function drawListingsGrid(albums: m.Children[]): m.Children {
  return m(
    "section.album-container",
    { "data-testid": "listings-grid" },
    albums,
  );
}

/** Orders the metadata and category grid within the page. */
function drawListingsPageContent(albums: m.Children[]): m.Children[] {
  return [drawListingsMetadata(), drawListingsGrid(albums)];
}

/** Adds the sidebar class when the sidebar is visible. */
function readListingsPageClass(visible: boolean): string {
  return visible ? "page sidebar-visible" : "page";
}

/** Renders the listings page with its resolved class and albums. */
function drawListingsPage(className: string, albums: m.Children[]): m.Children {
  return m("main", { class: className }, drawListingsPageContent(albums));
}

/** Resolves category cards and visibility for the listings page. */
function viewListingsPage(vnode: m.Vnode<ListingsPageAttrs>): m.Children {
  const { categories } = vnode.attrs;
  const $albums = categories.flatMap(drawCategoryAlbum);
  const className = readListingsPageClass(vnode.attrs.visible);

  return drawListingsPage(className, $albums);
}

/** Creates the listings page component. */
export function ListingsPage() {
  return { view: viewListingsPage };
}
