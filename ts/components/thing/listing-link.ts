import { asUrn } from "@rgrannell1/tribbledb";
import m from "mithril";
import { capitalise } from "../../commons/strings.ts";
import { block, broadcast } from "../../services/browser/events.ts";

function onListingClick(type: string, event: Event) {
  broadcast("navigate", {
    route: `/listing/${type}`,
  });
  block(event);
}

type ListingLinkAttrs = { urn: string } | { type: string };

function viewListingLink(vnode: m.Vnode<ListingLinkAttrs>): m.Children {
  let type = "";
  if ("type" in vnode.attrs) {
    type = vnode.attrs.type;
  } else {
    const parsed = asUrn(vnode.attrs.urn);
    type = parsed.type;
  }

  return m("a", {
    href: `#/listing/${type}`,
    onclick: onListingClick.bind(null, type),
  }, capitalise(type));
}

export function ListingLink() {
  return { view: viewListingLink };
}
