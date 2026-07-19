/*
 * One album card: the album cover image plus its metadata block.
 */

import m from "mithril";
import type { Album, Country } from "../../types.ts";
import { PhotoAlbum } from "./photo-album.ts";
import { PhotoAlbumMetadata } from "./photo-album-metadata.ts";
import { countryFlagLinks } from "../thing/place-links.ts";
import { encodeBitmapDataURL } from "../../services/photos.ts";
import { albumRoute, onAlbumClick } from "../../commons/album-nav.ts";

type AlbumCardAttrs = {
  album: Album;
  countries: Country[];
  loading: "eager" | "lazy";
  trip: string | undefined;
  child?: m.Children;
  containerAttrs?: m.Attributes;
};

/* */
export function AlbumCard() {
  return {
    view(vnode: m.Vnode<AlbumCardAttrs>) {
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
        href: albumRoute(album.id),
        thumbnailUrl: album.thumbnailUrl,
        thumbnailDataUrl: encodeBitmapDataURL(album.mosaic),
        loading,
        minDate: album.minDate,
        onclick: onAlbumClick.bind(null, album.id, album.name),
        child,
      });

      return m("div", containerAttrs ?? {}, [$album, $md]);
    },
  };
}
