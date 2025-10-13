import { z } from "zod";
import { TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { Subject } from "../types.ts";

// TODO subjects are varied, but for the moment they have a few common properties
// In future, type map them individually so we can render them in custom ways.

const SubjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  wikipedia: z.string().optional(),
});

export function parseSubject(
  _: TribbleDB,
  subject: TripleObject,
): Subject | undefined {
  const result = SubjectSchema.safeParse(subject);
  if (!result.success) {
    console.error(result.error.issues);
    return;
  }

  return result.data satisfies Subject;
}
