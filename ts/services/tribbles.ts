/*
 * Load tribblefile from a URL as a stream of triples.
 */

import { TribbleParser } from "tribbledb";

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
