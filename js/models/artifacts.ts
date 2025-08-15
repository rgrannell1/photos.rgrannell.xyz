import { TribbleParser } from "../library/tribble.js";

// injected into the HTLM during build-time
const CONFIG = window.envConfig;

export class TribblesArtifact {
  url: string;
  constructor(url = `/manifest/tribbles.${CONFIG.publication_id}.txt`) {
    this.url = url;
  }

  async *stream() {
    const parser = new TribbleParser();
    const response = await fetch(this.url);
    if (!response.body) {
      throw new Error("No response body");
    }

    const decoder = new TextDecoderStream();
    const reader = response.body.pipeThrough(decoder).getReader();
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
}
