import m from "mithril";
import { navigate } from "../../commons/events.ts";

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
    href: `#/album/${id}`,
    onclick: navigate(`/album/${id}`),
  }, "[album]");
}

export function AlbumButton() {
  return { view: viewAlbumButton };
}
