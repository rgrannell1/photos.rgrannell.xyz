/* Render one labelled row in a metadata table. */

import m from "mithril";
import { Heading } from "./heading.ts";

type MetadataRowAttrs = {
  label: string;
};

function viewMetadataRow(vnode: m.Vnode<MetadataRowAttrs>): m.Children {
  return m("tr", [
    m(Heading, { text: vnode.attrs.label }),
    m("td", vnode.children),
  ]);
}

export function MetadataRow() {
  return { view: viewMetadataRow };
}
