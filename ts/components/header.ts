import m from "mithril";
import { broadcast, navigate } from "../commons/events.ts";

type HeaderAttrs = {};

/*
 * The sidebar menu
 */
function BurgerMenu() {
  const onclick = (_: Event) => {
    broadcast("click_burger_menu", {});
  };

  return {
    view() {
      return m("a", { onclick }, m("span.burger", "Ξ"));
    },
  };
}

/*
 * The link to the homepage
 */
function HeaderBrandText() {
  const BRAND_TEXT = "photos";

  return {
    view() {
      return m("a", {
        href: "#/",
        onclick: navigate("/"),
      }, m("span.brand", BRAND_TEXT));
    },
  };
}

/* */
export function Header() {
  return {
    view(vnode: m.Vnode<HeaderAttrs>) {
      return m("nav.header", { role: "navigation" }, [
        m("ul", {
          style:
            "display: flex; align-items: baseline; padding-left: 0px !important;",
        }, [
          m("li.header-item", {}, m(BurgerMenu())),
          m("li.header-item", {}, m(HeaderBrandText())),
        ]),
      ]);
    },
  };
}
