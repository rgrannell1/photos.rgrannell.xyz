import m from "mithril";
import { AlbumStats } from "../components/album-stats.ts";
import { Album } from "../types.ts";
import { Photos } from "../services/photos.ts";
import { PhotoAlbumMetadata } from "../components/photo-album-metadata.ts";
import { PhotoAlbum } from "../components/photo-album.ts";
import { Windows } from "../services/window.ts";
import { CountryLink } from "../components/place-links.ts";
import { block, broadcast } from "../events.ts";
import { albumYear } from "../services/albums.ts";
import { asUrn } from "@rgrannell1/tribbledb";

type AlbumsListAttrs = {
  albums: Album[];
};

function onAlbumClick(id: string, title: string, event: Event) {
  const parsed = asUrn(id);

  broadcast("navigate", { route: `/album/${parsed.id}`, title });
  block(event);
}

function drawAlbum(state: { year: number }, album: Album, idx: number) {
  const loading = Photos.loadingMode(idx);

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

  const $countryLinks = album.countries.map((country) => {
    return m(CountryLink, {
      country,
      key: `album-country-${album.id}-${country.id}`,
      mode: "flag",
    });
  });

  const $md = m(PhotoAlbumMetadata, {
    title: album.name,
    minDate: album.minDate,
    maxDate: album.maxDate,
    count: album.photosCount,
    countryLinks: $countryLinks,
  });

  const $album = m(PhotoAlbum, {
    imageUrl: album.thumbnailUrl,
    thumbnailUrl: album.thumbnailUrl,
    thumbnailDataUrl: Photos.encodeBitmapDataURL(album.mosaicColours),
    loading: loading,
    minDate: album.minDate,
    onclick: onAlbumClick.bind(null, album.id, album.name),
  });

  $albumComponents.push(
    m("div", {
      key: `album-${album.id}`
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
  const $albumComponents: m.Vnode<
    unknown,
    unknown
  >[] = [];

  let initted = false;

  return {
    oninit(vnode: m.Vnode<AlbumsListAttrs>) {
      console.log("hello");
      if (initted) {
        return;
      }
      initted = true;

      const state = { year: 2005 };
      const { albums } = vnode.attrs;

      for (let idx = 0; idx < albums.length; idx++) {
        $albumComponents.push(...drawAlbum(state, albums[idx], idx));
      }

      m.redraw();
    },
    view() {
      return m("section.album-container", $albumComponents);
    },
  };
}

type AlbumsPageState = {
  albums: Album[];
};

/* */
export function AlbumsPage() {
  return {
    oninit() {
      Windows.setTitle("Albums - photos");
    },
    view(vnode: m.Vnode<AlbumsPageState>) {
      const { albums } = vnode.attrs;

      const $md = m("section.album-metadata", [
        m("h1.albums-header", "Albums"),
        m(AlbumStats),
      ]);

      return m("div", [
        $md,
        //m(YearCursor),
        m(AlbumsList, { albums }),
      ]);
    },
  };
}
