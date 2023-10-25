
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

      return {
        title: album.name,
        date: '1970-01-01 — 1980-01-01',
        url: images[1]?.thumbnail_url,
        id: 0,
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
