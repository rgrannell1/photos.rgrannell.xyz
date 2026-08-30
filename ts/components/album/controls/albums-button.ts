import m from "mithril";
import { navigate } from "../../../services/browser/events.ts";

function viewAlbumsButton(): m.Children {
  const onclick = navigate("/albums");
  const linkAttrs = { href: "#/albums", onclick };
  return m("a", linkAttrs, "[albums]");
}

export function AlbumsButton() {
  return { view: viewAlbumsButton };
}
