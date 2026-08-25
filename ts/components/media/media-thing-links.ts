/* Render one shared metadata value as thing links. */

import m from "mithril";
import type { Maybe } from "../../commons/maybe.ts";
import type { ReadThingEmoji } from "../thing/thing-link.ts";
import { type ReadThing, toThingLinks } from "../thing/thing-links.ts";

type MediaThingLinksAttrs = {
  value: Maybe<string>;
  readThing: ReadThing;
  readEmoji: ReadThingEmoji;
};

function viewMediaThingLinks(vnode: m.Vnode<MediaThingLinksAttrs>): m.Children {
  const { value, readThing, readEmoji } = vnode.attrs;
  const $links = toThingLinks(readThing, readEmoji, [value]);

  return m("td", $links.length > 0 ? $links : "—");
}

export function MediaThingLinks() {
  return { view: viewMediaThingLinks };
}
