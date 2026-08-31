/* Expand in-band CURIE values with state scoped to one triple stream. */

/* Expand in-band CURIE values with state scoped to one triple stream. */
import type { Triple } from "@rgrannell1/tribbledb";
import { CURIE_REGEX, KnownRelations } from "../../../constants/data.ts";

export type TripleProcessor = (triple: Triple) => Triple[];

type CurieState = {
  cache: Map<string, string>;
  definitions: Record<string, string>;
};

/** Creates isolated CURIE definitions and expansion cache state. */
function createCurieState(): CurieState {
  return {
    cache: new Map<string, string>(),
    definitions: {},
  };
}

/** Tests whether both sides of a CURIE definition can form string mappings. */
function isCurieDefinition(source: unknown, target: unknown): boolean {
  return typeof source === "string" && typeof target === "string";
}

/** Registers CURIE triples and removes them from the processed triple stream. */
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

/** Extracts CURIE prefix and ID parts, or returns null for ordinary values. */
function readCurieParts(value: string): RegExpMatchArray | null {
  if (!CURIE_REGEX.test(value)) {
    return null;
  }
  return value.match(CURIE_REGEX);
}

/** Expands a matched CURIE when its prefix has a registered definition. */
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

/** Expands a CURIE with cached results and preserves unknown values. */
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

/** Expands CURIEs in a triple's source and target while preserving its relation. */
function expandTripleCuries(state: CurieState, triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  return [[
    expandCurie(state, src),
    rel,
    expandCurie(state, tgt),
  ]];
}

/** Creates ordered CURIE registration and expansion processors with shared state. */
export function createCurieProcessors(): TripleProcessor[] {
  const state = createCurieState();
  const register = registerCurieDefinitions.bind(null, state);
  const expand = expandTripleCuries.bind(null, state);

  return [register, expand];
}
