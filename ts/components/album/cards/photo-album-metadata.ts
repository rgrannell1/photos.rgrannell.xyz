import m from "mithril";
import { isSmallerThan } from "../../../services/browser/window.ts";
import type { CountryLinkAttrs } from "../../thing/references/country-link.ts";
import { SMALL_DEVICE_WIDTH } from "../../../constants/layout.ts";

export type PhotoAlbumMetadataAttrs = {
  title: string;
  minDate?: number;
  maxDate?: number;
  count: number;
  countryLinks: m.Vnode<CountryLinkAttrs, unknown>[];
  dateRange: string;
  shortDateRange: string;
};

/** Draw the album title with its test selector. */
function drawAlbumTitle(title: string): m.Children {
  const attrs = { "data-testid": "album-title" };
  return m("p.photo-album-title", attrs, title);
}

/** Draw the album date range as time content. */
function drawAlbumDate(dateRangeText: string): m.Children {
  const $time = m("time", { "data-testid": "album-date" }, dateRangeText);
  return m("p.photo-album-date", $time);
}

/** Draw the photo count with the correct noun form. */
function drawAlbumCount(count: number): m.Children {
  const noun = count === 1 ? "photo" : "photos";
  const attrs = { "data-testid": "album-count" };
  return m("p.photo-album-count", attrs, `${count} ${noun}`);
}

/** Draw the album's country links. */
function drawAlbumCountries(countryLinks: m.Children): m.Children {
  const attrs = { "data-testid": "album-countries" };
  return m("p.photo-album-countries", attrs, countryLinks);
}

/** Draw album metadata with a compact date range on small screens. */
function viewPhotoAlbumMetadata(
  vnode: m.Vnode<PhotoAlbumMetadataAttrs>,
): m.Children {
  const {
    title,
    count,
    countryLinks,
    dateRange,
    shortDateRange,
  } = vnode.attrs;
  const isSmall = isSmallerThan(SMALL_DEVICE_WIDTH);
  const dateRangeText = isSmall ? shortDateRange : dateRange;
  const $titleNode = drawAlbumTitle(title);
  const $dateNode = drawAlbumDate(dateRangeText);
  const $countNode = drawAlbumCount(count);
  const $countriesNode = drawAlbumCountries(countryLinks);
  const $inlineMetadata = m("div.photo-metadata-inline", [
    $countNode,
    $countriesNode,
  ]);

  return m("div.photo-album-metadata", [
    $titleNode,
    $dateNode,
    $inlineMetadata,
  ]);
}

/** Create the album metadata component. */
export function PhotoAlbumMetadata(): m.Component<PhotoAlbumMetadataAttrs> {
  return { view: viewPhotoAlbumMetadata };
}
