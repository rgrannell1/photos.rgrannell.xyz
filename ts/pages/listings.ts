import m from "mithril";
import { navigate } from "../commons/events.ts";
import type { Services } from "../types.ts";
import { PhotoAlbum } from "../components/photo-album.ts";
import { encodeBitmapDataURL, loadingMode } from "../services/photos.ts";

type CategoryDef = {
  type: string;
  label: string;
  route: string;
};

const CATEGORIES: CategoryDef[] = [
  { type: "place", label: "Places", route: "/listing/place" },
  { type: "country", label: "Countries", route: "/listing/country" },
  { type: "bird", label: "Birds", route: "/listing/bird" },
  { type: "mammal", label: "Mammals", route: "/listing/mammal" },
  { type: "reptile", label: "Reptiles", route: "/listing/reptile" },
  { type: "amphibian", label: "Amphibians", route: "/listing/amphibian" },
  { type: "insect", label: "Insects", route: "/listing/insect" },
  { type: "fish", label: "Fish", route: "/listing/fish" },
  { type: "plane", label: "Planes", route: "/listing/plane" },
  { type: "train", label: "Trains", route: "/listing/train" },
  { type: "car", label: "Cars", route: "/listing/car" },
];

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

  return [m(PhotoAlbum, {
    imageUrl: cover.fullImage,
    thumbnailUrl: cover.thumbnailUrl,
    thumbnailDataUrl: encodeBitmapDataURL(cover.mosaicColours),
    loading: loadingMode(idx),
    trip: undefined,
    child: m("p.album-title", category.label),
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
          m("h1.albums-header", "Listings"),
          m("p", "Collections of all places, countries, and animals"),
        ]),
        m("section.album-container", $albums),
      ]);
    },
  };
}
