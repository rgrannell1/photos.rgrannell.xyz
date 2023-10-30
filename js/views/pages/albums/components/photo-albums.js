
import { LitElement, html } from "../../../../library/lit.js";

import albums from '../../../../../manifest.json' assert {type: 'json'};

export class PhotoAlbums extends LitElement {
  createRenderRoot() {
    return this;
  }
  data() {
    return Object.values(albums).map((album) => {
      const { images } = album;
      if (!images) {
        return
      }

      const coverImage = images.find(image => {
        return image.fpath === album.cover_image;
      });

      const url = coverImage?.thumbnail_url ?? images[0]?.thumbnail_url;

      return {
        title: album.name,
        date: album.date,
        url,
        id: album.id,
        count: images.length
      }
    });
  }

  render() {
    return html`
    <section class="album-container">
      ${
        this.data().map((album) => {
          return html`
          <photo-album
            title="${album.title}" url="${album.url}"
            id="${album.id}" count="${album.count}" date="${album.date}"></photo-album>
          `
        })
      }
    </section>
    `
  }
}

customElements.define('photo-albums', PhotoAlbums);
