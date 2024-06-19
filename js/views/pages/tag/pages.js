import { html, LitElement } from "../../../library/lit.js";

import "../../components/photo.js";
import { Dates } from "../../../services/dates.js";
import { Photos } from "../../../services/photos.js";
import { JSONFeed } from "../../../services/json-feed.js";

export class TagPage extends LitElement {
  static get properties() {
    return {
      tag: { type: String },
      vault: { type: Object },
    };
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setTag(this.tag);
  }

  photos() {
    const images = [];
    const albums = this.vault.albums();

    for (const album of Object.values(albums)) {
      for (const image of album.images) {
        if (!image.tags.includes(this.tag)) {
          continue;
        }

        const parsedDate = image.exif.date_time
          ? Dates.parse(image.exif.date_time)
          : undefined;

        images.push({
          id: image.id,
          dateTime: parsedDate,
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
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    const [minDate, maxDate] = Dates.findRange(this.photos());

    const range = Dates.dateRange(minDate, maxDate, mediaQuery.matches);

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
