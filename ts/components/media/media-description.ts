/* Render the shared description cell for photos and videos. */

import m from "mithril";
import { preprocessDescription } from "../../commons/strings.ts";
import { type Maybe, withDefault } from "../../commons/maybe.ts";

type MediaDescriptionAttrs = {
  description: Maybe<string>;
  summary: Maybe<string>;
};

function viewMediaDescription(
  vnode: m.Vnode<MediaDescriptionAttrs>,
): m.Children {
  const { description, summary } = vnode.attrs;
  const html = preprocessDescription(
    withDefault(description, withDefault(summary, "")),
  );

  return m("td", html ? m.trust(html) : "—");
}

export function MediaDescription() {
  return { view: viewMediaDescription };
}
