import m from "mithril";
import { routeLinkAttrs } from "../../../services/browser/routes.ts";

/** Renders a route-aware link to the albums page. */
function viewAlbumsButton(): m.Children {
  const linkAttrs = routeLinkAttrs("/albums");
  return m(m.route.Link, linkAttrs, "[albums]");
}

/** Creates the albums navigation control. */
export function AlbumsButton(): m.Component {
  return { view: viewAlbumsButton };
}
