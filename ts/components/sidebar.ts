import m from "mithril";
import { navigate } from "../commons/events";

type SidebarItemAttrs = {
  name: string;
  route: string;
};

type SidebarAttrs = {
  visible: boolean;
};

/*
 * Defines each item in the sidebar
 */
function SidebarItem() {
  return {
    view(vnode: m.Vnode<SidebarItemAttrs>) {
      return m("li", {
        class: "sidebar-item",
        onclick: navigate(vnode.attrs.route),
      }, vnode.attrs.name);
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
            m(SidebarItem, { name: "ABOUT", route: "/about" }),
            m(SidebarItem, { name: "LISTINGS", route: "/listings" }),
          ]),
        ]),
      ]);
    },
  };
}
