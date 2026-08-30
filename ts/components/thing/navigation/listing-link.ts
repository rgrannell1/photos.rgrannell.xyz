import { asUrn } from "@rgrannell1/tribbledb";
import m from "mithril";
import { capitalise } from "../../../commons/strings.ts";
import { block, broadcast } from "../../../services/browser/events.ts";

function onListingClick(type: string, event: Event) {
  broadcast("navigate", {
    route: `/listing/${type}`,
  });
  block(event);
}

type ListingLinkAttrs = { urn: string } | { type: string };

function readListingType(attrs: ListingLinkAttrs): string {
  if ("type" in attrs) {
    return attrs.type;
  }
  return asUrn(attrs.urn).type;
}

function drawListingLink(type: string): m.Children {
  const attrs = {
    href: `#/listing/${type}`,
    onclick: onListingClick.bind(null, type),
  };
  const label = capitalise(type);
  return m("a", attrs, label);
}

function viewListingLink(vnode: m.Vnode<ListingLinkAttrs>): m.Children {
  const type = readListingType(vnode.attrs);
  return drawListingLink(type);
}

export function ListingLink() {
  return { view: viewListingLink };
}
