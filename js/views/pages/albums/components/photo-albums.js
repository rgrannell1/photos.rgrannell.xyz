import { html, LitElement } from "../../../../library/lit.js";

import albums from "../../../../../manifest.json" assert { type: "json" };

export class PhotoAlbums extends LitElement {
  createRenderRoot() {
    return this;
  }

  albums() {
    return Object.values(albums).map((album) => {
      const { images } = album;
      if (!images) {
        return;
      }

      const coverImage = images.find((image) => {
        return image.fpath === album.cover_image;
      });

      const url = coverImage?.thumbnail_url ?? images[0]?.thumbnail_url;

      return {
        title: album.name,
        minDate: album.min_date,
        maxDate: album.max_date,
        url,
        id: album.id,
        count: images.length,
      };
    });
  }

  imageCount() {
    let count = 0;

    for (const album of this.albums()) {
      count += album.count;
    }

    return count;
  }

  render() {
    return html`
    <section class="album-metadata">
      <h1>Albums</h1>
      <p class="photo-album-count">${this.imageCount()} photos</p>
    </section>

    <section class="album-container">
      ${
      this.albums()
        .sort((album0, album1) => {
          return album0.maxDate - album1.maxDate;
        })
        .map((album) => {
          return html`
            <photo-album
              title="${album.title}" url="${album.url}"
              id="${album.id}" count="${album.count}"
              minDate="${album.minDate}"
              maxDate="${album.maxDate}"></photo-album>
            `;
        })
    }
    </section>
    `;
  }
}

customElements.define("photo-albums", PhotoAlbums);
