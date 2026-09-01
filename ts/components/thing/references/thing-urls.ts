import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { selectFirst } from "../../../commons/collections/arrays.ts";
import { ExternalLink } from "./external-link.ts";
import { isNone, type Maybe, NONE } from "../../../commons/collections/maybe.ts";

/** Draws a labelled external link when its URL exists. */
function drawExternalLink(href: Maybe<string>, text: string): m.Vnode | null {
  if (isNone(href)) {
    return null;
  }
  return m("li", m(ExternalLink, { href, text }));
}

/** Reports whether an optional link produced visible content. */
function isVisibleLink(link: m.Vnode | null): boolean {
  return link !== null;
}

/** Encodes a latitude and longitude for a map query. */
function encodeCoordinates(latitude: string, longitude: string): string {
  const encodedLatitude = encodeURIComponent(latitude);
  const encodedLongitude = encodeURIComponent(longitude);
  return `${encodedLatitude},${encodedLongitude}`;
}

/** Builds a Google Maps URL for valid, non-zero coordinates. */
function readMapHref(thing: TripleObject): Maybe<string> {
  const latitude = selectFirst(thing.latitude);
  const longitude = selectFirst(thing.longitude);
  if (isNone(latitude) || isNone(longitude)) {
    return NONE;
  }
  if (latitude === "0" && longitude === "0") {
    return NONE;
  }

  const coordinates = encodeCoordinates(latitude, longitude);
  return `https://www.google.com/maps?q=${coordinates}`;
}

/** Reads the supported external links for one thing. */
function readThingUrlLinks(thing: TripleObject): (m.Vnode | null)[] {
  const wikipedia = drawExternalLink(selectFirst(thing.wikipedia), "[wikipedia]");
  const birdwatch = drawExternalLink(selectFirst(thing.birdwatchUrl), "[birdwatch]");
  const map = drawExternalLink(readMapHref(thing), "[map]");
  return [wikipedia, birdwatch, map];
}

/** Draws a link list when a thing has at least one supported URL. */
function drawThingUrls(thing: TripleObject): m.Children {
  const links = readThingUrlLinks(thing);
  if (!links.some(isVisibleLink)) {
    return null;
  }
  const $list = m("ul.link-list", links);
  return $list;
}

/** Returns the sole thing, or NONE unless the list has exactly one item. */
function readOnlyThing(things: TripleObject[]): Maybe<TripleObject> {
  const [thing] = things;
  const hasOneThing = things.length === 1 && thing !== undefined;
  return hasOneThing ? thing : NONE;
}

/** Draws URLs only when the page represents one thing. */
function viewThingUrls(
  vnode: m.Vnode<{ things: TripleObject[] }>,
): m.Children {
  const { things } = vnode.attrs;

  const thing = readOnlyThing(things);
  if (isNone(thing)) {
    return null;
  }
  return drawThingUrls(thing);
}

/** Creates the external URL list for a single-thing page. */
export function ThingUrls() {
  return { view: viewThingUrls };
}
