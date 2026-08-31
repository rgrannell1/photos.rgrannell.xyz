/* Support albums operations. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { AlbumBanner } from "../../album/cards/album-banner.ts";
import { ShareButton } from "../../share-button.ts";
import { AlbumStats } from "../../album/cards/album-stats.ts";
import { thumbHashDataUrl } from "../../../services/rendering/year-scroll/photos.ts";
import { sharePhotoUrl } from "../../../services/browser/window.ts";
import { CountryFilter } from "../../album/controls/country-filter.ts";
import {
  ALBUMS_BANNER_MOSAIC,
  ALBUMS_BANNER_URL,
} from "../../../constants/banners.ts";
import { isNone, withDefault } from "../../../commons/collections/maybe.ts";
import type { AlbumsPageAttrs } from "./albums.ts";
import { AlbumsList, selectCountry } from "./grouping.ts";

/** Omits sharing unless the page has a selected trip. */
export function drawTripShare(attrs: AlbumsPageAttrs): m.Children {
  if (isNone(attrs.selectedTrip)) {
    return null;
  }
  const tripLabel = withDefault(attrs.tripName, "Trip");
  return m("section.trip-share", [
    m("h2.trip-title", tripLabel),
    m(ShareButton, {
      url: sharePhotoUrl(`trip/${asUrn(attrs.selectedTrip).id}`),
      name: tripLabel,
    }),
  ]);
}

/** Renders album statistics, country filtering, and optional trip sharing. */
export function drawAlbumsMetadata(attrs: AlbumsPageAttrs): m.Children {
  return m("section.album-metadata", [
    m(AlbumStats),
    m(CountryFilter, {
      countries: attrs.countries,
      selectedCountry: attrs.selectedCountry,
      onSelect: selectCountry,
    }),
    drawTripShare(attrs),
  ]);
}

/** Renders the albums banner, controls, and filtered album list. */
export function viewAlbumsPage(vnode: m.Vnode<AlbumsPageAttrs>): m.Children {
  const { attrs } = vnode;

  return m("main", {
    class: attrs.visible ? "page sidebar-visible" : "page",
  }, [
    m(AlbumBanner, {
      src: ALBUMS_BANNER_URL,
      alt: "Albums",
      thumbnailDataUrl: thumbHashDataUrl(ALBUMS_BANNER_MOSAIC),
    }),
    drawAlbumsMetadata(attrs),
    m(AlbumsList, {
      albums: attrs.albums,
      readAlbumCountries: attrs.readAlbumCountries,
      readYearRecap: attrs.readYearRecap,
      visible: attrs.visible,
      selectedCountry: attrs.selectedCountry,
      selectedTrip: attrs.selectedTrip,
    }),
  ]);
}
