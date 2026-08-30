import m from "mithril";
import { broadcast, navigate } from "../../services/browser/events.ts";

const BRAND_TEXT = "photos";

type HeaderComponent = () => { view: () => m.Children };

function clickBurgerMenu(): void {
  broadcast("click_burger_menu", {});
}

function viewBurgerMenu(): m.Children {
  return m("a", { onclick: clickBurgerMenu }, m("span.burger", "Ξ"));
}

function BurgerMenu() {
  return { view: viewBurgerMenu };
}

function readHeaderBrandAttrs() {
  const onclick = navigate("/");
  return {
    href: "#/",
    "aria-label": "photos — home",
    onclick,
  };
}

function viewHeaderBrandText(): m.Children {
  // The label distinguishes this link from the sidebar link for screen readers.
  const attrs = readHeaderBrandAttrs();
  const brand = m("span.brand", BRAND_TEXT);
  return m("a", attrs, brand);
}

function HeaderBrandText() {
  return { view: viewHeaderBrandText };
}

function drawHeaderItem(component: HeaderComponent): m.Children {
  const child = m(component);
  return m("li.header-item", {}, child);
}

function drawHeaderList(burger: m.Children, brand: m.Children): m.Children {
  const style =
    "display: flex; align-items: baseline; padding-left: 0px !important;";
  return m("ul", { style }, [burger, brand]);
}

function viewHeader(): m.Children {
  const burger = drawHeaderItem(BurgerMenu);
  const brand = drawHeaderItem(HeaderBrandText);
  const list = drawHeaderList(burger, brand);
  return m("nav.header", { role: "navigation" }, [list]);
}

export function Header() {
  return { view: viewHeader };
}
