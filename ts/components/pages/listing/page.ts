/* Support listing operations. */

import m from "mithril";
import { KnownTypes } from "../../../constants/data.ts";
import { LifeListFilter } from "../../../constants/display.ts";
import type { ListingPageAttrs } from "./listing.ts";
import { AlbumsList } from "./cards.ts";
import { drawListingMetadata, isIrishThing } from "./details.ts";

/** Render a listing page and apply its supported life-list filter. */
export function viewListingPage(vnode: m.Vnode<ListingPageAttrs>): m.Children {
  const { attrs } = vnode;
  const showsIrishBirds = attrs.type === KnownTypes.BIRD &&
    attrs.filter === LifeListFilter.Ireland;
  const displayThings = showsIrishBirds
    ? attrs.things.filter(isIrishThing)
    : attrs.things;
  return m("main", {
    class: attrs.visible ? "page sidebar-visible" : "page",
  }, [
    drawListingMetadata(attrs),
    m(AlbumsList, {
      readThingCover: attrs.readThingCover,
      things: displayThings,
      listingType: attrs.type,
    }),
  ]);
}
