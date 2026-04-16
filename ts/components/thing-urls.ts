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
        return null;
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

      const lat = one(thing.latitude);
      const lng = one(thing.longitude);
      const isNullIsland = lat === "0" && lng === "0";

      if (lat !== undefined && lng !== undefined && !isNullIsland) {
        const mapsHref = `https://www.google.com/maps?q=${
          encodeURIComponent(lat)
        },${encodeURIComponent(lng)}`;
        $links.push(
          m("li", m(ExternalLink, { href: mapsHref, text: "[map]" })),
        );
      }

      if ($links.length === 0) {
        return null;
      }

      return m("ul.link-list", $links);
    },
  };
}
