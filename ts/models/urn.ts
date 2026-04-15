import { asUrn } from "@rgrannell1/tribbledb";

const URN_PREFIX = "urn:ró";

export const albumUrn = (id: string) => `${URN_PREFIX}:album:${id}`;
export const photoUrn = (id: string) => `${URN_PREFIX}:photo:${id}`;
export const countryUrn = (id: string) => `${URN_PREFIX}:place:${id}`;
export const typeUrn = (type: string, id: string) => `${URN_PREFIX}:${type}:${id}`;

/*
 * Convert a URN into a URL for the thing page.
 */
export function urnToUrl(urn: string) {
  const { type, id } = asUrn(urn);
  return `#/thing/${type}:${id}`;
}
