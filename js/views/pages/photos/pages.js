
import { LitElement, html } from "../../../library/lit.js";

import './components/photo.js';

export class PhotosPage extends LitElement {
  static get properties () {
    return {
      title: { type: String },
    }
  }

  createRenderRoot() {
    return this;
  }

  data() {
    return [
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
      {
        id: 1,
        thumbnailUrl: 'https://picsum.photos/400/400',
      },
    ]
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
