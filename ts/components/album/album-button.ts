import m from "mithril";
import { albumRoute } from "../../services/browser/album-navigation.ts";
import { routeLinkAttrs } from "../../services/browser/routes.ts";

type AlbumButtonAttrs = {
  id: string;
  hidden: boolean;
};

/** Draw a browser-compatible link to an album. */
function drawAlbumButton(id: string): m.Children {
  const href = albumRoute(id);
  const linkAttrs = routeLinkAttrs(href);
  const $link = m(m.route.Link, linkAttrs, "[album]");
  return $link;
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
