import m from "mithril";
import { navigate } from "../../commons/events.ts";

function viewAlbumsButton(): m.Children {
  return m(
    "a",
    { href: "#/albums", onclick: navigate("/albums") },
    "[albums]",
  );
}

export function AlbumsButton() {
  return { view: viewAlbumsButton };
}
