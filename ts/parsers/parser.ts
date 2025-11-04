import { TripleObject } from "@rgrannell1/tribbledb";
import { logParseWarning } from "../logger.ts";

export function parseObject<T>(
  schema: Zod.ZodSchema,
  type: string,
  object: TripleObject,
): T | undefined {
  const result = schema.safeParse(object);
  if (!result.success) {
    logParseWarning(result.error.issues);
    return;
  }

  return { ...result.data, type } satisfies T;
}
