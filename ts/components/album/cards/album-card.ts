/*
 * One album card: the album cover image plus its metadata block.
 */

import m from "mithril";
import type { Album, Country } from "../../../types/domain.ts";
import { PhotoAlbum, type PhotoAlbumAttrs } from "../photo-album.ts";
import { PhotoAlbumMetadata } from "./photo-album-metadata.ts";
import { countryFlagLinks } from "../../thing/references/country-link.ts";
import { thumbHashDataUrl } from "../../../services/rendering/year-scroll/photos.ts";
import {
  albumRoute,
  onAlbumClick,
} from "../../../services/browser/album-navigation.ts";
import type { Maybe } from "../../../commons/collections/maybe.ts";

export type AlbumCardAttrs = {
  album: Album;
  countries: Country[];
  loading: "eager" | "lazy";
  trip: Maybe<string>;
  child?: m.Children;
  containerAttrs?: m.Attributes;
};

/** Render an album metadata block with dates, count, and country links. */
function drawAlbumMetadata(album: Album, countries: Country[]): m.Children {
  const metadataAttrs = {
    title: album.name,
    minDate: album.minDate,
    maxDate: album.maxDate,
    count: album.photosCount,
    countryLinks: countryFlagLinks(album.id, countries),
    dateRange: album.dateRange,
    shortDateRange: album.shortDateRange,
  };
  return m(PhotoAlbumMetadata, metadataAttrs);
}

/** Render a linked album cover with its thumbnail placeholder. */
function drawAlbum(attrs: AlbumCardAttrs): m.Children {
  const { album, trip, loading, child } = attrs;
  const albumAttrs: PhotoAlbumAttrs = {
    trip,
    label: album.name,
    href: albumRoute(album.id),
    thumbnailUrl: album.thumbnailUrl,
    thumbnailDataUrl: thumbHashDataUrl(album.mosaic),
    loading,
    minDate: album.minDate,
    onclick: onAlbumClick.bind(null, album.id),
    child,
  };
  return m(PhotoAlbum, albumAttrs);
}

/** Render one album cover and its metadata inside optional container attributes. */
function viewAlbumCard(vnode: m.Vnode<AlbumCardAttrs>): m.Children {
  const { album, countries, containerAttrs } = vnode.attrs;
  const albumImage = drawAlbum(vnode.attrs);
  const albumMetadata = drawAlbumMetadata(album, countries);

  return m("div", containerAttrs ?? {}, [albumImage, albumMetadata]);
}

/** Create the component for one album card. */
export function AlbumCard() {
  return { view: viewAlbumCard };
}
