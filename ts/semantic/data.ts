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
import { TRIBBLE_STREAM_BATCH_SIZE } from "../constants/data.ts";

type LineBatch = {
  lines: string[];
  remainder: string;
};

/** Split a decoded stream chunk into complete lines and one remainder. */
function splitLines(buffer: string, chunk: string): LineBatch {
  const lines = `${buffer}${chunk}`.split("\n");
  const remainder = lines.pop() ?? "";
  return { lines, remainder };
}

/** Yield complete lines from a text stream, including its final partial line. */
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

/** Copy and clear a mutable triple batch. */
function drainTriples(triples: Triple[]): Triple[] {
  const batch = [...triples];
  triples.length = 0;
  return batch;
}

/** Parse one line and append its triple when the parser produces one. */
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

/** Report whether a triple batch reached its stream yield threshold. */
function hasFullTripleBatch(triples: Triple[]): boolean {
  return triples.length >= TRIBBLE_STREAM_BATCH_SIZE;
}

/** Fetch Tribble data and yield parsed triples in bounded batches. */
export async function* streamTribbles(url: string): AsyncGenerator<Triple[]> {
  const parser = new TribbleParser();
  const res = await fetch(url);
  if (!res.body) {
    throw new Error("No response body");
  }

  const decoder = new TextDecoderStream();
  const reader = res.body.pipeThrough(decoder).getReader();
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
/** Return the shared database, creating it with the first supplied schema. */
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
/** Load streamed triples into the shared database and report each added batch. */
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
