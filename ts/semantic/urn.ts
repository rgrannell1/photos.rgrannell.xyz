import { asUrn } from "@rgrannell1/tribbledb";

/*
 * Convert a URN into a URL for the thing page.
 */
export function urnToUrl(urn: string) {
  const { type, id } = asUrn(urn);
  return `#/thing/${type}:${id}`;
}


export function urn(type: string, id: string) {
  return `urn:ró:${type}:${id}`;
}
