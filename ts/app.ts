import m from "mithril";
import { Header } from "./components/header.ts";
import { loadState } from "./state.ts";
import { Sidebar } from "./components/sidebar.ts";
import { AlbumsPage } from "./pages/albums.ts";
import { readAlbums } from "./services/albums.ts";
import { AboutPage } from "./pages/about.ts";

const state = await loadState();
type AppAttrs = {};

export function AlbumsApp(): m.Component<AppAttrs> {
  return {
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
