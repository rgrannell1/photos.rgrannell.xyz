/* Render the shared class and element contract for thing links. */

import m from "mithril";

/** Build the shared and type-specific class names for a thing link. */
function thingLinkClasses(type: string): string {
  const classes = ["thing-link", `${type}-link`];
  return classes.join(" ");
}

/** Draw a thing link element while applying the shared class contract. */
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
