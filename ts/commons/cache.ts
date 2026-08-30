/* Small cache helpers for lazy data readers. */

/* Small cache helpers for lazy data readers. */
import { isSome, type Maybe } from "./collections/maybe.ts";

export type Reader<Key, Value> = (key: Key) => Value;

export function readThrough<Key, Value>(
  cache: Map<Key, Value>,
  reader: Reader<Key, Value>,
  key: Key,
): Value {
  if (cache.has(key)) {
    return cache.get(key) as Value;
  }

  const value = reader(key);
  cache.set(key, value);
  return value;
}

export function readPrefix<Key, Value>(
  keys: Key[],
  limit: number,
  cache: Map<Key, Maybe<Value>>,
  reader: Reader<Key, Maybe<Value>>,
): Value[] {
  const values: Value[] = [];

  for (const key of keys.slice(0, limit)) {
    const value = readThrough(cache, reader, key);
    if (isSome(value)) {
      values.push(value);
    }
  }

  return values;
}
