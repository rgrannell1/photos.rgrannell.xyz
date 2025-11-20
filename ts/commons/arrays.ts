/*
 * Given a value, array of values, or undefined, return an array.
 * This is often required when dealing with relations that may have multiple values.
 */
export function arrayify<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

/*
 * Return the first value, or undefined. Often needed in cases where
 * a triple object theoretically could have multiple or missing values (e.g name)
 * but won't in practice.
 */
export function one<T>(value: T | T[] | undefined): T | undefined {
  return Array.isArray(value) ? value[0] : value;
}
