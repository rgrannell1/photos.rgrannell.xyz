/* Support sidebar operations. */

import m from "mithril";
import type { SidebarAttrs, SidebarItemAttrs } from "./sidebar.ts";
import { drawSidebarItem, drawSidebarItems, selectSidebarClasses } from "./items.ts";

/** Draw the map and about utility links. */
export function drawUtilitySidebarItems(): m.Vnode<SidebarItemAttrs>[] {
  const map = drawSidebarItem("MAP", "/map");
  const about = drawSidebarItem("ABOUT", "/about");
  return [map, about];
}

/** Wrap sidebar items in the navigation list. */
export function drawSidebarLayout(
  items: m.Vnode<SidebarItemAttrs>[],
): m.Children {
  const $list = m("ul", items);
  return m("nav", [$list]);
}

/** Render the sidebar with classes for its visibility state. */
export function viewSidebar(vnode: m.Vnode<SidebarAttrs>): m.Children {
  const items = drawSidebarItems();
  const nav = drawSidebarLayout(items);
  const attrs = { class: selectSidebarClasses(vnode.attrs.visible) };
  return m("aside", attrs, [nav]);
}
