import { html } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { JSONFeed } from "../../../services/json-feed.js";

import "./components/photo-album.js";

export class AlbumsPage extends LitElem {
  static get properties() {
    return {
      albums: { type: Object },
    };
  }
  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }
  getAlbums() {
    return Object.values(this.albums.albums()).map((album) => {
      const { photos_count } = album;
      if (!photos_count && false) {
        throw new Error(`Album ${album.album_name} has no photos`);
      }

      return {
        title: album.album_name,
        minDate: album.min_date,
        maxDate: album.max_date,
        url: album.thumbnail_url,
        thumbnailDataUrl: `data:image/bmp;base64,${album.thumbnail_mosaic_url}`,
        id: album.id,
        count: photos_count,
        flags: (album.flags ?? "").split(","),
      };
    });
  }

  imageCount() {
    let count = 0;

    for (const album of this.getAlbums()) {
      count += album.count;
    }

    return count;
  }

  loadingMode(idx) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const imageDimension = 400;
    const maxImagesPerRow = Math.floor(viewportWidth / imageDimension);
    const maxRowsInFold = Math.floor(viewportHeight / imageDimension);

    return idx > (maxImagesPerRow * maxRowsInFold) ? "lazy" : "eager";
  }

  render() {
    performance.mark("start-albums-render");

    return html`
    <section class="album-metadata">
      <h1>Albums</h1>
      <p class="photo-count">${this.imageCount()} photos</p>
    </section>

    <section class="album-container">
      ${
      this.getAlbums()
        .sort((album0, album1) => {
          return album1.maxDate - album0.maxDate;
        })
        .map((album, idx) => {
          const loading = this.loadingMode(idx);

          return html`
            <photo-album
              title="${album.title}"
              url="${album.url}"
              thumbnailDataUrl="${album.thumbnailDataUrl}"
              id="${album.id}" count="${album.count}"
              minDate="${album.minDate}"
              maxDate="${album.maxDate}"
              .countries="${album.flags}"
              loading=${loading}>
              </photo-album>
            `;
        })
    }
    </section>
    `;
  }
}

customElements.define("photo-album-page", AlbumsPage);
