/* Expand in-band CURIE values with state scoped to one triple stream. */

import type { Triple } from "@rgrannell1/tribbledb";
import { CURIE_REGEX, KnownRelations } from "../../constants/data.ts";

export type TripleProcessor = (triple: Triple) => Triple[];

type CurieState = {
  cache: Map<string, string>;
  definitions: Record<string, string>;
};

function registerCurieDefinitions(state: CurieState, triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  if (rel !== KnownRelations.CURIE) {
    return [triple];
  }

  const hasStringDefinition = typeof src === "string" && typeof tgt === "string";
  if (hasStringDefinition) {
    state.definitions[tgt] = src;
    state.cache.clear();
  }

  return [];
}

function expandCurie(state: CurieState, value: string): string {
  const cached = state.cache.get(value);
  if (cached) {
    return cached;
  }

  if (!CURIE_REGEX.test(value)) {
    return value;
  }
  const match = value.match(CURIE_REGEX);
  if (!match) {
    return value;
  }

  const prefix = match[1];
  const id = match[2];
  if (!state.definitions[prefix]) {
    return value;
  }

  const result = `${state.definitions[prefix]}${id}`;
  state.cache.set(value, result);
  return result;
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
  const state: CurieState = {
    cache: new Map<string, string>(),
    definitions: {},
  };

  return [
    registerCurieDefinitions.bind(null, state),
    expandTripleCuries.bind(null, state),
  ];
}
