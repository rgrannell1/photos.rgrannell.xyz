import m from "mithril";
import { navigate } from "../commons/events.ts";

type SidebarItemAttrs = {
  name: string;
  route: string;
};

type SidebarAttrs = {
  visible: boolean;
};

/*
 * Map the current route to the sidebar entry it belongs under, so singular
 * detail routes (/album/:id, /photo/:id, /listing/:type) still light up their
 * section in the sidebar.
 */
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

/*
 * Defines each item in the sidebar
 */
function SidebarItem() {
  return {
    view(vnode: m.Vnode<SidebarItemAttrs>) {
      const { name, route } = vnode.attrs;
      const isActive = resolveSidebarRoute(m.route.get() ?? "") === route;

      return m("li", {
        class: isActive ? "sidebar-item sidebar-item--active" : "sidebar-item",
        onclick: navigate(route),
      }, name);
    },
  };
}

/*
 * Defines the app sidebar
 */
export function Sidebar() {
  function classes(visible: boolean) {
    const cls = ["photo-sidebar"];
    if (visible) {
      cls.push("sidebar-visible");
    }
    return cls.join(" ");
  }

  return {
    view(vnode: m.Vnode<SidebarAttrs>) {
      return m("aside", { class: classes(vnode.attrs.visible) }, [
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
    },
  };
}
