import m from "mithril";
import { one } from "../../commons/arrays.ts";
import { navigate } from "../../commons/events.ts";
import { KnownTypes } from "../../constants/data.ts";
import { getTribbleDB } from "../../semantic/data.ts";

type AlbumButtonAttrs = {
  id: string;
};

/*
 * Mirror publishes hidden "true" for albums with no album page (the
 * miscellaneous album); never link to those.
 */
function isHiddenAlbum(id: string): boolean {
  const album = getTribbleDB().search({
    source: { type: KnownTypes.ALBUM, id },
  }).firstObject();

  return one(album?.hidden) === "true";
}

function viewAlbumButton(vnode: m.Vnode<AlbumButtonAttrs>): m.Children {
  const { id } = vnode.attrs;

  if (isHiddenAlbum(id)) {
    return null;
  }

  return m("a", {
    href: `#/album/${id}`,
    onclick: navigate(`/album/${id}`),
  }, "[album]");
}

export function AlbumButton() {
  return { view: viewAlbumButton };
}
