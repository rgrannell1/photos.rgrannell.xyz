import { asUrn, parseUrn } from "@rgrannell1/tribbledb";
import {
  SUBJECT_QUALIFIER_LABELS,
  TAXON_TYPES,
  UNQUALIFIED_SUBJECT_CONTEXTS,
} from "../constants/data.ts";

const URN_PREFIX = "urn:ró";

export const albumUrn = (id: string) => `${URN_PREFIX}:album:${id}`;
export const photoUrn = (id: string) => `${URN_PREFIX}:photo:${id}`;
export const videoUrn = (id: string) => `${URN_PREFIX}:video:${id}`;
export const countryUrn = (id: string) => `${URN_PREFIX}:place:${id}`;
export const tripUrn = (id: string) => `${URN_PREFIX}:trip:${id}`;
// a thing page pair, e.g "bird:robin", as a full URN
export const thingUrn = (pair: string) => `${URN_PREFIX}:${pair}`;

/*
 * Bare id from a URN, or the value unchanged when it is already an id.
 */
export function formatId(id: string): string {
  return id.startsWith("urn:") ? parseUrn(id).id : id;
}

/*
 * Convert a URN into a URL for the thing page.
 */
export function urnToUrl(urn: string) {
  const { type, id } = asUrn(urn);
  return `#/thing/${type}:${id}`;
}

/*
 * Is this a taxon URN (genus, family, order)? Derived taxon subjects are
 * excluded from subject displays, which show species only.
 */
export function isTaxonUrn(urn: string): boolean {
  return TAXON_TYPES.has(asUrn(urn).type);
}

/*
 * The ?context= value of a URN, e.g "captive" from
 * "urn:ró:bird:inca-tern?context=captive".
 */
export function urnContext(urn: string): string | undefined {
  const [, query] = urn.split("?");
  if (!query) {
    return undefined;
  }

  return new URLSearchParams(query).get("context") ?? undefined;
}

/*
 * The chip label for a subject URN, e.g "captive". Wild subjects and subjects
 * with no context get none, so only the unusual case is marked.
 */
export function subjectQualifier(urn: string): string | undefined {
  const context = urnContext(urn);
  if (!context || UNQUALIFIED_SUBJECT_CONTEXTS.has(context)) {
    return undefined;
  }

  return SUBJECT_QUALIFIER_LABELS[context] ?? context;
}
