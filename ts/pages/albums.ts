import m from "mithril";
import { AlbumStats } from "../components/album-stats.ts";
import type { Album, Services } from "../types.ts";
import { encodeBitmapDataURL, loadingMode } from "../services/photos.ts";
import { PhotoAlbumMetadata } from "../components/photo-album-metadata.ts";
import { PhotoAlbum } from "../components/photo-album.ts";
import { setTitle } from "../services/window.ts";
import { CountryLink } from "../components/place-links.ts";
import { block, broadcast } from "../commons/events.ts";
import { albumYear } from "../services/albums.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { setify } from "../commons/sets.ts";

type AlbumsListAttrs = {
  albums: Album[];
  services: Services;
};

function onAlbumClick(id: string, title: string, event: Event) {
  const parsed = asUrn(id);

  broadcast("navigate", { route: `/album/${parsed.id}`, title });
  block(event);
}

function drawAlbum(
  state: { year: number },
  album: Album,
  idx: number,
  services: Services,
) {
  const loading = loadingMode(idx);

  const $albumComponents: m.Vnode<
    unknown,
    unknown
  >[] = [];

  // push year header if a new year
  if (state.year !== albumYear(album)) {
    state.year = albumYear(album);

    if (state.year !== new Date().getFullYear()) {
      const $h2 = m(
        "h2.album-year-heading",
        { key: `year-${state.year}` },
        state.year.toString(),
      );
      $albumComponents.push($h2);
    }
  }

  const $countryLinks = services.readCountries(setify(album.country)).map(
    (country) => {
      return m(CountryLink, {
        country,
        key: `album-country-${album.id}-${country.id}`,
        mode: "flag",
      });
    },
  );

  const $md = m(PhotoAlbumMetadata, {
    title: album.name,
    minDate: album.minDate,
    maxDate: album.maxDate,
    count: album.photosCount,
    countryLinks: $countryLinks,
  });

  const $album = m(PhotoAlbum, {
    trip: album.trip,
    imageUrl: album.thumbnailUrl,
    thumbnailUrl: album.thumbnailUrl,
    thumbnailDataUrl: encodeBitmapDataURL(album.mosaic),
    loading: loading,
    minDate: album.minDate,
    onclick: onAlbumClick.bind(null, album.id, album.name),
  });

  $albumComponents.push(
    m("div", {
      key: `album-${album.id}`,
    }, [
      $album,
      $md,
    ]),
  );

  return $albumComponents;
}

/*
 * Construct a list of albums
 */
function AlbumsList() {
  return {
    view(vnode: m.Vnode<AlbumsListAttrs>) {
      const state = { year: 2005 };
      const { albums, services } = vnode.attrs;

      const $albumComponents: m.Vnode<
        unknown,
        unknown
      >[] = [];

      // TODO this blocks render too long
      for (let idx = 0; idx < albums.length; idx++) {
        $albumComponents.push(...drawAlbum(state, albums[idx], idx, services));
      }

      return m("section.album-container", $albumComponents);
    },
  };
}

type AlbumsPageAttrs = {
  albums: Album[];
  services: Services;
};

/* */
export function AlbumsPage() {
  return {
    oninit() {
      setTitle("Albums - photos");
    },
    view(vnode: m.Vnode<AlbumsPageAttrs>) {
      const { albums, services } = vnode.attrs;

      const $md = m("section.album-metadata", [
        m("h1.albums-header", "Albums"),
        m(AlbumStats),
      ]);

      return m("div.page", [
        $md,
        //m(YearCursor),
        m(AlbumsList, { albums, services }),
      ]);
    },
  };
}
