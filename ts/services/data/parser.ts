import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { type TribbleDB } from "@rgrannell1/tribbledb/v2";
import { logParseWarning } from "./logger.ts";
import {
  type BaseIssue,
  type BaseSchema,
  type InferOutput,
  safeParse,
} from "valibot";
import { readParsedThing, readParsedThings } from "./entities/things.ts";
import { one } from "../../commons/collections/arrays.ts";
import { isNone, type Maybe, NONE } from "../../commons/collections/maybe.ts";

type Parser<Parsed> = (tdb: TribbleDB, thing: TripleObject) => Maybe<Parsed>;

type ParsedObject<
  TSchema extends BaseSchema<
    unknown,
    Record<string, unknown>,
    BaseIssue<unknown>
  >,
  TType extends string,
> = InferOutput<TSchema> & { type: TType };

type ParseObjectOptions<
  TSchema extends BaseSchema<
    unknown,
    Record<string, unknown>,
    BaseIssue<unknown>
  >,
  TType extends string,
> = {
  schema: TSchema;
  type: TType;
};

function logParseFailure(issues: BaseIssue<unknown>[]): typeof NONE {
  logParseWarning(issues);
  return NONE;
}

function addParsedType<
  TSchema extends BaseSchema<
    unknown,
    Record<string, unknown>,
    BaseIssue<unknown>
  >,
  TType extends string,
>(output: InferOutput<TSchema>, type: TType): ParsedObject<TSchema, TType> {
  const parsed = { ...output, type };
  return parsed as ParsedObject<TSchema, TType>;
}

function parseTypedObject<
  TSchema extends BaseSchema<
    unknown,
    Record<string, unknown>,
    BaseIssue<unknown>
  >,
  TType extends string,
>(
  options: ParseObjectOptions<TSchema, TType>,
  _: TribbleDB,
  object: TripleObject,
): Maybe<ParsedObject<TSchema, TType>> {
  const result = safeParse(options.schema, object);
  if (!result.success) {
    return logParseFailure(result.issues);
  }

  const parsed = addParsedType(result.output, options.type);
  return parsed;
}

function readTypeParser<Parsed>(
  typeParsers: Record<string, Parser<Parsed>>,
  id: string,
): Parser<Parsed> | undefined {
  const type = asUrn(id).type;
  return typeParsers[type] ?? typeParsers["default"];
}

function parseThingByType<Parsed>(
  typeParsers: Record<string, Parser<Parsed>>,
  tdb: TribbleDB,
  thing: TripleObject,
): Maybe<Parsed> {
  const id = one(thing.id);
  if (isNone(id)) {
    return NONE;
  }

  const parser = readTypeParser(typeParsers, id);
  return parser ? parser(tdb, thing) : NONE;
}

function readManyParsed<Parsed>(
  parser: Parser<Parsed>,
  tdb: TribbleDB,
  urns: Set<string>,
) {
  return readParsedThings(parser, tdb, urns);
}

function assertParser<Parsed>(parser: Parser<Parsed>): void {
  const parserType = typeof parser;
  const parserIsInvalid = parserType !== "function";
  if (parserIsInvalid) throw new Error("Parser must be a function");
}

export function parseObject<
  TSchema extends BaseSchema<
    unknown,
    Record<string, unknown>,
    BaseIssue<unknown>
  >,
  TType extends string,
>(
  schema: TSchema,
  type: TType,
): Parser<ParsedObject<TSchema, TType>> {
  const options = { schema, type };
  const parser = parseTypedObject.bind(null, options);
  return parser as Parser<ParsedObject<TSchema, TType>>;
}

export function parseByType<Parsed>(
  typeParsers: Record<string, Parser<Parsed>>,
): Parser<Parsed> {
  const parser = parseThingByType.bind(null, typeParsers);
  return parser as Parser<Parsed>;
}

export function readOne<Parsed>(parser: Parser<Parsed>) {
  return (tdb: TribbleDB, id: string) => {
    return readParsedThing(parser, tdb, id);
  };
}

export function readMany<Parsed>(parser: Parser<Parsed>) {
  const checkedParser = parser;
  assertParser(checkedParser);
  const reader = readManyParsed.bind(null, checkedParser);
  return reader as (tdb: TribbleDB, urns: Set<string>) => Parsed[];
}

export function readers<Parsed>(parser: Parser<Parsed>) {
  return {
    one: readOne(parser),
    many: readMany(parser),
  };
}
