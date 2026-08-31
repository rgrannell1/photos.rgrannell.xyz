import m from "mithril";
import { navigate } from "../../../services/browser/events.ts";

/** Renders a route-aware link to the albums page. */
function viewAlbumsButton(): m.Children {
  const onclick = navigate("/albums");
  const linkAttrs = { href: "#/albums", onclick };
  return m("a", linkAttrs, "[albums]");
}

/** Creates the albums navigation control. */
export function AlbumsButton() {
  return { view: viewAlbumsButton };
}
