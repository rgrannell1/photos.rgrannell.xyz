import m from "mithril";
import { navigate } from "../commons/events.ts";

/*
 * Links back to the albums page
 */
export function AlbumsButton() {
  return {
    view() {
      return m(
        "a",
        { href: "/albums", onclick: navigate(`/albums`) },
        "[albums]",
      );
    },
  };
}
