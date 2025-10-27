
import m from "mithril";
import { ThingTitle } from "../components/thing-title.ts";
import { TripleObject } from "@rgrannell1/tribbledb";

type ThingPageAttrs = {
  urn: string;
  things: TripleObject[]
}

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
  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const { things } = vnode.attrs;

      if (things.length !== 1) {
        return m("ul")
      }

      const [thing]= things;

      const $links = [];
      if (thing.wikipedia) {
        $links.push(m('a', {
          href: thing.wikipedia,
          target: '_blank',
          rel: 'noopener'
        }, '[wikipedia]'));
      }

      if (thing.birdwatchUrl) {
        $links.push(m('a', {
          href: thing.birdwatchUrl,
          target: '_blank',
          rel: 'noopener'
        }, '[birdwatch]'));
      }

      return m("ul", $links)
    }
  }
}

function Metadata() {

}

function AlbumSection() {

}

function PhotoSection() {

}

export function ThingPage() {
  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const { urn, things } = vnode.attrs;

      return m("div", [
        m("section.thing-page", [
          m(ThingTitle, { urn, things }),
          m(Urls, { urn, things }),
          m(ThingDescription),
        ])
      ]);
    }
  }
}
