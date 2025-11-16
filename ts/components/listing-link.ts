import { asUrn } from "@rgrannell1/tribbledb";
import m from "mithril";
import { Strings } from "../commons/strings.ts";
import { block, broadcast } from "../commons/events.ts";

function onListingClick(type: string, event: Event) {
  broadcast("navigate", {
    route: `/listing/${type}`,
  });
  block(event);
}

type ListingLinkAttrs = { urn: string } | { type: string };

export function ListingLink() {
  return {
    view(vnode: m.Vnode<ListingLinkAttrs>) {
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
      }, Strings.capitalise(type));
    },
  };
}
