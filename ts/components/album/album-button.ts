import m from "mithril";
import { navigate } from "../../commons/events.ts";
import { MISCELLANEOUS_ALBUM_ID } from "../../constants/data.ts";

type AlbumButtonAttrs = {
  id: string;
};

function viewAlbumButton(vnode: m.Vnode<AlbumButtonAttrs>): m.Children {
  const { id } = vnode.attrs;

  // the hidden miscellaneous album has no album page to link to
  if (id === MISCELLANEOUS_ALBUM_ID) {
    return null;
  }

  return m("a", {
    href: `#/album/${id}`,
    onclick: navigate(`/album/${id}`),
  }, "[album]");
}

/*
 * Links back to the last album page
 */
export function AlbumButton() {
  return { view: viewAlbumButton };
}
