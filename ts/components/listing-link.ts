
import { asUrn } from "@rgrannell1/tribbledb";
import m from "mithril";
import { Strings } from "../commons/strings.ts";
import { block, broadcast } from "../commons/events.ts";

function onListingClick(type: string, event: Event) {
  broadcast('navigate', {
    route: `/listing/${type}`,
  });
  block(event);
}

type ListingLinkAttrs = {
  urn: string;
};

export function ListingLink() {
  return {
    view(vnode: m.Vnode<ListingLinkAttrs>) {
      const { urn } = vnode.attrs;

      const parsed = asUrn(urn);

      return m('a', {
        href: `#/listing/${parsed.type}`,
        onclick: onListingClick.bind(null, parsed.type),
      }, Strings.capitalise(parsed.type));
    }
  }
}
