
import m from "mithril";
import { NonListableTypes } from "../constants.ts";
import { Strings } from "../strings.ts";
import { TripleObject } from "@rgrannell1/tribbledb";

/*
 * Display the component albums and metadata
 * in the listing page
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
 * Display a pluralised title for the listing page,
 * e.g "Countries"
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
 * Link to the things page for this type (wildcard)
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
  things: TripleObject[];
}

/*
 * Render the listing page. It shows
 * each member of a category (e.g countries)
 */
export function ListingPage() {
  return {
    view(vnode: m.Vnode<ListingPageAttrs>) {
      const { type, things } = vnode.attrs;
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
