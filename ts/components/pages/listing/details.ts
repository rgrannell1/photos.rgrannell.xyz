/* Support listing operations. */

import m from "mithril";
import { DATA_TRUE, KnownTypes } from "../../../constants/data.ts";
import { LIFE_LIST_FILTERS } from "../../../constants/display.ts";
import { type TripleObject } from "@rgrannell1/tribbledb";
import { broadcast, navigate } from "../../../services/browser/events.ts";
import { one } from "../../../commons/collections/arrays.ts";
import { isSome, type Maybe } from "../../../commons/collections/maybe.ts";
import type { ListingDetailsAttrs, ListingPageAttrs } from "./listing.ts";
import { BirdListingDetails, viewMammalListingDetails } from "./cards.ts";

/*
 * Mammal species counts, by wild, total, and Irish wild.
 */
export function MammalListingDetails() {
  return { view: viewMammalListingDetails };
}

export function viewListingDetails(
  vnode: m.Vnode<ListingDetailsAttrs>,
): m.Children {
  const { type, stats, filter, onToggleIreland } = vnode.attrs;
  const showsBirdDetails = type === KnownTypes.BIRD && isSome(stats);
  const showsMammalDetails = type === KnownTypes.MAMMAL && isSome(stats);

  if (showsBirdDetails) {
    return m(BirdListingDetails, { stats, filter, onToggleIreland });
  }

  if (showsMammalDetails) {
    return m(MammalListingDetails, { stats });
  }

  return null;
}

export function ListingDetails() {
  return { view: viewListingDetails };
}

export function viewListingTitle(
  vnode: m.Vnode<{ type: string; label: string }>,
): m.Children {
  const { type, label } = vnode.attrs;
  const attrs = { "data-testid": "listing-title", "data-listing-type": type };
  return m(
    "h1.albums-header",
    attrs,
    label,
  );
}

/*
 * The listing's plural label as the page title, e.g "Countries"
 */
export function ListingTitle() {
  return { view: viewListingTitle };
}

export function viewListingThingsButton(
  vnode: m.Vnode<{ type: string }>,
): m.Children {
  const { type } = vnode.attrs;
  const href = `#/thing/${type}:*`;
  const attrs = {
    href,
    onclick: navigate(`/thing/${type}:*`),
    "data-testid": "listing-things-link",
  };
  return m("a", attrs, `See all ${type} photos`);
}

/*
 * Link to the things page for this type (wildcard)
 */
export function ListingThingsButton() {
  return { view: viewListingThingsButton };
}

export function toggleIrelandFilter(type: string, filter: Maybe<string>): void {
  const isActive = filter === LIFE_LIST_FILTERS.IRELAND;
  const route = isActive
    ? `/listing/${type}`
    : `/listing/${type}/${LIFE_LIST_FILTERS.IRELAND}`;
  broadcast("navigate", {
    route,
  });
}

export function isIrishThing(thing: TripleObject): boolean {
  return one(thing.irish) === DATA_TRUE;
}

export function drawListingMetadata(attrs: ListingPageAttrs): m.Children {
  const { type, label, isListable, stats, filter } = attrs;
  const onToggleIreland = toggleIrelandFilter.bind(null, type, filter);
  const metadata = [
    m(ListingTitle, { type, label }),
    m(ListingDetails, { type, stats, filter, onToggleIreland }),
  ];
  // the published listable flag gates the "see all <type> photos" link
  if (isListable) {
    metadata.push(
      m("section.album-metadata", m(ListingThingsButton, { type })),
    );
  }
  return m("section.album-metadata", metadata);
}
