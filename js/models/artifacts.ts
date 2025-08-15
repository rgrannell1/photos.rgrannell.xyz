import {
  ALBUMS_SYMBOL,
  IMAGES_SYMBOL,
  TRIPLES_SYMBOL,
} from "../constants.js";
import { TribbleParser } from "../library/tribble.js";

// injected into the HTLM during build-time
const CONFIG = window.envConfig;

export class ImagesArtifact {
  _data;

  constructor(url = `/manifest/images.${CONFIG.publication_id}.json`) {
    this.url = url;
  }

  processImages(images) {
    const headers = images[0];

    const output = [];

    for (const image of images.slice(1)) {
      const data = {};

      for (let idx = 0; idx < headers.length; idx++) {
        data[headers[idx]] = image[idx];
      }

      output.push(data);
    }

    return output;
  }

  async init() {
    if (window[IMAGES_SYMBOL]) {
      this._data = window[IMAGES_SYMBOL];
    }

    if (this._data || this.loading) {
      return;
    }

    console.log(`🔎 fetching ${this.url}`);

    const images = await (await fetch(this.url)).json();

    const processed = this.processImages(images);
    window[IMAGES_SYMBOL] = processed;

    this._data = processed;
  }

  images() {
    return this._data.map((image) => {
      return {
        ...image,
        full_image: `https://photos-cdn.rgrannell.xyz${image.full_image}`,
        thumbnail_url: `https://photos-cdn.rgrannell.xyz${image.thumbnail_url}`,
      };
    });
  }
}

// TODO be smarter, stream
export class TriplesArtifact {
  _data;

  constructor(url = `/manifest/triples.${CONFIG.publication_id}.json`) {
    this.url = url;
  }

  async init() {
    if (window[TRIPLES_SYMBOL]) {
      this._data = window[TRIPLES_SYMBOL];
    }

    if (this._data) {
      return;
    }

    console.log(`🔎 fetching ${this.url}`);

    const triples = await (await fetch(this.url)).json();
    window[TRIPLES_SYMBOL] = triples;

    this._data = triples;
  }
}

export class TribblesArtifact {
  url: string;
  constructor(url = `/manifest/tribbles.${CONFIG.publication_id}.txt`) {
    this.url = url;
  }

  async init() {
    const parser = new TribbleParser();
    const response = await fetch(this.url);
    if (!response.body) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoderStream();
    const reader = response.body.pipeThrough(decoder).getReader();
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      buffer += value;
      let lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        const triple = parser.parse(line);
      }
    }

    // parse any remaining line in buffer
    if (buffer.length > 0) {
      parser.parse(buffer);
    }
  }
}
