
import m from "mithril";

export function ThingAlbumMetadata() {
  return {
    view(vnode: m.Vnode<{ title: string }>) {
      const { title } = vnode.attrs;

      return m("div.photo-album-metadata", [
        m("p.photo-album-title", title),
      ]);
    }
  }
}