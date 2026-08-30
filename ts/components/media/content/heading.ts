/*
 * A table-row heading cell, shared by the metadata tables.
 */

import m from "mithril";

type HeadingAttrs = {
  text: string;
};

function viewHeading(vnode: m.Vnode<HeadingAttrs>): m.Children {
  const { text } = vnode.attrs;
  const heading = m("th.exif-heading", text);
  return heading;
}

export function Heading() {
  return { view: viewHeading };
}
