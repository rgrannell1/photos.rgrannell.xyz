/* Render the shared description cell for photos and videos. */

import m from "mithril";
import { preprocessDescription } from "../../../commons/strings.ts";
import { type Maybe, withDefault } from "../../../commons/collections/maybe.ts";

type MediaDescriptionAttrs = {
  description: Maybe<string>;
  summary: Maybe<string>;
};

/** Selects the description, with the summary as its fallback. */
function selectDescription(attrs: MediaDescriptionAttrs): string {
  const summary = withDefault(attrs.summary, "");
  return withDefault(attrs.description, summary);
}

/** Renders preprocessed media text or an empty-value marker. */
function viewMediaDescription(
  vnode: m.Vnode<MediaDescriptionAttrs>,
): m.Children {
  const description = selectDescription(vnode.attrs);
  const html = preprocessDescription(description);
  const content = html ? m.trust(html) : "—";
  return m("td", content);
}

/** Creates the shared media description table cell. */
export function MediaDescription() {
  return { view: viewMediaDescription };
}
