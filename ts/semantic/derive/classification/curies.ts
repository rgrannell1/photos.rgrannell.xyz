/* Expand in-band CURIE values with state scoped to one triple stream. */

/* Expand in-band CURIE values with state scoped to one triple stream. */
import type { Triple } from "@rgrannell1/tribbledb";
import { CURIE_REGEX, KnownRelations } from "../../../constants/data.ts";

export type TripleProcessor = (triple: Triple) => Triple[];

type CurieState = {
  cache: Map<string, string>;
  definitions: Record<string, string>;
};

function createCurieState(): CurieState {
  return {
    cache: new Map<string, string>(),
    definitions: {},
  };
}

function isCurieDefinition(source: unknown, target: unknown): boolean {
  return typeof source === "string" && typeof target === "string";
}

function registerCurieDefinitions(state: CurieState, triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  if (rel !== KnownRelations.CURIE) {
    return [triple];
  }

  const hasStringDefinition = isCurieDefinition(src, tgt);
  if (hasStringDefinition) {
    state.definitions[tgt] = src;
    state.cache.clear();
  }

  return [];
}

function readCurieParts(value: string): RegExpMatchArray | null {
  if (!CURIE_REGEX.test(value)) {
    return null;
  }
  return value.match(CURIE_REGEX);
}

function expandMatchedCurie(
  state: CurieState,
  value: string,
  match: RegExpMatchArray,
): string {
  const prefix = match[1];
  const id = match[2];
  const definition = state.definitions[prefix];
  if (!definition) {
    return value;
  }
  const result = `${definition}${id}`;
  state.cache.set(value, result);
  return result;
}

function expandCurie(state: CurieState, value: string): string {
  const cached = state.cache.get(value);
  if (cached) {
    return cached;
  }

  const match = readCurieParts(value);
  if (!match) {
    return value;
  }

  return expandMatchedCurie(state, value, match);
}

function expandTripleCuries(state: CurieState, triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  return [[
    expandCurie(state, src),
    rel,
    expandCurie(state, tgt),
  ]];
}

export function createCurieProcessors(): TripleProcessor[] {
  const state = createCurieState();
  const register = registerCurieDefinitions.bind(null, state);
  const expand = expandTripleCuries.bind(null, state);

  return [register, expand];
}
