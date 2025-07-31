import {
  ALBUMS_SYMBOL,
  EXIF_SYMBOL,
  IMAGES_SYMBOL,
  SEMANTIC_SYMBOL,
  STATS_SYMBOL,
  TRIPLES_SYMBOL,
  VIDEOS_SYMBOL,
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

export class VideosArtifact {
  _data;

  constructor(url = `/manifest/videos.${CONFIG.publication_id}.json`) {
    this.url = url;
  }

  processVideos(videos) {
    const headers = videos[0];

    const output = [];

    for (const image of videos.slice(1)) {
      const data = {};

      for (let idx = 0; idx < headers.length; idx++) {
        data[headers[idx]] = image[idx];
      }

      output.push(data);
    }

    return output;
  }

  async init() {
    if (window[VIDEOS_SYMBOL]) {
      this._data = window[VIDEOS_SYMBOL];
    }

    if (this._data || this.loading) {
      return;
    }

    console.log(`🔎 fetching ${this.url}`);

    const videos = await (await fetch(this.url)).json();

    const processed = this.processVideos(videos);
    window[VIDEOS_SYMBOL] = processed;

    this._data = processed;
  }

  videos() {
    return this._data.map((video) => {
      return {
        ...video,
        poster_url: `https://photos-cdn.rgrannell.xyz${video.poster_url}`,
        video_url_1080p:
          `https://photos-cdn.rgrannell.xyz${video.video_url_1080p}`,
        video_url_480p:
          `https://photos-cdn.rgrannell.xyz${video.video_url_480p}`,
        video_url_720p:
          `https://photos-cdn.rgrannell.xyz${video.video_url_720p}`,
        video_url_unscaled:
          `https://photos-cdn.rgrannell.xyz${video.video_url_unscaled}`,
        tags: (video.tags ?? "").split(",")
          .filter((tag) => tag != "Published")
          .map((tag) => tag.trim()),
      };
    });
  }
}

export class AlbumsArtifact {
  _data;

  constructor(url = `/manifest/albums.${CONFIG.publication_id}.json`) {
    this.url = url;
  }

  process(rows) {
    const headers = rows[0];

    const output = [];

    for (const album of rows.slice(1)) {
      const data = {};

      if (album.length !== headers.length) {
        throw new Error(
          `album row length mismatch: expected ${headers.length}, got ${album.length}`)
      }

      for (let idx = 0; idx < headers.length; idx++) {
        data[headers[idx]] = album[idx];
      }

      output.push(data);
    }
    return output;
  }

  async init() {
    if (window[ALBUMS_SYMBOL]) {
      this._data = window[ALBUMS_SYMBOL];
    }

    if (this._data) {
      return;
    }

    console.log(`🔎 fetching ${this.url}`);

    const albums = await (await fetch(this.url)).json();

    const processed = this.process(albums);
    window[ALBUMS_SYMBOL] = processed;

    this._data = processed;
  }

  albums() {
    return this._data.map((album) => {
      return {
        ...album,
        thumbnail_url: `https://photos-cdn.rgrannell.xyz${album.thumbnail_url}`,
        thumbnail_mosaic_url: `${album.thumbnail_mosaic_url}`, // TODO: should send a short version too
      };
    });
  }
}

export class ExifArtifact {
  _data;

  constructor(url = `/manifest/exif.${CONFIG.publication_id}.json`) {
    this.url = url;
  }

  process(rows) {
    const headers = rows[0];

    const output = [];

    for (const album of rows.slice(1)) {
      const data = {};

      for (let idx = 0; idx < headers.length; idx++) {
        data[headers[idx]] = album[idx];
      }

      output.push(data);
    }

    return output;
  }

  async init() {
    if (window[EXIF_SYMBOL]) {
      this._data = window[EXIF_SYMBOL];
    }

    if (this._data) {
      return;
    }

    console.log(`🔎 fetching ${this.url}`);

    const exif = await (await fetch(this.url)).json();
    const processed = this.process(exif);

    window[EXIF_SYMBOL] = processed;

    this._data = processed;
  }

  exif() {
    return this._data;
  }
}

function isChild(metadata, parent, child) {
  if (!metadata.hasOwnProperty(parent)) {
    return false;
  }

  const children = metadata[parent];

  if (children.includes(child)) {
    return true;
  }

  for (const candidate of children) {
    if (isChild(metadata, candidate, child)) {
      return true;
    }
  }

  return false;
}

export class SemanticArtifact {
  _data;

  constructor(url = `/manifest/semantic.${CONFIG.publication_id}.json`) {
    this.url = url;
  }

  async init() {
    if (window[SEMANTIC_SYMBOL]) {
      this._data = window[SEMANTIC_SYMBOL];
    }

    if (this._data) {
      return;
    }

    console.log(`🔎 fetching ${this.url}`);

    const semantic = await (await fetch(this.url)).json();
    window[SEMANTIC_SYMBOL] = semantic;

    this._data = semantic;
  }

  semantic() {
    return this._data;
  }
}

export class StatsArtifact {
  _data;

  constructor(url = `/manifest/stats.${CONFIG.publication_id}.json`) {
    this.url = url;
  }

  async init() {
    if (window[STATS_SYMBOL]) {
      this._data = window[STATS_SYMBOL];
    }

    if (this._data) {
      return;
    }
  }

  stats() {
    return this._data;
  }
}

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
