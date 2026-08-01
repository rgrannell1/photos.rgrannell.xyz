/*
 * Load tribblefile from a URL as a stream of triples.
 */

import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Triple } from "@rgrannell1/tribbledb";
import { TribbleParser } from "@rgrannell1/tribbledb";

/*
 * Stream triples from a URL
 *
 * @param url The URL to fetch triples from
 */
export async function* streamTribbles(url: string): AsyncGenerator<Triple[]> {
  const parser = new TribbleParser();
  const res = await fetch(url);
  if (!res.body) {
    throw new Error("No response body");
  }

  const decoder = new TextDecoderStream();
  const reader = res.body.pipeThrough(decoder).getReader();
  let buffer = "";

  // rather than yield 20k times, yield a few larger batches...
  // experimentally, 500 items seems about right
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

  // parse any remaining line in buffer
  if (buffer.length > 0) {
    const triple = parser.parse(buffer);
    if (triple !== undefined) {
      tripleBuffer.push(triple);
    }
  }

  // and yield any leftover triples
  if (tripleBuffer.length > 0) {
    yield [...tripleBuffer];
  }
}

let tdb: TribbleDB | null = null;

/*
 * The shared TribbleDB instance. Created empty so the app can mount and
 * bind services before the tribble stream fills it.
 */
export function getTribbleDB(schema: Record<string, any> = {}): TribbleDB {
  if (!tdb) {
    tdb = new TribbleDB([], schema);
  }

  return tdb;
}

/*
 * Load triples from a URL into the shared TribbleDB. Batches stream in;
 * onBatch fires after each batch lands, so the caller can derive and redraw
 * while the load is in flight.
 */
export async function loadTriples(
  url: string,
  schema: Record<string, any> = {},
  perTriple: (triple: Triple) => Triple[] = (x) => [x],
  onBatch?: () => void,
): Promise<TribbleDB> {
  const target = getTribbleDB(schema);

  for await (const triples of streamTribbles(url)) {
    target.add(triples.flatMap(perTriple));
    onBatch?.();
  }

  return target;
}
