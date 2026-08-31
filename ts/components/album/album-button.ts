import m from "mithril";
import {
  albumRoute,
  onAlbumClick,
} from "../../services/browser/album-navigation.ts";

type AlbumButtonAttrs = {
  id: string;
  hidden: boolean;
};

/** Draw a browser-compatible link to an album. */
function drawAlbumButton(id: string): m.Children {
  const href = albumRoute(id);
  const onclick = onAlbumClick.bind(null, id);
  const linkAttrs = { href, onclick };
  const link = m("a", linkAttrs, "[album]");
  return link;
}

/** Draw the album link unless the caller hides it. */
function viewAlbumButton(vnode: m.Vnode<AlbumButtonAttrs>): m.Children {
  const { id, hidden } = vnode.attrs;

  if (hidden) {
    return null;
  }

  return drawAlbumButton(id);
}

/** Create the optional album link component. */
export function AlbumButton() {
  return { view: viewAlbumButton };
}
