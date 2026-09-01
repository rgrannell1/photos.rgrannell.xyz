import { asUrn } from "@rgrannell1/tribbledb";
import m from "mithril";
import { capitalise } from "../../../commons/strings.ts";
import { routeLinkAttrs } from "../../../services/browser/routes.ts";

type ListingLinkAttrs = { urn: string } | { type: string };

/** Reads the listing type directly or derives it from a URN. */
function readListingType(attrs: ListingLinkAttrs): string {
  if ("type" in attrs) {
    return attrs.type;
  }
  return asUrn(attrs.urn).type;
}

/** Draws an application link to a typed listing. */
function drawListingLink(type: string): m.Children {
  const attrs = routeLinkAttrs(`/listing/${type}`);
  const label = capitalise(type);
  return m(m.route.Link, attrs, label);
}

/** Renders the listing link for the supplied type or URN. */
function viewListingLink(vnode: m.Vnode<ListingLinkAttrs>): m.Children {
  const type = readListingType(vnode.attrs);
  return drawListingLink(type);
}

/** Defines a link to a type listing. */
export function ListingLink() {
  return { view: viewListingLink };
}
