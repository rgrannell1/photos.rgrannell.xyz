/* Render one shared metadata value as thing links. */

import m from "mithril";
import type { Maybe } from "../../../commons/collections/maybe.ts";
import type { ReadThingEmoji } from "../../thing/navigation/thing-link.ts";
import { type ReadThing, toThingLinks } from "../../thing/navigation/thing-links.ts";

type MediaThingLinksAttrs = {
  value: Maybe<string>;
  readThing: ReadThing;
  readEmoji: ReadThingEmoji;
};

/** Draws a metadata value as links or an empty-value mark. */
function viewMediaThingLinks(vnode: m.Vnode<MediaThingLinksAttrs>): m.Children {
  const { value, readThing, readEmoji } = vnode.attrs;
  const $links = toThingLinks(readThing, readEmoji, [value]);
  const content = $links.length > 0 ? $links : "—";
  return m("td", content);
}

/** Creates the media thing links component. */
export function MediaThingLinks() {
  return { view: viewMediaThingLinks };
}
