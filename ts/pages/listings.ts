import m from "mithril";
import { navigate } from "../commons/events.ts";

type ListingItemAttrs = {
  name: string;
  route: string;
};

function ListingItem() {
  return {
    view(vnode: m.Vnode<ListingItemAttrs>) {
      return m(
        "li",
        m("a", {
          class: "listing-item",
          onclick: navigate(vnode.attrs.route),
        }, vnode.attrs.name),
      );
    },
  };
}

type ListingsPageAttrs = {
  visible: boolean;
};

export function ListingsPage() {
  return {
    view(vnode: m.Vnode<ListingsPageAttrs>) {
      const { visible } = vnode.attrs;

      return m("div", {
        class: visible ? "page sidebar-visible" : "page",
      }, [
        m("h1", "Listings"),
        m(
          "section",
          m("ul", [
            m(ListingItem, { route: "/listing/place", name: "Places" }),
            m(ListingItem, { route: "/listing/country", name: "Countries" }),
            m(ListingItem, { route: "/listing/bird", name: "Birds" }),
            m(ListingItem, { route: "/listing/mammal", name: "Mammals" }),
            m(ListingItem, { route: "/listing/reptile", name: "Reptiles" }),
            m(ListingItem, { route: "/listing/amphibian", name: "Amphibians" }),
            m(ListingItem, { route: "/listing/insect", name: "Insects" }),
          ]),
        ),
      ]);
    },
  };
}
