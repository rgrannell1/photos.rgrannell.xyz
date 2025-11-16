import m from "mithril";
import { navigate } from "../commons/events.ts";

type AlbumButtonAttrs = {
  id: string;
};

/*
 * Links back to the last album page
 */
export function AlbumButton() {
  return {
    view(vnode: m.Vnode<AlbumButtonAttrs>) {
      const { id } = vnode.attrs;

      return m("a", {
        href: `#/album/${id}`,
        onclick: () => navigate(`/album/${id}`),
      }, "[album]");
    },
  };
}
