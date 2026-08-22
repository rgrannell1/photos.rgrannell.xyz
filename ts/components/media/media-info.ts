/*
 * The shared metadata table for photos and videos: description, location,
 * place type, rating, style, and subject rows.
 */

import m from "mithril";
import { toThingLinks } from "../thing/thing-links.ts";
import type { Services } from "../../types.ts";
import { arrayify } from "../../commons/arrays.ts";
import { isTaxonUrn, subjectQualifier } from "../../commons/urn.ts";
import { preprocessDescription } from "../../commons/strings.ts";
import { MediaLocations } from "./media-locations.ts";
import { Heading } from "./heading.ts";

// the structural overlap of Photo and Video that the table reads
type Media = {
  description?: string | undefined;
  summary?: string | undefined;
  location?: string | string[] | undefined;
  rating?: string | undefined;
  style?: string | undefined;
  subject?: string | string[] | undefined;
};

type MediaComponentAttrs = {
  media: Media;
  services: Services;
};

function viewDescription(vnode: m.Vnode<MediaComponentAttrs>): m.Children {
  const { media } = vnode.attrs;

  const html = preprocessDescription(
    media.description ?? media.summary ?? "",
  );
  if (html) {
    return m("td", m.trust(html));
  }

  return m("td", "—");
}

function Description() {
  return { view: viewDescription };
}

function viewRating(vnode: m.Vnode<MediaComponentAttrs>): m.Children {
  const { media, services } = vnode.attrs;

  const $rating = toThingLinks(services, [media.rating]);
  return m("td", $rating.length > 0 ? $rating : "—");
}

function Rating() {
  return { view: viewRating };
}

function viewStyle(vnode: m.Vnode<MediaComponentAttrs>): m.Children {
  const { media, services } = vnode.attrs;

  const $style = toThingLinks(services, [media.style]);
  return m("td", $style.length > 0 ? $style : "—");
}

function Style() {
  return { view: viewStyle };
}

/*
 * One subject, with its context chip alongside when the subject was not seen
 * in the wild.
 */
function drawSubject(services: Services, urn: string): m.Children[] {
  const $links = toThingLinks(services, [urn]);
  if ($links.length === 0) {
    return [];
  }

  const qualifier = subjectQualifier(urn);
  const $qualifier = qualifier
    ? m("span.subject-qualifier", qualifier)
    : null;

  return [m(".subject-entry", [$links, $qualifier])];
}

function viewSubject(vnode: m.Vnode<MediaComponentAttrs>): m.Children {
  const { media, services } = vnode.attrs;

  // derived taxon subjects stay out of the subject row; species only
  const subjects = arrayify(media.subject)
    .filter((subject) => !isTaxonUrn(subject));

  const $subject = subjects.flatMap(drawSubject.bind(null, services));
  return m("td", $subject.length > 0 ? $subject : "—");
}

function Subject() {
  return { view: viewSubject };
}

function viewMediaInfo(vnode: m.Vnode<MediaComponentAttrs>): m.Children {
  const { media, services } = vnode.attrs;

  const infoItems = [];

  if (media.description || media.summary) {
    infoItems.push(m("tr", [
      m(Heading, { text: "Description" }),
      m(Description, { media, services }),
    ]));
  }

  infoItems.push(
    m("tr", [
      m(Heading, { text: "Location" }),
      m(MediaLocations, { location: media.location, services, mode: "geographic" }),
    ]),
    m("tr", [
      m(Heading, { text: "Place Type" }),
      m(MediaLocations, { location: media.location, services, mode: "feature" }),
    ]),
    m("tr", [
      m(Heading, { text: "Rating" }),
      m(Rating, { media, services }),
    ]),
    m("tr", [
      m(Heading, { text: "Style" }),
      m(Style, { media, services }),
    ]),
    m("tr", [
      m(Heading, { text: "Subject" }),
      m(Subject, { media, services }),
    ]),
  );

  return m("table.metadata-table", infoItems);
}

export function MediaInfo() {
  return { view: viewMediaInfo };
}
