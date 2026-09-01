import m from "mithril";
import type { Photo as PhotoType } from "../../../types/domain.ts";
import { PhotoGrid } from "../../media/images/photo-grid.ts";
import { countLabel } from "../../../commons/strings.ts";

type PhotosPageAttrs = {
  total: number;
  getPhotos: (limit: number) => PhotoType[];
  visible: boolean;
};

/** Renders the primary heading for the photos page. */
function drawPhotosHeading(): m.Children {
  return m("h1", "Photos");
}

/** Renders the photos heading with its total count. */
function drawPhotosMetadata(countText: string): m.Children {
  return m("section.photos-metadata", [
    drawPhotosHeading(),
    m("p.photo-album-count", countText),
  ]);
}

/** Renders the year-grouped photo grid from page data. */
function drawPhotosGrid(attrs: PhotosPageAttrs): m.Children {
  return m(PhotoGrid, {
    total: attrs.total,
    getPhotos: attrs.getPhotos,
    groupByYear: true,
  });
}

/** Builds the ordered metadata and grid content for the photos page. */
function drawPhotosPageContent(
  attrs: PhotosPageAttrs,
  countText: string,
): m.Children[] {
  return [drawPhotosMetadata(countText), drawPhotosGrid(attrs)];
}

/** Selects the page class that reserves space for a visible sidebar. */
function selectPhotosPageClass(visible: boolean): string {
  return visible ? "page sidebar-visible" : "page";
}

/** Wraps photos content in the page's main landmark. */
function drawPhotosPage(className: string, content: m.Children[]): m.Children {
  return m("main", { class: className }, content);
}

/** Formats the total with the correct singular or plural photo label. */
function formatPhotosCountText(attrs: PhotosPageAttrs): string {
  return countLabel(attrs.total, "photo");
}

/** Renders the photos page from its count, source, and sidebar state. */
function viewPhotosPage(vnode: m.Vnode<PhotosPageAttrs>): m.Children {
  const countText = formatPhotosCountText(vnode.attrs);
  const $content = drawPhotosPageContent(vnode.attrs, countText);
  const className = selectPhotosPageClass(vnode.attrs.visible);

  return drawPhotosPage(className, $content);
}

/** Creates the Mithril photos page component. */
export function PhotosPage(): m.Component<PhotosPageAttrs> {
  return { view: viewPhotosPage };
}
