// Handle relations that may be single-valued, multi-valued, or absent.
// Handle relations that may be single-valued, multi-valued, or absent.
import { type Maybe, NONE } from "./maybe.ts";

export function arrayify<Value>(value: Maybe<Value | Value[]>): Value[] {
  if (value === NONE) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

// Triple objects may hold multi-valued properties but often carry only one value.
export function one<Value>(
  value: Maybe<Value | Value[]>,
): Maybe<Value> {
  const first = Array.isArray(value) ? value[0] : value;
  return first === undefined ? NONE : first as Exclude<Value, undefined>;
}
