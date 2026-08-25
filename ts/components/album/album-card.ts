/*
 * One album card: the album cover image plus its metadata block.
 */

import m from "mithril";
import type { Album, Country } from "../../types/domain.ts";
import { PhotoAlbum } from "./photo-album.ts";
import { PhotoAlbumMetadata } from "./photo-album-metadata.ts";
import { countryFlagLinks } from "../thing/country-link.ts";
import { thumbHashDataUrl } from "../../services/rendering/photos.ts";
import {
  albumRoute,
  onAlbumClick,
} from "../../services/browser/album-navigation.ts";
import type { Maybe } from "../../commons/maybe.ts";

type AlbumCardAttrs = {
  album: Album;
  countries: Country[];
  loading: "eager" | "lazy";
  trip: Maybe<string>;
  child?: m.Children;
  containerAttrs?: m.Attributes;
};

function viewAlbumCard(vnode: m.Vnode<AlbumCardAttrs>): m.Children {
  const { album, countries, loading, trip, child, containerAttrs } =
    vnode.attrs;

  const $md = m(PhotoAlbumMetadata, {
    title: album.name,
    minDate: album.minDate,
    maxDate: album.maxDate,
    count: album.photosCount,
    countryLinks: countryFlagLinks(album.id, countries),
    dateRange: album.dateRange,
    shortDateRange: album.shortDateRange,
  });

  const $album = m(PhotoAlbum, {
    trip,
    label: album.name,
    href: albumRoute(album.id),
    thumbnailUrl: album.thumbnailUrl,
    thumbnailDataUrl: thumbHashDataUrl(album.mosaic),
    loading,
    minDate: album.minDate,
    onclick: onAlbumClick.bind(null, album.id),
    child,
  });

  return m("div", containerAttrs ?? {}, [$album, $md]);
}

export function AlbumCard() {
  return { view: viewAlbumCard };
}
