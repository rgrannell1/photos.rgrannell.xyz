import { html } from "../../../library/lit.js";

import "../../components/photo.js";
import { Dates } from "../../../services/dates.js";
import { Photos } from "../../../services/photos.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { LitElem } from "../../../models/lit-element.js";

import { ImagesArtifact } from "../../../models/artifacts.js";

const images = new ImagesArtifact();
await images.init();

export class AlbumPage extends LitElem {
  static get properties() {
    return {
      title: { type: String },
      id: { type: String },
      minDate: { type: String },
      maxDate: { type: String },
      imageCount: { type: Number },
      description: { type: String },
      cache: { type: Array },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  albumPhotos() {
    return images.images().filter((image) => {
      return image.album_id === this.id;
    });
  }

  render() {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    const range = Dates.dateRange(
      this.minDate,
      this.maxDate,
      mediaQuery.matches,
    );

    const photos = this.albumPhotos().map((photo, idx) => {
      return html`
      <app-photo
        .cache=${this.cache}
        id=${photo.id}
        tags="${photo.tags}"
        loading="${Photos.loadingMode(idx)}"
        thumbnailUrl="${photo.thumbnail_url}"
        thumbnailDataUrl="${photo.thumbnail_data_url}"
        imageUrl="${photo.image_url}"></app-photo>`;
    })

    return html`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">${range}</p>
        <p class="photo-album-count">${this.imageCount} photos</p>
        <p class="photo-album-description">${this.description}</p>
      </section>

      <section class="photo-container">
        ${photos}
      </section>
    </div>
    `;
  }
}

customElements.define("album-page", AlbumPage);
