import type { TripleObject } from "@rgrannell1/tribbledb";
import { logParseWarning } from "../commons/logger.ts";
import { type BaseSchema, type InferOutput, safeParse } from "valibot";

export function parseObject<
  TSchema extends BaseSchema<unknown, unknown, any>,
  TType extends string,
>(
  schema: TSchema,
  type: TType,
  object: TripleObject,
): (InferOutput<TSchema> & { type: TType }) | undefined {
  const result = safeParse(schema, object);

  if (!result.success) {
    logParseWarning(result.issues);
    return;
  }

  return { ...result.output as any, type } as InferOutput<TSchema> & {
    type: TType;
  };
}
