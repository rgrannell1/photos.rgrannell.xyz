import { asUrn, TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { Amphibian, Bird, Insect, Mammal, Reptile, Subject } from "../types.ts";
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

/*
 * Parse a bird subject
 */
export function parseBird(
  _: TribbleDB,
  subject: TripleObject,
): Bird | undefined {
  return parseObject(BirdSchema, "bird", subject);
}

/*
 * Parse a mammall
 */
export function parseMammal(
  _: TribbleDB,
  subject: TripleObject,
): Mammal | undefined {
  return parseObject(MammalSchema, "mammal", subject);
}

/* */
export function parseReptile(
  _: TribbleDB,
  subject: TripleObject,
): Reptile | undefined {
  return parseObject(ReptileSchema, "reptile", subject);
}

/* */
export function parseAmphibian(
  _: TribbleDB,
  subject: TripleObject,
): Amphibian | undefined {
  return parseObject(AmphibianSchema, "amphibian", subject);
}

/* */
export function parseInsect(
  _: TribbleDB,
  subject: TripleObject,
): Insect | undefined {
  return parseObject(InsectSchema, "insect", subject);
}

/* */
export function parseSubject(
  _: TribbleDB,
  subject: TripleObject,
): Subject | undefined {
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
  const result = SubjectSchema.safeParse(subject);
  if (!result.success) {
    console.error(result.error.issues);
    return;
  }

  return result.data satisfies Subject;
}
