// Handle relations that may be single-valued, multi-valued, or absent.
// Handle relations that may be single-valued, multi-valued, or absent.
import { type Maybe, NONE } from "./maybe.ts";

/** Convert an absent, single, or multi-valued relation to an array. */
export function arrayify<Value>(value: Maybe<Value | Value[]>): Value[] {
  if (value === NONE) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

/** Selects the first value from an optional scalar or array. */
export function selectFirst<Value>(
  value: Maybe<Value | Value[]>,
): Maybe<Value> {
  const first = Array.isArray(value) ? value[0] : value;
  return first === undefined ? NONE : first as Exclude<Value, undefined>;
}
