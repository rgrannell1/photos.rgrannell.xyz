import { asUrn, parseUrn } from "@rgrannell1/tribbledb";
import {
  SUBJECT_QUALIFIER_LABELS,
  TAXON_TYPES,
  UNQUALIFIED_SUBJECT_CONTEXTS,
} from "../constants/data.ts";
import { fromNullable, isNone, type Maybe, NONE } from "./collections/maybe.ts";

const URN_PREFIX = "urn:ró";

/** Build an album URN from its identifier. */
export const albumUrn = (id: string) => `${URN_PREFIX}:album:${id}`;
/** Build a photo URN from its identifier. */
export const photoUrn = (id: string) => `${URN_PREFIX}:photo:${id}`;
/** Build a video URN from its identifier. */
export const videoUrn = (id: string) => `${URN_PREFIX}:video:${id}`;
/** Build a place URN from a country identifier. */
export const countryUrn = (id: string) => `${URN_PREFIX}:place:${id}`;
/** Build a trip URN from its identifier. */
export const tripUrn = (id: string) => `${URN_PREFIX}:trip:${id}`;
/** Build a thing URN from a type and identifier pair. */
export const thingUrn = (pair: string) => `${URN_PREFIX}:${pair}`;

/**
 * Bare id from a URN, or the value unchanged when it is already an id.
 */
export function formatId(id: string): string {
  return id.startsWith("urn:") ? parseUrn(id).id : id;
}

/** Convert a thing URN to its hash route. */
export function urnToUrl(urn: string) {
  const { type, id } = asUrn(urn);
  return `#/thing/${type}:${id}`;
}

/** Taxon subjects are excluded from species-only displays. */
export function isTaxonUrn(urn: string): boolean {
  return TAXON_TYPES.has(asUrn(urn).type);
}

/** Read the optional context query parameter from a URN. */
export function urnContext(urn: string): Maybe<string> {
  const [, query] = urn.split("?");
  if (!query) {
    return NONE;
  }

  return fromNullable(new URLSearchParams(query).get("context"));
}

/** Only mark unusual contexts. Wild and unqualified subjects carry no label. */
export function subjectQualifier(urn: string): Maybe<string> {
  const context = urnContext(urn);
  const isUnqualifiedContext = isNone(context) ||
    UNQUALIFIED_SUBJECT_CONTEXTS.has(context);
  if (isUnqualifiedContext) {
    return NONE;
  }

  return SUBJECT_QUALIFIER_LABELS[context] ?? context;
}
