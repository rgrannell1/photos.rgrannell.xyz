import m from "mithril";
import { AlbumStats } from "../components/album-stats.ts";
import { YearCursor } from "../components/year-cursor.ts";
import { Album } from "../types.ts";
import { Photos } from "../services/photos.ts";
import {
  PhotoAlbumMetadata,
  PhotoAlbumMetadataAttrs,
} from "../components/photo-album-metadata.ts";
import { PhotoAlbum, PhotoAlbumAttrs } from "../components/photo-album.ts";
import { Windows } from "../services/window.ts";

type AlbumsListAttrs = {
  albums: Album[];
};

function AlbumsList() {
  const albumComponents: m.Vnode<
    unknown
  >[] = [];

  function albumYear(album: Album) {
    return new Date(album.minDate).getFullYear();
  }

  return {
    view(vnode: m.Vnode<AlbumsListAttrs>) {
      let year = 2000;
      const { albums } = vnode.attrs;

      for (let idx = 0; idx < albums.length; idx++) {
        const album = albums[idx];
        const loading = Photos.loadingMode(idx);

        // push year header if a new year
        if (year !== albumYear(album)) {
          year = albumYear(album);

          const $h2 = m("h2.album-year-header", year.toString());
          albumComponents.push($h2);
        }

        const $md = m(PhotoAlbumMetadata, {
          title: album.name,
          minDate: album.minDate,
          maxDate: album.maxDate,
          count: album.photosCount,
          countryLinks: [],
        });

        const $album = m(PhotoAlbum, {
          imageUrl: album.thumbnailUrl,
          thumbnailUrl: album.thumbnailUrl,
          thumbnailDataUrl: Photos.encodeBitmapDataURL(album.mosaicColours),
          loading: loading,
          onclick: () => {},
        });

        albumComponents.push($md);
        albumComponents.push($album);
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
      const $md = m("section.album-metadata", [
        m("h1.albums-header", "Albums"),
        m(AlbumStats),
      ]);

      const $albumContainer = m("section.album-container", [
        m(YearCursor),
        m(AlbumsList, { albums: vnode.attrs.albums }),
      ]);

      return m("div", [
        $md,
        $albumContainer,
      ]);
    },
  };
}
