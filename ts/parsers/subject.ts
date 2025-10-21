import { z } from "zod";
import { asUrn, TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { Amphibian, Bird, Insect, Mammal, Reptile, Subject } from "../types.ts";
import { KnownTypes } from "../constants.ts";

const BirdSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  wikipedia: z.string().optional(),
  birdwatchUrl: z.union([z.string(), z.array(z.string())]).optional(),
});

/*
 *
 */
export function parseBird(
  _: TribbleDB,
  subject: TripleObject,
): Bird | undefined {
  const result = BirdSchema.safeParse(subject);
  if (!result.success) {
    console.error(result.error.issues);
    return;
  }

  return { ...result.data, type: "bird" } satisfies Bird;
}

const MammalSchema = z.object({
  id: z.string(),
  name: z.string(),
  wikipedia: z.string().optional(),
});

/*
 *
 */
export function parseMammal(
  _: TribbleDB,
  subject: TripleObject,
): Mammal | undefined {
  const result = MammalSchema.safeParse(subject);
  if (!result.success) {
    console.error(result.error.issues);
    return;
  }

  return { ...result.data, type: "mammal" } satisfies Mammal;
}

const ReptileSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  wikipedia: z.string().optional(),
});

/*
 *
 */
export function parseReptile(
  _: TribbleDB,
  subject: TripleObject,
): Reptile | undefined {
  const result = ReptileSchema.safeParse(subject);
  if (!result.success) {
    console.error(result.error.issues);
    return;
  }

  return { ...result.data, type: "reptile" } satisfies Reptile;
}

const AmphibianSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  wikipedia: z.string().optional(),
});

/*
 *
 */
export function parseAmphibian(
  _: TribbleDB,
  subject: TripleObject,
): Amphibian | undefined {
  const result = AmphibianSchema.safeParse(subject);
  if (!result.success) {
    console.error(result.error.issues);
    return;
  }

  return { ...result.data, type: "amphibian" } satisfies Amphibian;
}

const InsectSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  wikipedia: z.string().optional(),
});

/*
 *
 */
export function parseInsect(
  _: TribbleDB,
  subject: TripleObject,
): Insect | undefined {
  const result = InsectSchema.safeParse(subject);
  if (!result.success) {
    console.error(result.error.issues);
    return;
  }

  return { ...result.data, type: "insect" } satisfies Insect;
}

const SubjectSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  wikipedia: z.string().optional(),
});

/*
 *
 */
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
