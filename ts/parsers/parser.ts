import { asUrn, type TribbleDB, type TripleObject } from "@rgrannell1/tribbledb";
import { logParseWarning } from "../commons/logger.ts";
import { type BaseSchema, type InferOutput, safeParse } from "valibot";
import { readParsedThing, readParsedThings } from "../services/things.ts";
import { one } from "../commons/arrays.ts";

type Parser<T> = (tdb: TribbleDB, thing: TripleObject) => T | undefined;

/*
 * Create a parser for a specific schema.
 *
 */
export function parseObject<
  TSchema extends BaseSchema<unknown, unknown, any>,
  TType extends string,
>(
  schema: TSchema,
  type: TType,
): (
  _: TribbleDB,
  object: TripleObject,
) => (InferOutput<TSchema> & { type: TType }) | undefined {
  return (_: TribbleDB, object: TripleObject) => {
    const result = safeParse(schema, object);

    if (!result.success) {
      logParseWarning(result.issues);
      return;
    }

    return { ...result.output as any, type } as InferOutput<TSchema> & {
      type: TType;
    };
  };
}

/*
 * Create a parser that selects the appropriate parser based on the type of the object.
 */
export function parseByType<T>(
  typeParsers: Record<string, Parser<T>>,
): Parser<T> {
  return (tdb: TribbleDB, thing: TripleObject) => {
    const { type } = asUrn(one(thing.id)!);

    const parser = typeParsers[type] ?? typeParsers["default"];
    if (!parser) {
      return undefined;
    }

    return parser(tdb, thing);
  };
}

/*
 * Create a one-item reader for a specific parser.
 */
export function readOne<T>(parser: Parser<T>) {
  return (tdb: TribbleDB, id: string) => {
    return readParsedThing(parser, tdb, id);
  };
}

/*
 * Create a many-item reader for a specific parser.
 */
export function readMany<T>(parser: Parser<T>) {
  return (tdb: TribbleDB, urns: Set<string>) => {
    return readParsedThings(parser, tdb, urns);
  };
}

/*
 * Create both one-item and many-item readers for a specific parser.
 */
export function readers<T>(parser: Parser<T>) {
  return {
    one: readOne(parser),
    many: readMany(parser),
  };
}
