import m from "mithril";
import { broadcast } from "../commons/events.ts";

type HeaderAttrs = {
  darkMode: boolean;
};

/* */
function BurgerMenu() {
  const onclick = (_: Event) => {
    broadcast("click_burger_menu", {});
  };

  return {
    view() {
      return m("a", { href: "/", onclick }, m("span.burger", "Ξ"));
    },
  };
}

/* */
function HeaderBrandText() {
  const BRAND_TEXT = "photos";

  return {
    view() {
      return m("a", { href: "/" }, m("span.brand", BRAND_TEXT));
    },
  };
}

/* */
function RSSIcon() {
  const SVG_PATH = m("path", {
    fill: "#ff9132",
    d: "M 4.259,23.467c-2.35,0-4.259,1.917-4.259,4.252c0,2.349, 1.909,4.244, 4.259,4.244 c 2.358,0, 4.265-1.895, 4.265-4.244C 8.525,25.383, 6.618,23.467, 4.259,23.467zM 0.005,10.873l0,6.133 c 3.993,0, 7.749,1.562, 10.577,4.391c 2.825,2.822, 4.384,6.595, 4.384,10.603l 6.16,0 C 21.125,20.349, 11.648,10.873, 0.005,10.873zM 0.012,0l0,6.136 c 14.243,0, 25.836,11.604, 25.836,25.864L 32,32 C 32,14.36, 17.648,0, 0.012,0z",
  });

  return {
    view() {
      return m("a.rss", { title: "rss", href: "/manifest/atom-index.xml" }, [
        m("svg", {
          alt: "rss",
          width: "25px",
          height: "25px",
          viewBox: "0 0 32 32",
          style: "position: relative; top: 5px;",
        }, [
          SVG_PATH,
        ]),
      ]);
    },
  };
}

/* */
function ThemeSwitch() {
  return {
    view(vnode: m.Vnode<HeaderAttrs>) {
      const text = vnode.attrs.darkMode ? "☀️" : "🌙";

      return m(
        "a",
        {},
        m("span.brand.switch", {
          onclick: () => {
            broadcast("switch_theme", {});
          },
        }, text),
      );
    },
  };
}

/* */
export function Header() {
  return {
    view(vnode: m.Vnode<HeaderAttrs>) {
      return m("nav.header", { role: "navigation" }, [
        // TODO this is a bad fix to an unknown reversion which messed up header item placement
        m("ul", {style: 'display: ruby'}, [
          m("li.header-item", {}, m(BurgerMenu())),
          m("li.header-item", {}, m(HeaderBrandText())),
          m("li.rss-tag header-item", { style: "float: right" }, m(RSSIcon())),
          m(
            "li.header-item",
            { style: "float: right" },
            m(ThemeSwitch(), {
              darkMode: vnode.attrs.darkMode,
            }),
          ),
        ]),
      ]);
    },
  };
}
