import { html, LitElement } from "../../../library/lit.js";

import "../../components/photo.js";
import { Dates } from "../../../services/dates.js";
import { Photos } from "../../../services/photos.js";

const albums = await (await fetch("/manifest.json")).json();

export class TagPage extends LitElement {
  static get properties() {
    return {
      tag: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  photos() {
    const images = [];

    for (const album of Object.values(albums)) {
      for (const image of album.images) {
        if (!image.tags.includes(this.tag)) {
          continue;
        }
        images.push({
          id: image.id,
          thumbnailUrl: image.thumbnail_url,
          imageUrl: image.image_url,
          tags: image.tags,
        });
      }
    }

    return images;
  }

  imageCount() {
    return this.photos().length;
  }

  render() {
    const range = Dates.dateRange(0, 0); // TODO

    return html`
    <div>
      <section class="photos-metadata">
        <h1>${this.tag}</h1>
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
          loading="${Photos.loadingMode(idx)}"
          thumbnailUrl="${photo.thumbnailUrl}"
          imageUrl="${photo.imageUrl}"></app-photo>`;
      })
    }
      </section>
    </div>
    `;
  }
}

customElements.define("tag-page", TagPage);
