import { asUrn, TribbleDB } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { KnownTypes } from "../constants.ts";
import { SubjectSchema } from "./schemas.ts";
import { logParseWarning } from "../commons/logger.ts";
import { safeParse } from "valibot";
import {
  parseAmphibian,
  parseBird,
  parseInsect,
  parseMammal,
  parseReptile,
} from "./parsers.ts";

// TODO swap

/* */
export function parseSubject(
  _: TribbleDB,
  subject: TripleObject,
) {
  const parsed = asUrn(subject.id as string);

  if (parsed.type === KnownTypes.BIRD) {
    return parseBird(_, subject);
  } else if (parsed.type === KnownTypes.MAMMAL) {
    return parseMammal(_, subject);
  } else if (parsed.type === KnownTypes.REPTILE) {
    return parseReptile(_, subject);
  } else if (parsed.type === KnownTypes.AMPHIBIAN) {
    return parseAmphibian(_, subject);
  } else if (parsed.type === KnownTypes.INSECT) {
    return parseInsect(_, subject);
  }

  // for other subjects
  const result = safeParse(SubjectSchema, subject);
  if (!result.success) {
    logParseWarning(result.issues);
    return;
  }

  return result.output;
}
