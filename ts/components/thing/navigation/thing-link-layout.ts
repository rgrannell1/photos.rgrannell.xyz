/* Render the shared class and element contract for thing links. */

import m from "mithril";

function thingLinkClasses(type: string): string {
  const classes = ["thing-link", `${type}-link`];
  return classes.join(" ");
}

export function drawThingLink(
  tag: string,
  type: string,
  attrs: Record<string, unknown>,
  label: m.Children,
): m.Children {
  const className = thingLinkClasses(type);
  const linkAttrs = { ...attrs, class: className };
  return m(tag, linkAttrs, label);
}
