import { ALBUMS_SYMBOL, IMAGES_SYMBOL, VIDEOS_SYMBOL, METADATA_SYMBOL } from "../constants.js";

async function readConfig() {
  const res = await fetch("/manifest/env.json");
  return await res.json();
}

const CONFIG = await readConfig();

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
        tags: (image.tags ?? '').split(",")
          .filter((tag) => tag != "Published")
          .map((tag) => tag.trim()),
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
        tags: (video.tags ?? '').split(",")
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

  processAlbums(albums) {
    const headers = albums[0];

    const output = [];

    for (const album of albums.slice(1)) {
      const data = {};

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

    const processed = this.processAlbums(albums);
    window[ALBUMS_SYMBOL] = processed;

    this._data = processed;
  }

  albums() {
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

export class MetadataArtifact {
  _data;

  constructor(url = "/manifest/metadata.json") {
    this.url = url;
  }

  async init() {
    if (window[METADATA_SYMBOL]) {
      this._data = window[METADATA_SYMBOL];
    }

    if (this._data) {
      return;
    }

    console.log(`🔎 fetching ${this.url}`);

    const metadata = await (await fetch(this.url)).json();
    window[METADATA_SYMBOL] = metadata;

    this._data = metadata;
  }

  metadata() {
    return this._data;
  }

  /*
   * Check whether a tag is a child of another tag
   */
  isChild(parent, child) {
    return isChild(this._data, parent, child);
  }

  /*
   * Return the subset of tags that are children of some particular parent
   */
  childrenOf(parent, candidates) {
    const tags = new Set([]);

    for (const candidate of candidates) {
      if (this.isChild(parent, candidate)) {
        tags.add(candidate);
      }
    }

    return tags;
  }
}
