import m from "mithril";
import { Header } from "./components/header.ts";
import { loadState } from "./state.ts";
import { Sidebar } from "./components/sidebar.ts";
import { AlbumsPage } from "./pages/albums.ts";
import { readAlbums, readAlbumsById } from "./services/albums.ts";
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
        m.route.set(`/album/${parsed.id}`, {
          id,
          title: pageTitle,
        });
      });
    },
    view(vnode) {
      return m("body", [
        m("div", [
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
    view() {
      if (!state.currentAlbum) {
        return m("p", "No album selected");
      }
      const album = readAlbumsById(state.data, state.currentAlbum)

      if (!album) {
        return m("p", "Album not found");
      }

      return m("body", [
        m("div", [
          m(Header, state),
          m("div.app-container", [
            m(Sidebar, { visible: state.sidebarVisible }),
            m(AlbumPage, {
              ...album
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
        m("div", [
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
        m("div", [
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
