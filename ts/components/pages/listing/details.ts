/* Support listing operations. */

import m from "mithril";
import { DATA_TRUE, KnownTypes } from "../../../constants/data.ts";
import { LifeListFilter } from "../../../constants/display.ts";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { SubjectStats } from "../../../domain/media/stats.ts";
import { routeLinkAttrs, setRoute } from "../../../services/browser/routes.ts";
import { selectFirst } from "../../../commons/collections/arrays.ts";
import { isSome, type Maybe } from "../../../commons/collections/maybe.ts";
import type { ListingDetailsAttrs, ListingPageAttrs } from "./listing.ts";
import { BirdListingDetails, viewMammalListingDetails } from "./cards.ts";

/**
 * Mammal species counts, by wild, total, and Irish wild.
 */
export function MammalListingDetails(): m.Component<{ stats: SubjectStats }> {
  return { view: viewMammalListingDetails };
}

/** Render the details card for a supported listing type with available statistics. */
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

/** Create the listing details component. */
export function ListingDetails(): m.Component<ListingDetailsAttrs> {
  return { view: viewListingDetails };
}

/** Render a listing label as the page heading with its type metadata. */
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

/**
 * The listing's plural label as the page title, e.g "Countries"
 */
export function ListingTitle(): m.Component<{ type: string; label: string }> {
  return { view: viewListingTitle };
}

/** Render a link to all photos for a listing type. */
export function viewListingThingsButton(
  vnode: m.Vnode<{ type: string }>,
): m.Children {
  const { type } = vnode.attrs;
  const attrs = routeLinkAttrs(`/thing/${type}:*`, {
    "data-testid": "listing-things-link",
  });
  return m(m.route.Link, attrs, `See all ${type} photos`);
}

/**
 * Link to the things page for this type (wildcard)
 */
export function ListingThingsButton(): m.Component<{ type: string }> {
  return { view: viewListingThingsButton };
}

/** Toggle the Ireland life-list filter through a route change. */
export function toggleIrelandFilter(type: string, filter: Maybe<string>): void {
  const isActive = filter === LifeListFilter.Ireland;
  const route = isActive
    ? `/listing/${type}`
    : `/listing/${type}/${LifeListFilter.Ireland}`;
  setRoute(route);
}

/** Test whether a thing carries the published Irish marker. */
export function isIrishThing(thing: TripleObject): boolean {
  return selectFirst(thing.irish) === DATA_TRUE;
}

/** Render a listing's title, statistics, and optional all-photos link. */
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
