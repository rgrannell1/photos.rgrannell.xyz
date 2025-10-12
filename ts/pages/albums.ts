import m, { Vnode } from "mithril";
import { AlbumStats } from "../components/album-stats.ts";
import { YearCursor } from "../components/year-cursor.ts";
import { Album } from "../types.ts";
import { Photos } from "../services/photos.ts";
import { PhotoAlbumMetadata } from "../components/photo-album-metadata.ts";
import { PhotoAlbum } from "../components/photo-album.ts";
import { Windows } from "../services/window.ts";
import { CountryLink } from "../components/country-link.ts";
import { block, broadcast } from "../events.ts";

type AlbumsListAttrs = {
  albums: Album[];
};

function AlbumsList() {
  function albumYear(album: Album) {
    return new Date(album.minDate).getFullYear();
  }

  function onAlbumClick(id: string, title: string, event: Event) {
    broadcast("click_album", { id, title });
    block(event);
  }

  return {
    view(vnode: m.Vnode<AlbumsListAttrs>) {
      const albumComponents: m.Vnode<
        unknown,
        unknown
      >[] = [];
      let year = 2005;
      const { albums } = vnode.attrs;

      for (let idx = 0; idx < albums.length; idx++) {
        const album = albums[idx];
        const loading = Photos.loadingMode(idx);

        // push year header if a new year
        if (year !== albumYear(album)) {
          year = albumYear(album);

          if (year !== new Date().getFullYear()) {
            const $h2 = m("h2.album-year-header", year.toString());
            albumComponents.push($h2);
          }
        }

        const $countryLinks = album.countries.map((country) => {
          return m(CountryLink, {
            ...country,
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

        albumComponents.push(m("div", [
          $album,
          $md
        ]));
      }

      return m("section.album-container", albumComponents);
    },
  };
}

type AlbumsPageState = {
  albums: Album[];
};

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
          m(AlbumsList, { albums })
      ]);
    },
  };
}
