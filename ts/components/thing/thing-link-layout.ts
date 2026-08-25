/* Render the shared class and element contract for thing links. */

import m from "mithril";

export function drawThingLink(
  tag: string,
  type: string,
  attrs: Record<string, unknown>,
  label: m.Children,
): m.Children {
  return m(tag, {
    ...attrs,
    class: ["thing-link", `${type}-link`].join(" "),
  }, label);
}
