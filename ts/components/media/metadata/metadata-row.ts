/* Render one labelled row in a metadata table. */

import m from "mithril";
import { Heading } from "../content/heading.ts";

type MetadataRowAttrs = {
  label: string;
};

function viewMetadataRow(vnode: m.Vnode<MetadataRowAttrs>): m.Children {
  const heading = m(Heading, { text: vnode.attrs.label });
  const value = m("td", vnode.children);
  return m("tr", [heading, value]);
}

export function MetadataRow() {
  return { view: viewMetadataRow };
}
