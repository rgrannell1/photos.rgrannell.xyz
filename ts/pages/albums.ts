import m from "mithril";
import { AlbumStats } from "../components/album-stats.ts";
import { YearCursor } from "../components/year-cursor.ts";
import { Album } from "../types.ts";
import { Photos } from "../services/photos.ts";

type AlbumsListAttrs = {
  albums: Album[]
};

function AlbumsList() {
  const albumComponents: m.Vnode[] = [];

  function albumYear(album: Album) {
    return new Date(album.minDate).getFullYear();
  }

  function yearHeader() {

  }

  return {
    view(vnode: m.Vnode<AlbumsListAttrs>) {
      let year = 2000

      const { albums } = vnode.attrs;

      for (let idx = 0; idx < albums.length; idx++) {
        const album = albums[idx];
        const loading = Photos.loadingMode(idx);

        if (year !== albumYear(album)) {
          year = albumYear(album);
          albumComponents.push(m("h2.album-year-header", year.toString()));
        }

        // TODO;' make metadata and albvum components
      }

      return m("section.album-container", albumComponents)
    }
  }
}

type AlbumsPageState = {
  albums: Album[]
};

export function AlbumsPage() {
  return {
    oninit() {
      document.title = "Albums - photos";
    },
    view(vnode: m.Vnode<AlbumsPageState>) {
      const $md = m("section.album-metadata", [
        m("h1.albums-header", "Albums"),
        m(AlbumStats),
      ]);

      return m("div", [
        $md,
        m("section.album-container", [
          m("h1.albums-header", "Albums"),
          m(YearCursor),
          m(AlbumsList, { albums: vnode.attrs.albums })
        ]),
      ]);
    },
  };
}
