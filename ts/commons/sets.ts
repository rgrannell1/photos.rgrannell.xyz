/*
 * Given a value, array of values, or undefined, return a set.
 */
export function setify<T>(value: T | T[] | undefined): Set<T> {
  if (value === undefined) {
    return new Set();
  }

  return new Set(Array.isArray(value) ? value : [value]);
}
