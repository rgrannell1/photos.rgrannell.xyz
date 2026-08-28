import m from "mithril";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../commons/arrays.ts";
import { ExternalLink } from "./external-link.ts";
import { isNone, type Maybe, NONE } from "../../commons/maybe.ts";

function drawExternalLink(href: Maybe<string>, text: string): m.Vnode | null {
  if (isNone(href)) {
    return null;
  }
  return m("li", m(ExternalLink, { href, text }));
}

function isVisibleLink(link: m.Vnode | null): boolean {
  return link !== null;
}

function readMapHref(thing: TripleObject): Maybe<string> {
  const latitude = one(thing.latitude);
  const longitude = one(thing.longitude);
  const isNullIsland = latitude === "0" && longitude === "0";
  if (isNone(latitude) || isNone(longitude) || isNullIsland) {
    return NONE;
  }

  const coordinates = `${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
  return `https://www.google.com/maps?q=${coordinates}`;
}

function viewThingUrls(
  vnode: m.Vnode<{ things: TripleObject[] }>,
): m.Children {
  const { things } = vnode.attrs;

  if (things.length !== 1) {
    return null;
  }

  const [thing] = things;
  const links = [
    drawExternalLink(one(thing.wikipedia), "[wikipedia]"),
    drawExternalLink(one(thing.birdwatchUrl), "[birdwatch]"),
    drawExternalLink(readMapHref(thing), "[map]"),
  ];
  if (!links.some(isVisibleLink)) {
    return null;
  }

  return m("ul.link-list", links);
}

export function ThingUrls() {
  return { view: viewThingUrls };
}
