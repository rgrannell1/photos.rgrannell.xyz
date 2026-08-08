import { asUrn, parseUrn } from "@rgrannell1/tribbledb";
import { TAXON_TYPES } from "../constants/data.ts";

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
