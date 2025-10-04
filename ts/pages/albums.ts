import m from "mithril";
import { AlbumStats } from "../components/album-stats.ts";

type AlbumsPageState = {};

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
        m("section.album-container", []),
      ]);
    },
  };
}
