import { asUrn, TribbleDB } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { KnownTypes } from "../constants.ts";
import {
  AmphibianSchema,
  BirdSchema,
  InsectSchema,
  MammalSchema,
  ReptileSchema,
  SubjectSchema,
} from "./schemas.ts";
import { parseObject } from "./parser.ts";
import { logParseWarning } from "../commons/logger.ts";
import { safeParse } from "valibot";

/*
 * Parse a bird subject
 */
export function parseBird(
  _: TribbleDB,
  subject: TripleObject,
) {
  return parseObject(BirdSchema, "bird", subject);
}

/*
 * Parse a mammal
 */
export function parseMammal(
  _: TribbleDB,
  subject: TripleObject,
) {
  return parseObject(MammalSchema, "mammal", subject);
}

/* */
export function parseReptile(
  _: TribbleDB,
  subject: TripleObject,
) {
  return parseObject(ReptileSchema, "reptile", subject);
}

/* */
export function parseAmphibian(
  _: TribbleDB,
  subject: TripleObject,
) {
  return parseObject(AmphibianSchema, "amphibian", subject);
}

/* */
export function parseInsect(
  _: TribbleDB,
  subject: TripleObject,
) {
  return parseObject(InsectSchema, "insect", subject);
}

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
