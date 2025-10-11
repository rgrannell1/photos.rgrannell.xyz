
import m from "mithril";

export function AlbumsButton() {
  return {
    view() {
      return m("a", { href: "/albums" }, "[albums]");
    }
  }
}
