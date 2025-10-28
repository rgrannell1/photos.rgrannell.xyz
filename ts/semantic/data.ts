/*
 * Load tribblefile from a URL as a stream of triples.
 */

import m from "mithril";
import { TribbleDB, Triple } from "@rgrannell1/tribbledb";
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
 * Load triples from a URL. This takes about 500ms to run (Oct 27 2025) and
 * takes about 60% of load-time of the page. This needs to be reworked, as in the litelemet
 * version, to incrementally stream load the database while allowing the page to render.
 *
 * For now, lets make blocking load faster than 500ms...
 *
 * October 28 2025: about 250ms now
 */
export async function loadTriples(
  url: string,
  schema: Record<string, any> = {},
  fn: (triple: Triple) => Triple[] = (x) => [x],
): Promise<TribbleDB> {
  if (!tdb) {
    tdb = new TribbleDB([], schema);
  }

  for await (const triples of streamTribbles(url)) {
    for (const triple of triples) {
      tdb.add(fn(triple));
    }
  }

  return tdb;
}
