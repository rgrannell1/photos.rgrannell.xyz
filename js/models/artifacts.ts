import {
  ALBUMS_SYMBOL,
  IMAGES_SYMBOL,
  TRIPLES_SYMBOL,
} from "../constants.js";

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
