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

function drawAlbumTitle(title: string): m.Children {
  const attrs = { "data-testid": "album-title" };
  return m("p.photo-album-title", attrs, title);
}

function drawAlbumDate(dateRangeText: string): m.Children {
  const time = m("time", { "data-testid": "album-date" }, dateRangeText);
  return m("p.photo-album-date", time);
}

function drawAlbumCount(count: number): m.Children {
  const noun = count === 1 ? "photo" : "photos";
  const attrs = { "data-testid": "album-count" };
  return m("p.photo-album-count", attrs, `${count} ${noun}`);
}

function drawAlbumCountries(countryLinks: m.Children): m.Children {
  const attrs = { "data-testid": "album-countries" };
  return m("p.photo-album-countries", attrs, countryLinks);
}

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
  const titleNode = drawAlbumTitle(title);
  const dateNode = drawAlbumDate(dateRangeText);
  const countNode = drawAlbumCount(count);
  const countriesNode = drawAlbumCountries(countryLinks);
  const inlineMetadata = m("div.photo-metadata-inline", [
    countNode,
    countriesNode,
  ]);

  return m("div.photo-album-metadata", [
    titleNode,
    dateNode,
    inlineMetadata,
  ]);
}

export function PhotoAlbumMetadata() {
  return { view: viewPhotoAlbumMetadata };
}
