import m from "mithril";
import type { Thing } from "../types.ts";

type AlbumThingsAttrs = {
  locations: Thing[];
  subjects: Thing[];
};

/* */
export function AlbumThings() {
  return {
    view(vnode: m.Vnode<AlbumThingsAttrs>) {
      const { locations, subjects } = vnode.attrs;

      // TODO
    },
  };
}
