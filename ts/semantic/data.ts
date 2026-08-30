/*
 * Load tribblefile from a URL as a stream of triples.
 */

/*
 * Load tribblefile from a URL as a stream of triples.
 */
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { TargetValidator, Triple } from "@rgrannell1/tribbledb";
import { TribbleParser } from "@rgrannell1/tribbledb";
import { isNone, type Maybe, NONE } from "../commons/collections/maybe.ts";

type LineBatch = {
  lines: string[];
  remainder: string;
};

function splitLines(buffer: string, chunk: string): LineBatch {
  const lines = `${buffer}${chunk}`.split("\n");
  const remainder = lines.pop() ?? "";
  return { lines, remainder };
}

async function* streamLines(
  reader: ReadableStreamDefaultReader<string>,
): AsyncGenerator<string> {
  let buffer = "";
  while (true) {
    const chunk = await reader.read();
    if (chunk.done) {
      break;
    }
    const batch = splitLines(buffer, chunk.value);
    buffer = batch.remainder;
    yield* batch.lines;
  }
  if (buffer.length > 0) {
    yield buffer;
  }
}

function drainTriples(triples: Triple[]): Triple[] {
  const batch = [...triples];
  triples.length = 0;
  return batch;
}

function collectTriple(
  parser: TribbleParser,
  line: string,
  triples: Triple[],
): void {
  const triple = parser.parse(line);
  if (triple !== undefined) {
    triples.push(triple);
  }
}

function hasFullTripleBatch(triples: Triple[]): boolean {
  return triples.length >= 500;
}

export async function* streamTribbles(url: string): AsyncGenerator<Triple[]> {
  const parser = new TribbleParser();
  const res = await fetch(url);
  if (!res.body) {
    throw new Error("No response body");
  }

  const decoder = new TextDecoderStream();
  const reader = res.body.pipeThrough(decoder).getReader();
  // batch the yields; 20k single yields is too slow. 500 measured about right
  const tripleBuffer: Triple[] = [];
  for await (const line of streamLines(reader)) {
    collectTriple(parser, line, tripleBuffer);
    if (hasFullTripleBatch(tripleBuffer)) {
      yield drainTriples(tripleBuffer);
    }
  }
  if (tripleBuffer.length > 0) {
    yield drainTriples(tripleBuffer);
  }
}

let tdb: Maybe<TribbleDB> = NONE;

/*
 * Shared TribbleDB. Starts empty so the app can mount before the stream fills it.
 */
export function getTribbleDB(
  schema: Record<string, TargetValidator> = {},
): TribbleDB {
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
    const derivedTriples = triples.flatMap(perTriple);
    target.add(derivedTriples);
    onBatch?.();
  }

  return target;
}
