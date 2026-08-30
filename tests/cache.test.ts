/* Lazy reader cache tests. */

import { readPrefix, readThrough } from "../ts/commons/cache.ts";
import { NONE } from "../ts/commons/collections/maybe.ts";

Deno.test("readThrough: reads each requested key once", () => {
  const cache = new Map<string, string | typeof NONE>();
  const calls: string[] = [];
  const reader = (key: string) => {
    calls.push(key);
    return key === "known" ? "value" : NONE;
  };

  readThrough(cache, reader, "known");
  readThrough(cache, reader, "known");
  readThrough(cache, reader, "missing");
  readThrough(cache, reader, "missing");

  if (calls.join(",") !== "known,missing") {
    throw new Error(`expected one read per key, got ${calls.join(",")}`);
  }
});

Deno.test("readPrefix: reads only newly requested keys", () => {
  const cache = new Map<string, string | typeof NONE>();
  const calls: string[] = [];
  const reader = (key: string) => {
    calls.push(key);
    return key;
  };
  const keys = ["first", "second", "third"];

  readPrefix(keys, 1, cache, reader);
  readPrefix(keys, 1, cache, reader);
  readPrefix(keys, 3, cache, reader);

  if (calls.join(",") !== keys.join(",")) {
    throw new Error(`expected prefix reads, got ${calls.join(",")}`);
  }
});
