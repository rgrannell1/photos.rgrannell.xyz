
import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../commons/arrays.ts";
import { ExternalLink } from "./external-link.ts";

/*
 * Links to external sites about the thing
 */
export function ThingUrls() {
  return {
    view(vnode: m.Vnode<{ things: TripleObject[] }>) {
      const { things } = vnode.attrs;

      if (things.length !== 1) {
        return m("ul");
      }

      const [thing] = things;
      const $links = [];

      const wikipedia = one(thing.wikipedia);
      if (wikipedia) {
        $links.push(
          m("li", m(ExternalLink, { href: wikipedia, text: "[wikipedia]" })),
        );
      }

      const birdwatch = one(thing.birdwatchUrl);
      if (birdwatch) {
        $links.push(
          m("li", m(ExternalLink, { href: birdwatch, text: "[birdwatch]" })),
        );
      }

      // -- add google maps URL
      return m("ul.link-list", $links);
    },
  };
}
