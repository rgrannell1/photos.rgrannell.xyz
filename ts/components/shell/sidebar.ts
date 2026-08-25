import m from "mithril";
import { navigate } from "../../services/browser/events.ts";

type SidebarItemAttrs = {
  name: string;
  route: string;
};

type SidebarAttrs = {
  visible: boolean;
};

/* Map a detail route (/album/:id, /photo/:id) to the sidebar entry it sits under. */
function resolveSidebarRoute(current: string): string {
  if (current.startsWith("/album")) return "/albums";
  if (current.startsWith("/photo")) return "/photos";
  if (current.startsWith("/video")) return "/videos";
  if (current.startsWith("/listing")) return "/listings";
  if (current.startsWith("/life-list")) return "/life-list";
  if (current.startsWith("/map")) return "/map";
  if (current.startsWith("/about")) return "/about";
  return current;
}

function viewSidebarItem(vnode: m.Vnode<SidebarItemAttrs>): m.Children {
  const { name, route } = vnode.attrs;
  const isActive = resolveSidebarRoute(m.route.get() ?? "") === route;

  return m("li", {
    class: isActive ? "sidebar-item sidebar-item--active" : "sidebar-item",
    onclick: navigate(route),
  }, name);
}

function SidebarItem() {
  return { view: viewSidebarItem };
}

function sidebarClasses(visible: boolean): string {
  const cls = ["photo-sidebar"];
  if (visible) {
    cls.push("sidebar-visible");
  }
  return cls.join(" ");
}

function viewSidebar(vnode: m.Vnode<SidebarAttrs>): m.Children {
  return m("aside", { class: sidebarClasses(vnode.attrs.visible) }, [
    m("nav", [
      m("ul", [
        m(SidebarItem, { name: "PHOTOS", route: "/photos" }),
        m(SidebarItem, { name: "VIDEOS", route: "/videos" }),
        m(SidebarItem, { name: "ALBUMS", route: "/albums" }),
        m(SidebarItem, { name: "LISTINGS", route: "/listings" }),
        m(SidebarItem, { name: "LIFE LIST", route: "/life-list" }),
        m(SidebarItem, { name: "MAP", route: "/map" }),
        m(SidebarItem, { name: "ABOUT", route: "/about" }),
      ]),
    ]),
  ]);
}

export function Sidebar() {
  return { view: viewSidebar };
}
