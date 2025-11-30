import m from "mithril";
import { isSmallerThan } from "../services/window.ts";
import * as Dates from "../services/dates.ts";
import type { CountryLinkAttrs } from "./place-links.ts";
import { SMALL_DEVICE_WIDTH } from "../constants.ts";

export type PhotoAlbumMetadataAttrs = {
  title: string;
  minDate?: number;
  maxDate?: number;
  count: number;
  countryLinks: m.Vnode<CountryLinkAttrs, unknown>[];
};

/* */
export function PhotoAlbumMetadata() {
  function dateRange(minDate?: number, maxDate?: number) {
    if (!minDate || !maxDate) {
      return "unknown date";
    }

    // very slow!
    const isSmall = isSmallerThan(SMALL_DEVICE_WIDTH);
    return Dates.dateRange(minDate, maxDate, isSmall);
  }

  return {
    view(vnode: m.Vnode<PhotoAlbumMetadataAttrs>) {
      const { title, minDate, maxDate, count, countryLinks } = vnode.attrs;
      const text = count === 1 ? "photo" : "photos";

      return m("div.photo-album-metadata", [
        m("p.photo-album-title", title),
        m("p.photo-album-date", [
          m("time", dateRange(minDate, maxDate)),
        ]),
        m("div.photo-metadata-inline", [
          m("p.photo-album-count", `${count} ${text}`),
          m("p.photo-album-countries", countryLinks),
        ]),
      ]);
    },
  };
}
