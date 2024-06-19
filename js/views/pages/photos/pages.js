import { html, LitElement } from "../../../library/lit.js";

import "../../components/photo.js";
import { Dates } from "../../../services/dates.js";
import { Photos } from "../../../services/photos.js";
import { JSONFeed } from "../../../services/json-feed.js";

export class PhotosPage extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      id: { type: String },
      vault: { type: Object },
    };
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
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

  album() {
    const albums = this.vault.albums();

    if (!albums.hasOwnProperty(this.id)) {
      return {};
    }

    return albums[this.id];
  }

  imageCount() {
    return this.album().images.length;
  }

  description() {
    return this.album().description;
  }

  render() {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    const album = this.album();
    const range = Dates.dateRange(
      album.min_date,
      album.max_date,
      mediaQuery.matches,
    );

    return html`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">${range}</p>
        <p class="photo-album-count">${this.imageCount()} photos</p>
        <p class="photo-album-description">${this.description()}</p>
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

customElements.define("photos-page", PhotosPage);
