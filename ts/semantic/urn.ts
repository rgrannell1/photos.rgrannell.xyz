import { asUrn } from "@rgrannell1/tribbledb";

export function urnToUrl(urn: string) {
  const { type, id } = asUrn(urn);
  return `#/thing/${type}:${id}`;
}
