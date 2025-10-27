
import m from "mithril";
import { ThingTitle } from "../components/thing-title.ts";
import { TripleObject } from "@rgrannell1/tribbledb";

/*
 * Construct a description of the thing
 */
function ThingDescription() {
  return {
    view() {

    }
  }
}

function ThingPlaces() {
  return {
    view() {

    }
  }
}

function ThingTypeLink() {
  return {
    view() {

    }
  }
}

function Urls() {

}

function Metadata() {

}

function AlbumSection() {

}

function PhotoSection() {

}

type ThingPageAttrs = {
  urn: string;
  things: TripleObject[]
}

export function ThingPage() {
  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const { urn, things } = vnode.attrs;

      return m("div", [
        m("section.thing-page", [
          m(ThingTitle, { urn, things }),
          m(ThingDescription),
        ])
      ]);
    }
  }
}
