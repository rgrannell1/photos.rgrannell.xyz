/*
 * A table-row heading cell, shared by the metadata tables.
 */

import m from "mithril";

type HeadingAttrs = {
  text: string;
};

/** Render a metadata table heading cell. */
function viewHeading(vnode: m.Vnode<HeadingAttrs>): m.Children {
  const { text } = vnode.attrs;
  const $heading = m("th.exif-heading", text);
  return $heading;
}

/** Create the shared metadata table heading component. */
export function Heading() {
  return { view: viewHeading };
}
