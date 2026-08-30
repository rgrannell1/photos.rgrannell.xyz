/* Support sidebar operations. */

import m from "mithril";
import { navigate } from "../../../services/browser/events.ts";
import type { SidebarItemAttrs } from "./sidebar.ts";
import { resolveSidebarRoute } from "./routes.ts";
import { drawUtilitySidebarItems } from "./layout.ts";

export function sidebarItemClass(isActive: boolean): string {
  return isActive ? "sidebar-item sidebar-item--active" : "sidebar-item";
}

export function readSidebarItemAttrs(route: string, isActive: boolean) {
  const className = sidebarItemClass(isActive);
  return { class: className, onclick: navigate(route) };
}

export function isSidebarItemActive(route: string): boolean {
  const currentRoute = m.route.get() ?? "";
  return resolveSidebarRoute(currentRoute) === route;
}

export function viewSidebarItem(vnode: m.Vnode<SidebarItemAttrs>): m.Children {
  const { name, route } = vnode.attrs;
  const isActive = isSidebarItemActive(route);
  const attrs = readSidebarItemAttrs(route, isActive);

  return m("li", attrs, name);
}

export function SidebarItem() {
  return { view: viewSidebarItem };
}

export function sidebarClasses(visible: boolean): string {
  const cls = ["photo-sidebar"];
  if (visible) {
    cls.push("sidebar-visible");
  }
  const className = cls.join(" ");
  return className;
}

export function drawSidebarItem(
  name: string,
  route: string,
): m.Vnode<SidebarItemAttrs> {
  const attrs = { name, route };
  return m(SidebarItem, attrs);
}

export function drawMediaSidebarItems(): m.Vnode<SidebarItemAttrs>[] {
  const photos = drawSidebarItem("PHOTOS", "/photos");
  const videos = drawSidebarItem("VIDEOS", "/videos");
  const albums = drawSidebarItem("ALBUMS", "/albums");
  return [photos, videos, albums];
}

export function drawPageSidebarItems(): m.Vnode<SidebarItemAttrs>[] {
  const listings = drawSidebarItem("LISTINGS", "/listings");
  const lifeList = drawSidebarItem("LIFE LIST", "/life-list");
  const primaryItems = [listings, lifeList];
  return [...primaryItems, ...drawUtilitySidebarItems()];
}

export function drawSidebarItems(): m.Vnode<SidebarItemAttrs>[] {
  const mediaItems = drawMediaSidebarItems();
  const pageItems = drawPageSidebarItems();
  return [...mediaItems, ...pageItems];
}
