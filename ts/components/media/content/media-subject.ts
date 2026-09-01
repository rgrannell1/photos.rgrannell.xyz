/* The subject metadata cell for photos and videos. */

import m from "mithril";
import { arrayify } from "../../../commons/collections/arrays.ts";
import { isNone, type Maybe } from "../../../commons/collections/maybe.ts";
import { isTaxonUrn, readSubjectQualifier } from "../../../commons/urn.ts";
import type { ReadThingEmoji } from "../../thing/navigation/thing-link.ts";
import {
  type ReadThing,
  toThingLinks,
} from "../../thing/navigation/thing-links.ts";

type MediaSubjectAttrs = {
  subject: Maybe<string | string[]>;
  readThing: ReadThing;
  readEmoji: ReadThingEmoji;
};

/** Draw the observation qualifier when the subject has one. */
function drawQualifier(urn: string): m.Children {
  const qualifier = readSubjectQualifier(urn);
  if (isNone(qualifier)) {
    return null;
  }
  const $chip = m("span.subject-qualifier", qualifier);
  return $chip;
}

/** One subject, with a qualifier chip when it was not seen in the wild. */
function drawSubject(
  readThing: ReadThing,
  readEmoji: ReadThingEmoji,
  urn: string,
): m.Children[] {
  const $links = toThingLinks(readThing, readEmoji, [urn]);
  if ($links.length === 0) {
    return [];
  }

  const $qualifier = drawQualifier(urn);
  return [m(".subject-entry", [$links, $qualifier])];
}

/** Keep explicit subjects and exclude derived taxon subjects. */
function selectSubjects(subject: Maybe<string | string[]>): string[] {
  if (isNone(subject)) {
    return [];
  }
  const urns = arrayify(subject);
  const subjects = urns.filter((urn) => !isTaxonUrn(urn));
  return subjects;
}

/** Draw all linked subject entries. */
function drawSubjects(
  attrs: MediaSubjectAttrs,
  subjects: string[],
): m.Children[] {
  const draw = drawSubject.bind(null, attrs.readThing, attrs.readEmoji);
  const components = subjects.flatMap(draw);
  return components;
}

/** Use an em dash when media has no displayable subjects. */
function drawSubjectContent(subjects: m.Children[]): m.Children {
  const hasSubjects = subjects.length > 0;
  return hasSubjects ? subjects : "—";
}

/** Draw the subject metadata cell for a photo or video. */
function viewMediaSubject(vnode: m.Vnode<MediaSubjectAttrs>): m.Children {
  // derived taxon subjects stay out of the subject row
  const subjects = selectSubjects(vnode.attrs.subject);
  const $subject = drawSubjects(vnode.attrs, subjects);
  const $content = drawSubjectContent($subject);
  return m("td", $content);
}

/** Create the media subject cell component. */
export function MediaSubject(): m.Component<MediaSubjectAttrs> {
  return { view: viewMediaSubject };
}
