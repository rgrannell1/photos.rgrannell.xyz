import m from "mithril";
import { Header } from "./components/header.ts";
import { loadState } from "./state.ts";
import { Sidebar } from "./components/sidebar.ts";
import { AlbumsPage } from "./pages/albums.ts";
import {
  readAlbumById,
  readAlbumPhotosById,
  readAlbums,
  readAlbumsById,
  readAlbumVideosById,
} from "./services/albums.ts";
import { AboutPage } from "./pages/about.ts";
import { VideosPage } from "./pages/videos.ts";
import { readVideos } from "./services/videos.ts";
import { listen } from "./events.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { AlbumPage } from "./pages/album.ts";
import { urn } from "./semantic/urn.ts";

const state = await loadState();
type AppAttrs = {};

export function AlbumsApp(): m.Component<AppAttrs> {
  return {
    oninit() {
      listen("click_album", (event) => {
        const { id, title } = (event as CustomEvent).detail;

        const parsed = asUrn(id);
        const pageTitle = `Album - ${title}`;

        state.currentAlbum = id;
        m.route.set(`/album/${parsed.id}`, undefined, {
          title: pageTitle,
        });
      });
    },
    view(vnode) {
      return m("body", [
        m("div.photos-app", [
          m(Header, state),
          m("div.app-container", [
            m(Sidebar, { visible: state.sidebarVisible }),
            m(AlbumsPage, {
              albums: readAlbums(state.data),
            }),
          ]),
        ]),
      ]);
    },
  };
}

export function AlbumApp(): m.Component<AppAttrs> {
  return {
    oninit() {
      const id = m.route.param("id");
      state.currentAlbum = `urn:ró:album:${id}`;
    },
    view() {
      if (!state.currentAlbum) {
        return m("p", "No album selected");
      }
      const album = readAlbumById(state.data, state.currentAlbum);
      const photos = readAlbumPhotosById(state.data, state.currentAlbum);
      const videos = readAlbumVideosById(state.data, state.currentAlbum);

      if (!album) {
        return m("p", "Album not found");
      }

      return m("body", [
        m("div.photos-app", [
          m(Header, state),
          m("div.app-container", [
            m(Sidebar, { visible: state.sidebarVisible }),
            m(AlbumPage, {
              ...album,
              photos,
              videos,
            }),
          ]),
        ]),
      ]);
    },
  };
}

export function AboutApp(): m.Component<AppAttrs> {
  return {
    view() {
      return m("body", [
        m("div.photos-app", [
          m(Header, state),
          m("div.app-container", [
            m(Sidebar, { visible: state.sidebarVisible }),
            m(AboutPage),
          ]),
        ]),
      ]);
    },
  };
}

export function VideosApp(): m.Component<AppAttrs> {
  return {
    view() {
      return m("body", [
        m("div.photos-app", [
          m(Header, state),
          m("div.app-container", [
            m(Sidebar, { visible: state.sidebarVisible }),
            m(VideosPage, {
              videos: readVideos(state.data),
            }),
          ]),
        ]),
      ]);
    },
  };
}

export function ThingApp(): m.Component<AppAttrs> {
  return {
    view() {
      return m("body", [
        m("div.photos-app", [
          m(Header, state),
          m("div.app-container", [
            m(Sidebar, { visible: state.sidebarVisible })
          ])
        ]),
      ])
    },
  };
}