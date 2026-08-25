import m from "mithril";
import { broadcast, navigate } from "../../app/events.ts";

const BRAND_TEXT = "photos";

function clickBurgerMenu(): void {
  broadcast("click_burger_menu", {});
}

function viewBurgerMenu(): m.Children {
  return m("a", { onclick: clickBurgerMenu }, m("span.burger", "Ξ"));
}

function BurgerMenu() {
  return { view: viewBurgerMenu };
}

function viewHeaderBrandText(): m.Children {
  return m("a", {
    href: "#/",
    // distinguishes this link from the sidebar "photos" link for
    // assistive technology
    "aria-label": "photos — home",
    onclick: navigate("/"),
  }, m("span.brand", BRAND_TEXT));
}

function HeaderBrandText() {
  return { view: viewHeaderBrandText };
}

function viewHeader(): m.Children {
  return m("nav.header", { role: "navigation" }, [
    m("ul", {
      style:
        "display: flex; align-items: baseline; padding-left: 0px !important;",
    }, [
      m("li.header-item", {}, m(BurgerMenu)),
      m("li.header-item", {}, m(HeaderBrandText)),
    ]),
  ]);
}

export function Header() {
  return { view: viewHeader };
}
