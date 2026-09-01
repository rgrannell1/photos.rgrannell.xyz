/* Build internal links and route changes with shared shell behaviour. */

import m from "mithril";
import { ApplicationEvent, broadcast } from "./events.ts";

/** Closes the sidebar when an internal link starts navigation. */
export function closeSidebar(): void {
  broadcast(ApplicationEvent.CloseSidebar, {});
}

/** Builds attributes for a Mithril route link. */
export function routeLinkAttrs(
  href: string,
  attrs: Omit<m.RouteLinkAttrs, "href"> = {},
): m.RouteLinkAttrs {
  return { ...attrs, href, onclick: closeSidebar };
}

/** Changes a route from a control that is not a link. */
export function setRoute(route: string): void {
  closeSidebar();
  m.route.set(route);
}
