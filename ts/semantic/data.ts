/*
 * Load tribblefile from a URL as a stream of triples.
 */

import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { TargetValidator, Triple } from "@rgrannell1/tribbledb";
import { TribbleParser } from "@rgrannell1/tribbledb";
import { isNone, type Maybe, NONE } from "../commons/maybe.ts";

export async function* streamTribbles(url: string): AsyncGenerator<Triple[]> {
  const parser = new TribbleParser();
  const res = await fetch(url);
  if (!res.body) {
    throw new Error("No response body");
  }

  const decoder = new TextDecoderStream();
  const reader = res.body.pipeThrough(decoder).getReader();
  let buffer = "";

  // batch the yields; 20k single yields is too slow. 500 measured about right
  const tripleBuffer: Triple[] = [];

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    buffer += value;
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const triple = parser.parse(line);
      if (triple !== undefined) {
        tripleBuffer.push(triple);
      }

      if (tripleBuffer.length >= 500) {
        yield [...tripleBuffer];
        tripleBuffer.length = 0;
      }
    }
  }

  if (buffer.length > 0) {
    const triple = parser.parse(buffer);
    if (triple !== undefined) {
      tripleBuffer.push(triple);
    }
  }

  if (tripleBuffer.length > 0) {
    yield [...tripleBuffer];
  }
}

let tdb: Maybe<TribbleDB> = NONE;

/*
 * Shared TribbleDB. Starts empty so the app can mount before the stream fills it.
 */
export function getTribbleDB(schema: Record<string, TargetValidator> = {}): TribbleDB {
  if (isNone(tdb)) {
    tdb = new TribbleDB([], schema);
  }

  return tdb;
}

/*
 * Load triples from a URL into the shared TribbleDB. onBatch fires after each
 * batch, so the caller can derive and redraw during the load.
 */
export async function loadTriples(
  url: string,
  schema: Record<string, TargetValidator> = {},
  perTriple: (triple: Triple) => Triple[] = (triple) => [triple],
  onBatch?: () => void,
): Promise<TribbleDB> {
  const target = getTribbleDB(schema);

  for await (const triples of streamTribbles(url)) {
    target.add(triples.flatMap(perTriple));
    onBatch?.();
  }

  return target;
}
