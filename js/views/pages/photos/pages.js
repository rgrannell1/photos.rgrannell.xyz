
import { LitElement, html } from "../../../library/lit.js";

import './components/photo.js';

import albums from '../../../../../manifest.json' assert {type: 'json'};

export class PhotosPage extends LitElement {
  static get properties () {
    return {
      title: { type: String },
      folder: { type: String },
    }
  }

  createRenderRoot() {
    return this;
  }

  data() {
    const album = albums['/home/rg/Drive/Photos/2023/Bray Air Show']

    return album.images.map(image => {
      return {
        id: 1,
        thumbnailUrl: image.thumbnail_url,
      }
    });
  }

  render() {
    return html`
    <div>
      <h1>${this.title}</h1>

      <section class="photo-container">
        ${
          this.data().map((photo) => {
            return html`<app-photo thumbnailUrl="${photo.thumbnailUrl}"></app-photo>`
          })
        }
      </section>
    </div>
    `
  }
}

customElements.define('photos-page', PhotosPage);
