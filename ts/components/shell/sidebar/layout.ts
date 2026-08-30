/* Support sidebar operations. */

import m from "mithril";
import type { SidebarAttrs, SidebarItemAttrs } from "./sidebar.ts";
import { drawSidebarItem, drawSidebarItems, sidebarClasses } from "./items.ts";

export function drawUtilitySidebarItems(): m.Vnode<SidebarItemAttrs>[] {
  const map = drawSidebarItem("MAP", "/map");
  const about = drawSidebarItem("ABOUT", "/about");
  return [map, about];
}

export function drawSidebarLayout(
  items: m.Vnode<SidebarItemAttrs>[],
): m.Children {
  const list = m("ul", items);
  return m("nav", [list]);
}

export function viewSidebar(vnode: m.Vnode<SidebarAttrs>): m.Children {
  const items = drawSidebarItems();
  const nav = drawSidebarLayout(items);
  const attrs = { class: sidebarClasses(vnode.attrs.visible) };
  return m("aside", attrs, [nav]);
}
