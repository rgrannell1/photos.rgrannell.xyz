import m from "mithril";
import { NonListableTypes } from "../constants.ts";
import { capitalise, pluralise } from "../commons/strings.ts";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { navigate } from "../commons/events.ts";

/*
 * Display the component albums and metadata
 * in the listing page
 */
function AlbumsList() {
  return {
    view() {
      // TODO I don't know how to type this
      const $albumComponents: any[] = [];
      return m("section.album-container", $albumComponents);
    },
  };
}

/*
 * Display a pluralised title for the listing page,
 * e.g "Countries"
 */
function ListingTitle() {
  return {
    view(vnode: m.Vnode<{ type: string }>) {
      const { type } = vnode.attrs;
      return m(
        "h1.albums-header",
        `${capitalise(pluralise(type))}`,
      );
    },
  };
}

/*
 * Link to the things page for this type (wildcard)
 */
function ListingThingsButton() {
  return {
    view(vnode: m.Vnode<{ type: string }>) {
      const { type } = vnode.attrs;
      return m("a", {
        href: `#/thing/${type}:*`,
        onclick: () => navigate(`/thing/${type}:*`),
      }, `See all ${type} photos`);
    },
  };
}

type ListingPageAttrs = {
  type: string;
  things: TripleObject[];
};

/*
 * Render the listing page. It shows
 * each member of a category (e.g countries)
 */
export function ListingPage() {
  return {
    view(vnode: m.Vnode<ListingPageAttrs>) {
      const { type, things } = vnode.attrs;
      const $albums = [];

      const $md = [
        m(ListingTitle, { type }),
      ];

      if (!NonListableTypes.has(type)) {
        $md.push(
          m("section.album-metadata", [
            m(ListingThingsButton, { type }),
          ]),
        );
      }

      return m("div.page", [
        m("section.album-metadata", $md),
        m(AlbumsList),
      ]);
    },
  };
}
