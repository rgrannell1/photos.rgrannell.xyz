import type { TripleObject } from "@rgrannell1/tribbledb";

/*
 * Given a value, array of values, or undefined, return a set.
 */
export function setify<Value>(value: Value | Value[] | undefined): Set<Value> {
  if (value === undefined) {
    return new Set();
  }

  return new Set(Array.isArray(value) ? value : [value]);
}

/*
 * Collect a set of property values from a list of triple objects.
 */
export function setOf<Value>(property: string, objects: TripleObject[]): Set<Value> {
  const result = new Set<Value>();

  for (const obj of objects) {
    if (property in obj) {
      const value = obj[property] as Value | Value[] | undefined;
      if (value === undefined) {
        continue;
      }

      if (Array.isArray(value)) {
        for (const elem of value) {
          result.add(elem);
        }
      } else {
        result.add(value);
      }
    }
  }

  return result;
}
