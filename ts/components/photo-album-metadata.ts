import m from "mithril";
import { isSmallerThan } from "../services/window.ts";
import type { CountryLinkAttrs } from "./place-links.ts";
import { SMALL_DEVICE_WIDTH } from "../constants.ts";
import type { Services } from "../types.ts";

export type PhotoAlbumMetadataAttrs = {
  title: string;
  minDate?: number;
  maxDate?: number;
  count: number;
  countryLinks: m.Vnode<CountryLinkAttrs, unknown>[];
  dateRange: string;
  shortDateRange: string;
};

/* */
export function PhotoAlbumMetadata() {
  return {
    view(vnode: m.Vnode<PhotoAlbumMetadataAttrs>) {
      const { title, minDate, maxDate, count, countryLinks, dateRange, shortDateRange } = vnode.attrs;
      const text = count === 1 ? "photo" : "photos";
      const isSmall = isSmallerThan(SMALL_DEVICE_WIDTH);

      const dateRangeText = isSmall
        ? shortDateRange
        : dateRange;

      return m("div.photo-album-metadata", [
        m("p.photo-album-title", title),
        m("p.photo-album-date", [
          m("time", dateRangeText),
        ]),
        m("div.photo-metadata-inline", [
          m("p.photo-album-count", `${count} ${text}`),
          m("p.photo-album-countries", countryLinks),
        ]),
      ]);
    },
  };
}
