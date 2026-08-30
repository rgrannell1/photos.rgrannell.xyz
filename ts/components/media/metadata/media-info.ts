/* The shared metadata table for photos and videos. */

import m from "mithril";
import type { ReadThing } from "../../thing/navigation/thing-links.ts";
import type { ReadThingEmoji } from "../../thing/navigation/thing-link.ts";
import { MediaDescription } from "../content/media-description.ts";
import { type MediaLocationMode, MediaLocations } from "../content/media-locations.ts";
import { MediaSubject } from "../content/media-subject.ts";
import { MediaThingLinks } from "../content/media-thing-links.ts";
import { Heading } from "../content/heading.ts";
import { fromNullable } from "../../../commons/collections/maybe.ts";
import { MEDIA_LOCATION_MODES } from "../../../constants/display.ts";

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

function drawRow(label: string, value: m.Children): m.Children {
  return m("tr", [m(Heading, { text: label }), value]);
}

function drawDescriptionRow(media: Media): m.Children {
  if (!media.description && !media.summary) {
    return null;
  }

  const description = m(MediaDescription, {
    description: fromNullable(media.description),
    summary: fromNullable(media.summary),
  });
  return drawRow("Description", description);
}

function drawLocationRow(
  attrs: MediaComponentAttrs,
  mode: MediaLocationMode,
): m.Children {
  const { media, readThing, readEmoji } = attrs;
  const label = mode === MEDIA_LOCATION_MODES.GEOGRAPHIC
    ? "Location"
    : "Place Type";
  const locations = m(MediaLocations, {
    location: fromNullable(media.location),
    readThing,
    readEmoji,
    mode,
  });
  return drawRow(label, locations);
}

function drawThingRow(
  attrs: MediaComponentAttrs,
  label: string,
  value: string | undefined,
): m.Children {
  const { readThing, readEmoji } = attrs;
  const links = m(MediaThingLinks, {
    value: fromNullable(value),
    readThing,
    readEmoji,
  });
  return drawRow(label, links);
}

function drawSubjectRow(attrs: MediaComponentAttrs): m.Children {
  const { media, readThing, readEmoji } = attrs;
  const subject = m(MediaSubject, {
    subject: fromNullable(media.subject),
    readThing,
    readEmoji,
  });
  return drawRow("Subject", subject);
}

function viewMediaInfo(vnode: m.Vnode<MediaComponentAttrs>): m.Children {
  const { attrs } = vnode;
  const descriptionRows = [
    drawDescriptionRow(attrs.media),
    drawLocationRow(attrs, MEDIA_LOCATION_MODES.GEOGRAPHIC),
    drawLocationRow(attrs, MEDIA_LOCATION_MODES.FEATURE),
  ];
  const subjectRows = [
    drawThingRow(attrs, "Rating", attrs.media.rating),
    drawThingRow(attrs, "Style", attrs.media.style),
    drawSubjectRow(attrs),
  ];
  const rows = [...descriptionRows, ...subjectRows];

  return m("table.metadata-table", rows);
}

export function MediaInfo() {
  return { view: viewMediaInfo };
}
