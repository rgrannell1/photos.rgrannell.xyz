
import { LitElement, html } from "../../../library/lit.js";

import './components/photo.js';

import albums from '../../../../../manifest.json' assert {type: 'json'};

export class PhotosPage extends LitElement {
  static get properties () {
    return {
      title: { type: String },
      id: { type: String },
    }
  }

  createRenderRoot() {
    return this;
  }

  photos() {
    const album = this.album();

    return album.images.map(image => {
      return {
        id: 1,
        thumbnailUrl: image.thumbnail_url,
      }
    });
  }

  dateRange(minDate, maxDate) {
    if (!minDate && !maxDate) {
      return 'unknown date';
    }

    const parsedMinDate = new Date(parseFloat(minDate));
    const parsedMaxDate = new Date(parseFloat(maxDate));

    const opts = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
    const from = parsedMinDate.toLocaleDateString('en-IE', opts);
    const to = parsedMaxDate.toLocaleDateString('en-IE', opts);

    if (from === to) {
      return from;
    }

    return `${from} — ${to}`;
  }

  album() {
    if (!albums.hasOwnProperty(this.id)) {
      return {}
    }

    return albums[this.id]
  }

  render() {
    const album = this.album();
    const range = this.dateRange(album.min_date, album.max_date);

    return html`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">${range}</p>
      </section>

      <section class="photo-container">
        ${
          this.photos().map((photo) => {
            return html`<app-photo thumbnailUrl="${photo.thumbnailUrl}"></app-photo>`
          })
        }
      </section>
    </div>
    `
  }
}

customElements.define('photos-page', PhotosPage);
