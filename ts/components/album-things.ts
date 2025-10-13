
import m from "mithril";

type AlbumThingsAttrs = {
  things: any[]
}

export function AlbumThings() {
  return {
    view(vnode: m.Vnode<AlbumThingsAttrs>) {
      const { things } = vnode.attrs;
      const { locations, subjects } = things;

      // TODO
    }
  }
}