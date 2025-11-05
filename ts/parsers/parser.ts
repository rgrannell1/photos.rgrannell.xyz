
import type { TripleObject } from "@rgrannell1/tribbledb";
import { logParseWarning } from "../logger.ts";

import { safeParse } from 'valibot'

export function parseObject<T>(
  schema: any, // TODO
  type: string,
  object: TripleObject,
): T | undefined {
  const result = safeParse(schema, object);
  if (!result.success) {
    logParseWarning(result.issues);
    return;
  }

  return { ...result.output, type } satisfies T;
}
