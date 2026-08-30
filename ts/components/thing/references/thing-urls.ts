import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../../commons/collections/arrays.ts";
import { ExternalLink } from "./external-link.ts";
import { isNone, type Maybe, NONE } from "../../../commons/collections/maybe.ts";

function drawExternalLink(href: Maybe<string>, text: string): m.Vnode | null {
  if (isNone(href)) {
    return null;
  }
  return m("li", m(ExternalLink, { href, text }));
}

function isVisibleLink(link: m.Vnode | null): boolean {
  return link !== null;
}

function encodeCoordinates(latitude: string, longitude: string): string {
  const encodedLatitude = encodeURIComponent(latitude);
  const encodedLongitude = encodeURIComponent(longitude);
  return `${encodedLatitude},${encodedLongitude}`;
}

function readMapHref(thing: TripleObject): Maybe<string> {
  const latitude = one(thing.latitude);
  const longitude = one(thing.longitude);
  if (isNone(latitude) || isNone(longitude)) {
    return NONE;
  }
  if (latitude === "0" && longitude === "0") {
    return NONE;
  }

  const coordinates = encodeCoordinates(latitude, longitude);
  return `https://www.google.com/maps?q=${coordinates}`;
}

function readThingUrlLinks(thing: TripleObject): (m.Vnode | null)[] {
  const wikipedia = drawExternalLink(one(thing.wikipedia), "[wikipedia]");
  const birdwatch = drawExternalLink(one(thing.birdwatchUrl), "[birdwatch]");
  const map = drawExternalLink(readMapHref(thing), "[map]");
  return [wikipedia, birdwatch, map];
}

function drawThingUrls(thing: TripleObject): m.Children {
  const links = readThingUrlLinks(thing);
  if (!links.some(isVisibleLink)) {
    return null;
  }
  const list = m("ul.link-list", links);
  return list;
}

function readOnlyThing(things: TripleObject[]): Maybe<TripleObject> {
  const [thing] = things;
  const hasOneThing = things.length === 1 && thing !== undefined;
  return hasOneThing ? thing : NONE;
}

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

export function ThingUrls() {
  return { view: viewThingUrls };
}
