
export class Vault {
  loading=false

  _dataPromise;
  _metadataPromise;

  async load() {
    if(!this._dataPromise) {
      this.loading = true;
      this._dataPromise = (await fetch("/manifest.json")).json();
    }

    if (!this._metadataPromise) {
      this._metadataPromise = (await fetch("/metadata.json")).json();
    }
  }

  async read() {
    await this.load();
    return await this._dataPromise;
  }

  /*
   * Returns all albums and their images
   */
  async albums() {
    const { domain, folders } = await this.read();

    return Object.fromEntries(Object.entries(folders).map(([id, album]) => {
        const updatedImages = album.images.map((image) => {
          return {
            ...image,
            thumbnail_url: `${domain}${image.thumbnail_url}`,
            image_url: `${domain}${image.image_url}`,
          };
        });

        return [id, {
          ...album,
          images: updatedImages,
        }];
      }));
  }

  /*
   * Returns tags and their counts
   *
   */
  async tags() {
    const tags = {};
    const albums = await this.albums();

    for (const album of Object.values(albums)) {
      for (const image of album.images) {
        for (const tag of image.tags) {
          if (!tags[tag]) {
            tags[tag] = 0;
          }

          tags[tag]++;
        }
      }
    }

    return Object.entries(tags).toSorted((tag0, tag1) => {
      return tag0[0].localeCompare(tag1[0]);
    });
  }

  /*
   * Get photographs by tag, and tag metadata
   *
   */
  async tag(tag) {
    const albums = await this.albums();

    const taggedImages = Object.values(albums).flatMap((album) => {
      return album.images.filter((image) => {
        return image.tags.includes(tag);
      });
    });

    return {
      tag,
      images: taggedImages,
    };
  }

  /*
   * Get tag cover
   *
   */
  async tagCover(tag) {
    const { images } = await this.tag(tag);

    return images[0];
  }

  async tagLinks(tag) {
    await this.read();

    const metadata = await this._metadataPromise;

    return metadata[tag]?.links;
  }
}
