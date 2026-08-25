/* The shared metadata table for photos and videos. */

import m from "mithril";
import type { ReadThing } from "../thing/thing-links.ts";
import type { ReadThingEmoji } from "../thing/thing-link.ts";
import { MediaDescription } from "./media-description.ts";
import { MediaLocations } from "./media-locations.ts";
import { MediaSubject } from "./media-subject.ts";
import { MediaThingLinks } from "./media-thing-links.ts";
import { Heading } from "./heading.ts";
import { fromNullable } from "../../commons/maybe.ts";

// the structural overlap of Photo and Video that the table reads
type Media = {
  description?: string;
  summary?: string;
  location?: string | string[];
  rating?: string;
  style?: string;
  subject?: string | string[];
};

type MediaComponentAttrs = {
  media: Media;
  readThing: ReadThing;
  readEmoji: ReadThingEmoji;
};

function viewMediaInfo(vnode: m.Vnode<MediaComponentAttrs>): m.Children {
  const { media, readThing, readEmoji } = vnode.attrs;

  const infoItems = [];
  const hasDescription = Boolean(media.description || media.summary);

  if (hasDescription) {
    infoItems.push(m("tr", [
      m(Heading, { text: "Description" }),
      m(MediaDescription, {
        description: fromNullable(media.description),
        summary: fromNullable(media.summary),
      }),
    ]));
  }

  infoItems.push(
    m("tr", [
      m(Heading, { text: "Location" }),
      m(MediaLocations, {
        location: fromNullable(media.location),
        readThing,
        readEmoji,
        mode: "geographic",
      }),
    ]),
    m("tr", [
      m(Heading, { text: "Place Type" }),
      m(MediaLocations, {
        location: fromNullable(media.location),
        readThing,
        readEmoji,
        mode: "feature",
      }),
    ]),
    m("tr", [
      m(Heading, { text: "Rating" }),
      m(MediaThingLinks, {
        value: fromNullable(media.rating),
        readThing,
        readEmoji,
      }),
    ]),
    m("tr", [
      m(Heading, { text: "Style" }),
      m(MediaThingLinks, {
        value: fromNullable(media.style),
        readThing,
        readEmoji,
      }),
    ]),
    m("tr", [
      m(Heading, { text: "Subject" }),
      m(MediaSubject, {
        subject: fromNullable(media.subject),
        readThing,
        readEmoji,
      }),
    ]),
  );

  return m("table.metadata-table", infoItems);
}

export function MediaInfo() {
  return { view: viewMediaInfo };
}
