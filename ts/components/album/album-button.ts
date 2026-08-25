import m from "mithril";
import {
  albumRoute,
  onAlbumClick,
} from "../../services/browser/album-navigation.ts";

type AlbumButtonAttrs = {
  id: string;
  hidden: boolean;
};

function viewAlbumButton(vnode: m.Vnode<AlbumButtonAttrs>): m.Children {
  const { id, hidden } = vnode.attrs;

  if (hidden) {
    return null;
  }

  return m("a", {
    href: albumRoute(id),
    onclick: onAlbumClick.bind(null, id),
  }, "[album]");
}

export function AlbumButton() {
  return { view: viewAlbumButton };
}
