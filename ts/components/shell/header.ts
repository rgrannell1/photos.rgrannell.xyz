import m from "mithril";
import { ApplicationEvent, broadcast } from "../../services/browser/events.ts";
import { routeLinkAttrs } from "../../services/browser/routes.ts";

const BRAND_TEXT = "photos";

type HeaderComponent = () => { view: () => m.Children };

/** Broadcasts a request to toggle the burger menu. */
function clickBurgerMenu(): void {
  broadcast(ApplicationEvent.ClickBurgerMenu, {});
}

/** Draws the burger menu trigger. */
function viewBurgerMenu(): m.Children {
  return m("a", { onclick: clickBurgerMenu }, m("span.burger", "Ξ"));
}

/** Creates the burger menu component. */
function BurgerMenu() {
  return { view: viewBurgerMenu };
}

/** Builds home-link attributes for the header brand. */
function buildHeaderBrandAttrs() {
  return routeLinkAttrs("/", {
    "aria-label": "photos — home",
  });
}

/** Draws the header brand as a home link. */
function viewHeaderBrandText(): m.Children {
  // The label distinguishes this link from the sidebar link for screen readers.
  const attrs = buildHeaderBrandAttrs();
  const $brand = m("span.brand", BRAND_TEXT);
  return m(m.route.Link, attrs, $brand);
}

/** Creates the header brand component. */
function HeaderBrandText() {
  return { view: viewHeaderBrandText };
}

/** Wraps a header component in a list item. */
function drawHeaderItem(component: HeaderComponent): m.Children {
  const $child = m(component);
  return m("li.header-item", {}, $child);
}

/** Draws the header items in a horizontal list. */
function drawHeaderList(burger: m.Children, brand: m.Children): m.Children {
  const style =
    "display: flex; align-items: baseline; padding-left: 0px !important;";
  return m("ul", { style }, [burger, brand]);
}

/** Draws the application header navigation. */
function viewHeader(): m.Children {
  const $burger = drawHeaderItem(BurgerMenu);
  const $brand = drawHeaderItem(HeaderBrandText);
  const $list = drawHeaderList($burger, $brand);
  return m("nav.header", { role: "navigation" }, [$list]);
}

/** Creates the application header component. */
export function Header(): m.Component {
  return { view: viewHeader };
}
