/* Support sidebar operations. */

import m from "mithril";
import { routeLinkAttrs } from "../../../services/browser/routes.ts";
import type { SidebarItemAttrs } from "./sidebar.ts";
import { resolveSidebarRoute } from "./routes.ts";
import { drawUtilitySidebarItems } from "./layout.ts";

/** Selects the sidebar item class for its active state. */
export function selectSidebarItemClass(isActive: boolean): string {
  return isActive ? "sidebar-item sidebar-item--active" : "sidebar-item";
}

/** Builds navigation attributes for a sidebar item. */
export function buildSidebarItemAttrs(
  route: string,
  isActive: boolean,
): { class: string; route: string } {
  const className = selectSidebarItemClass(isActive);
  return { class: className, route };
}

/** Reports whether a route matches the current sidebar route. */
export function isSidebarItemActive(route: string): boolean {
  const currentRoute = m.route.get() ?? "";
  return resolveSidebarRoute(currentRoute) === route;
}

/** Renders one sidebar navigation item. */
export function viewSidebarItem(vnode: m.Vnode<SidebarItemAttrs>): m.Children {
  const { name, route } = vnode.attrs;
  const isActive = isSidebarItemActive(route);
  const { class: className } = buildSidebarItemAttrs(route, isActive);
  const linkAttrs = routeLinkAttrs(route);
  const $link = m(m.route.Link, linkAttrs, name);

  return m("li", { class: className }, $link);
}

/** Defines a sidebar item component. */
export function SidebarItem(): m.Component<SidebarItemAttrs> {
  return { view: viewSidebarItem };
}

/** Selects the sidebar classes for its visible state. */
export function selectSidebarClasses(visible: boolean): string {
  const cls = ["photo-sidebar"];
  if (visible) {
    cls.push("sidebar-visible");
  }
  const className = cls.join(" ");
  return className;
}

/** Draws one named sidebar route. */
export function drawSidebarItem(
  name: string,
  route: string,
): m.Vnode<SidebarItemAttrs> {
  const attrs = { name, route };
  return m(SidebarItem, attrs);
}

/** Draws the sidebar routes for media collections. */
export function drawMediaSidebarItems(): m.Vnode<SidebarItemAttrs>[] {
  const $photos = drawSidebarItem("PHOTOS", "/photos");
  const $videos = drawSidebarItem("VIDEOS", "/videos");
  const $albums = drawSidebarItem("ALBUMS", "/albums");
  return [$photos, $videos, $albums];
}

/** Draws listing, life-list, and utility sidebar routes. */
export function drawPageSidebarItems(): m.Vnode<SidebarItemAttrs>[] {
  const $listings = drawSidebarItem("LISTINGS", "/listings");
  const $lifeList = drawSidebarItem("LIFE LIST", "/life-list");
  const primaryItems = [$listings, $lifeList];
  return [...primaryItems, ...drawUtilitySidebarItems()];
}

/** Draws all sidebar routes in display order. */
export function drawSidebarItems(): m.Vnode<SidebarItemAttrs>[] {
  const $mediaItems = drawMediaSidebarItems();
  const $pageItems = drawPageSidebarItems();
  return [...$mediaItems, ...$pageItems];
}
