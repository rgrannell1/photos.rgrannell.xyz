/*
 * A table-row heading cell, shared by the metadata tables.
 */

import m from "mithril";

type HeadingAttrs = {
  text: string;
};

/* */
export function Heading() {
  return {
    view(vnode: m.Vnode<HeadingAttrs>) {
      const { text } = vnode.attrs;
      return m("th.exif-heading", text);
    },
  };
}
