/*
 * Load tribblefile from a URL as a stream of triples.
 */

import { TribbleDB, Triple } from "@rgrannell1/tribbledb";
import { TribbleParser } from "@rgrannell1/tribbledb";

/*
 * Stream triples from a URL
 */
export async function* streamTribbles(url: string) {
  const parser = new TribbleParser();
  const res = await fetch(url);
  if (!res.body) {
    throw new Error("No response body");
  }

  const decoder = new TextDecoderStream();
  const reader = res.body.pipeThrough(decoder).getReader();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    buffer += value;
    let lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const triple = parser.parse(line);
      if (triple !== undefined) {
        yield triple;
      }
    }
  }

  // parse any remaining line in buffer
  if (buffer.length > 0) {
    const triple = parser.parse(buffer);
    if (triple !== undefined) {
      yield triple;
    }
  }
}

let tdb: TribbleDB | null = null;

/*
 * Load triples from a URL
 */
export async function loadTriples(
  url: string,
  schema: Record<string, any> = {},
  fn: (triple: Triple) => Triple[] = (x) => [x],
): Promise<TribbleDB> {
  const buffer: Triple[] = [];

  if (!tdb) {
    tdb = new TribbleDB([], schema);
  }

  for await (const triple of streamTribbles(url)) {
    buffer.push(...[triple].flatMap(fn));

    if (buffer.length > 500) {
      tdb.add(buffer);
      buffer.length = 0;
    }
  }

  tdb.add(buffer);
  return tdb;
}
