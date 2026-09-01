/* Render the shared class and element contract for thing links. */

import m from "mithril";
import { routeLinkAttrs } from "../../../services/browser/routes.ts";

/** Build the shared and type-specific class names for a thing link. */
function thingLinkClasses(type: string): string {
  const classes = ["thing-link", `${type}-link`];
  return classes.join(" ");
}

/** Draw a thing link element while applying the shared class contract. */
export function drawThingLink(
  tag: string,
  type: string,
  attrs: Record<string, unknown>,
  label: m.Children,
): m.Children {
  const className = thingLinkClasses(type);
  const linkAttrs = { ...attrs, class: className };
  return m(tag, linkAttrs, label);
}

/** Draw a thing link through the Mithril router. */
export function drawThingRouteLink(
  type: string,
  route: string,
  label: m.Children,
): m.Children {
  const className = thingLinkClasses(type);
  const attrs = routeLinkAttrs(route, { class: className });
  return m(m.route.Link, attrs, label);
}
