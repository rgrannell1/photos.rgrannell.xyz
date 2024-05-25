
export class Vault {
  _data;
  _metadata;

  async init() {
    const [
      data,
      metadata
    ] = await Promise.all([
      (await fetch("/manifest.json")).json(),
      (await fetch("/metadata.json")).json()
    ]);

    this._data = data;
    this._metadata = metadata;
  }

  /*
   * Returns all albums and their images
   */
  albums() {
    const { domain, folders } = this._data;

    return Object.fromEntries(Object.entries(folders).map(([id, album]) => {
      const geolocation = album.geolocation ? JSON.parse(atob(album.geolocation)) : null;

      const updatedImages = album.images.map((image) => {
          return {
            ...image,
            thumbnail_url: `${domain}${image.thumbnail_url}`,
            image_url: `${domain}${image.image_url}`,
          };
        });

        const cover = album.images.find(image => {
          return image.fpath === album.cover_image;
        });

        return [id, {
          ...album,
          geolocation,
          cover_thumbnail: `${domain}${cover?.thumbnail_url}`,
          images: updatedImages,
        }];
      }));
  }

  /*
   * Returns tags and their counts
   *
   */
  tags() {
    const tags = {};
    const albums = this.albums();

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
  tag(tag) {
    const albums = this.albums();

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
  tagCover(tag) {
    const { images } = this.tag(tag);

    return images[0];
  }

  tagLinks(tag) {
    const metadata = this._metadata;

    return metadata[tag]?.links;
  }
}
