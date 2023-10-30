
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

  album() {
    if (!albums.hasOwnProperty(this.id)) {
      return {}
    }

    return albums[this.id]
  }

  render() {
    return html`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">${this.album().date}</p>
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
