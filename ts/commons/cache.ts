/* Small cache helpers for lazy data readers. */

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
  cache: Map<Key, Value | undefined>,
  reader: Reader<Key, Value | undefined>,
): Value[] {
  const values: Value[] = [];

  for (const key of keys.slice(0, limit)) {
    const value = readThrough(cache, reader, key);
    if (value !== undefined) {
      values.push(value);
    }
  }

  return values;
}
