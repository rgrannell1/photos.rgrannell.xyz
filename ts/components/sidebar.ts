import m from "mithril";

type SidebarItemAttrs = {
  name: string;
  route: string;
};

/* */
function SidebarItem() {
  return {
    view(vnode: m.Vnode<SidebarItemAttrs>) {
      return m("li", {
        class: "sidebar-item",
        onclick() {
          m.route.set(vnode.attrs.route);
        },
      }, vnode.attrs.name);
    },
  };
}

type SidebarAttrs = {
  visible: boolean;
};

/* */
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
          ]),
        ]),
      ]);
    },
  };
}
