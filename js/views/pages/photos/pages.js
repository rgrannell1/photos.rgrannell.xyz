import { html, LitElement } from "../../../library/lit.js";

import "./components/photo.js";

import albums from "../../../../../manifest.json" assert { type: "json" };

export class PhotosPage extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      id: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  photos() {
    const album = this.album();

    return album.images.map((image) => {
      return {
        id: image.id,
        thumbnailUrl: image.thumbnail_url,
        imageUrl: image.image_url,
        tags: image.tags,
      };
    });
  }

  dateRange(minDate, maxDate) {
    if (!minDate && !maxDate) {
      return "unknown date";
    }

    const parsedMinDate = new Date(parseFloat(minDate));
    const parsedMaxDate = new Date(parseFloat(maxDate));

    const opts = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const from = parsedMinDate.toLocaleDateString("en-IE", opts);
    const to = parsedMaxDate.toLocaleDateString("en-IE", opts);

    if (from === to) {
      return from;
    }

    return `${from} — ${to}`;
  }

  album() {
    if (!albums.hasOwnProperty(this.id)) {
      return {};
    }

    return albums[this.id];
  }

  imageCount() {
    return this.album().images.length;
  }

  loadingMode(idx) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const imageDimension = 400;
    const maxImagesPerRow = Math.floor(viewportWidth / imageDimension);
    const maxRowsInFold = Math.floor(viewportHeight / imageDimension);

    return idx > (maxImagesPerRow * maxRowsInFold)
      ? 'lazy'
      : 'eager'
  }

  render() {
    const album = this.album();
    const range = this.dateRange(album.min_date, album.max_date);

    return html`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">${range}</p>
        <p class="photo-album-count">${this.imageCount()} photos</p>
      </section>

      <section class="photo-container">
        ${
      this.photos().map((photo, idx) => {
        return html`
        <app-photo
          id="${photo.id}"
          tags="${photo.tags}"
          loading="${this.loadingMode(idx)}"
          thumbnailUrl="${photo.thumbnailUrl}"
          imageUrl="${photo.imageUrl}"></app-photo>`;
      })
    }
      </section>
    </div>
    `;
  }
}

customElements.define("photos-page", PhotosPage);
