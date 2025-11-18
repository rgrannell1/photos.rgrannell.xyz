import type { TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { logParseWarning } from "../commons/logger.ts";
import { type BaseSchema, type InferOutput, safeParse } from "valibot";
import { readParsedThing, readParsedThings } from "../services/things.ts";

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

type Parser<T> = (tdb: TribbleDB, thing: TripleObject) => T | undefined;

export function readOne<T>(parser: Parser<T>) {
  return (tdb: TribbleDB, id: string) => {
    return readParsedThing(parser, tdb, id);
  };
}

export function readMany<T>(parser: Parser<T>) {
  return (tdb: TribbleDB, urns: Set<string>) => {
    return readParsedThings(parser, tdb, urns);
  };
}

export function readers<T>(parser: Parser<T>) {
  return {
    one: readOne(parser),
    many: readMany(parser),
  };
}
