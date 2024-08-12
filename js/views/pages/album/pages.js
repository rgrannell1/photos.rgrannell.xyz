import { html, unsafeHTML } from "../../../library/lit.js";

import "../../components/photo.js";
import "./components/share.js";

import { Dates } from "../../../services/dates.js";
import { Photos } from "../../../services/photos.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { LitElem } from "../../../models/lit-element.js";

export class AlbumPage extends LitElem {
  static get properties() {
    return {
      title: { type: String },
      id: { type: String },
      minDate: { type: String },
      maxDate: { type: String },
      imageCount: { type: Number },
      description: { type: String },
      images: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  albumPhotos() {
    return this.images.images().filter((image) => {
      return image.album_id === this.id;
    });
  }

  renderPhotoCount() {
    return this.imageCount === 1
      ? `${this.imageCount} photo`
      : `${this.imageCount} photos`
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
        id=${photo.id}
        tags="${photo.tags}"
        loading="${Photos.loadingMode(idx)}"
        thumbnailUrl="${photo.thumbnail_url}"
        thumbnailDataUrl="${photo.thumbnail_data_url}"
        imageUrl="${photo.image_url}"></app-photo>`;
    });

    return html`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${range}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-description">${unsafeHTML(this.description)}</p>
        <br>
        <album-share-button
          .title=${this.title}
          .url=${window.location.href}></album-share-button>
      </section>

      <section class="photo-container">
        ${photos}
      </section>
    </div>
    `;
  }
}

customElements.define("album-page", AlbumPage);
