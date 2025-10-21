
import m from "mithril";
import { NonListableTypes } from "../constants.ts";
import { Strings } from "../strings.ts";

/*
 *
 */
function AlbumsList() {
  return {
    view() {
      const $albumComponents = [];

      return m("section.album-container", $albumComponents)
    }
  }
}

/*
 *
 */
function ListingTitle() {
  return {
    view(vnode: m.Vnode<{ type: string }>) {
      const { type } = vnode.attrs;
      return m("h1.albums-header", `${Strings.capitalise(Strings.pluralise(type))}`);
    }
  }
}

/*
 *
 */
function ListingThingsButton() {
  return {
    view(vnode: m.Vnode<{ type: string }>) {
      const { type } = vnode.attrs;
      return m("a", {
        href: `/thing/${type}`
      }, `See all ${type} photos`);
    }
  }
}

type ListingPageAttrs = {
  type: string;
}

/*
 *
 */
export function ListingPage() {
  return {
    view(vnode: m.Vnode<ListingPageAttrs>) {
      const { type } = vnode.attrs;
      const $albums = []

      const $md = [
        m(ListingTitle, { type }),
      ]

      if (!NonListableTypes.has(type)) {
        $md.push(
          m("section.album-metadata", [
            m(ListingThingsButton, { type }),
          ])
        );
      }

      return m("div", [
        m("section.album-metadata", $md),
        m(AlbumsList)
      ]);
    },
  };
}
