import {
  ALBUMS_SYMBOL,
  IMAGES_SYMBOL,
  METADATA_SYMBOL
} from "../constants.js";

export class ImagesArtifact {
  _data;

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

    console.log("fetching images");

    const images = await (await fetch("/manifest/images.json")).json();

    const processed = this.processImages(images);
    window[IMAGES_SYMBOL] = processed;

    this._data = processed;
  }

  images() {
    return this._data.map((image) => {
      return {
        ...image,
        tags: image.tags.split(",")
          .filter((tag) => tag != "Published")
          .map(tag => tag.trim()),
      };
    });
  }
}

export class AlbumsArtifact {
  _data;

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

    console.log("fetching albums");

    const albums = await (await fetch("/manifest/albums.json")).json();

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

  async init() {
    if (window[METADATA_SYMBOL]) {
      this._data = window[METADATA_SYMBOL];
    }

    if (this._data) {
      return;
    }

    console.log("fetching metadata");

    const metadata = await (await fetch("/manifest/metadata.json")).json();
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
