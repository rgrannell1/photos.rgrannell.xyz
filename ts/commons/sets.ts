import { fromNullable, type Maybe, NONE } from "./maybe.ts";

export function setify<Value>(value: Maybe<Value | Value[]>): Set<Value> {
  if (value === NONE) {
    return new Set();
  }

  return new Set(Array.isArray(value) ? value : [value]);
}

export function setOf<Value>(
  property: string,
  objects: Record<string, unknown>[],
): Set<Value> {
  const result = new Set<Value>();

  for (const obj of objects) {
    if (property in obj) {
      const value = fromNullable(obj[property] as Value | Value[] | undefined);
      if (value === NONE) {
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
