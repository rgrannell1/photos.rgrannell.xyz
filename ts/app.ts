import m from "mithril";
import { Header } from "./components/header.ts";
import { loadState } from "./state.ts";
import { Sidebar } from "./components/sidebar.ts";
import { AlbumsPage } from "./pages/albums.ts";
import { readAlbums } from "./services/albums.ts";

const state = await loadState();
type AppAttrs = {};

export function App(): m.Component<AppAttrs> {
  return {
    view(vnode) {
      return m("body", [
        m("div", [
          m(Header, state),
          m("div", [
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
