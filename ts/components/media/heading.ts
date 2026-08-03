/*
 * A table-row heading cell, shared by the metadata tables.
 */

import m from "mithril";

type HeadingAttrs = {
  text: string;
};

function viewHeading(vnode: m.Vnode<HeadingAttrs>): m.Children {
  const { text } = vnode.attrs;
  return m("th.exif-heading", text);
}

/* */
export function Heading() {
  return { view: viewHeading };
}
