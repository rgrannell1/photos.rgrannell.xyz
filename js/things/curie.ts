
import { Triple } from "../types.ts";

export const CURIES = {
  "i": "urn:ró:",
  "birdwatch": "https://birdwatchireland.ie/birds/",
  "photos": "https://photos-cdn.rgrannell.xyz/",
  "wiki": "https://en.wikipedia.org/wiki/",
};

const CURIE_REGEX = /^\[([a-z]*):(.*)\]$/;

export function expandCurie(curies: Record<string, string>, value: string) {
  if (typeof value !== "string" || !CURIE_REGEX.test(value)) {
    return value;
  }
  const match = value.match(CURIE_REGEX);

  if (!match) {
    return value;
  }

  const prefix = match[1];
  const id = match[2];

  return curies[prefix] ? `${curies[prefix]}${id}` : value;
}

export function expandTripleCuries(
  curies: Record<string, string>,
  triple: Triple,
) {
  const [source, relation, target] = triple;

  return [
    [
      expandCurie(curies, source),
      relation,
      expandCurie(curies, target),
    ],
  ];
}
