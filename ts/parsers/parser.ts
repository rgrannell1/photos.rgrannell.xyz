import { TribbleDB, TripleObject } from "@rgrannell1/tribbledb";

export function parseObject<T>(
  schema: Zod.ZodSchema,
  type: string,
  object: TripleObject,
): T | undefined {
  const result = schema.safeParse(object);
  if (!result.success) {
    console.error(result.error.issues);
    return;
  }

  return { ...result.data, type } satisfies T;
}
