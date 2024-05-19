
export class Vault {
  _data;

  async read() {
    if (!this._data) {
      this._data = await (await fetch("/manifest.json")).json();
    }

    return this._data;
  }

  async getAlbums() {
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
}
