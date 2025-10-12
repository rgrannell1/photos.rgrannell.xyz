
import m from "mithril";
import { block, broadcast } from "../events";

/*
 * Links back to the albums page
 */
export function AlbumsButton() {
  const onclick = (event: Event) => {
    broadcast("navigate", {
      route: "/albums",
    });
    block(event);
  }

  return {
    view() {
      return m("a", { href: "/albums", onclick }, "[albums]");
    }
  }
}
