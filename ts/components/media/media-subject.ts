/* The subject metadata cell for photos and videos. */

import m from "mithril";
import { arrayify } from "../../commons/arrays.ts";
import { isNone, type Maybe } from "../../commons/maybe.ts";
import { isTaxonUrn, subjectQualifier } from "../../commons/urn.ts";
import type { ReadThingEmoji } from "../thing/thing-link.ts";
import { toThingLinks, type ReadThing } from "../thing/thing-links.ts";

type MediaSubjectAttrs = {
  subject: Maybe<string | string[]>;
  readThing: ReadThing;
  readEmoji: ReadThingEmoji;
};

/* One subject, with a qualifier chip when it was not seen in the wild. */
function drawSubject(
  readThing: ReadThing,
  readEmoji: ReadThingEmoji,
  urn: string,
): m.Children[] {
  const $links = toThingLinks(readThing, readEmoji, [urn]);
  if ($links.length === 0) {
    return [];
  }

  const qualifier = subjectQualifier(urn);
  const $qualifier = isNone(qualifier)
    ? null
    : m("span.subject-qualifier", qualifier);

  return [m(".subject-entry", [$links, $qualifier])];
}

function viewMediaSubject(vnode: m.Vnode<MediaSubjectAttrs>): m.Children {
  const { subject, readThing, readEmoji } = vnode.attrs;

  // derived taxon subjects stay out of the subject row
  const subjects = isNone(subject)
    ? []
    : arrayify(subject).filter((urn) => !isTaxonUrn(urn));
  const $subject = subjects.flatMap(drawSubject.bind(null, readThing, readEmoji));
  return m("td", $subject.length > 0 ? $subject : "—");
}

export function MediaSubject() {
  return { view: viewMediaSubject };
}
