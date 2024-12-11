import { cache, html } from "../../../library/lit.js";

import "../../components/photo.js";
import { Dates } from "../../../services/dates.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { LitElem } from "../../../models/lit-element.js";

export class TagPage extends LitElem {
  static get properties() {
    return {
      tag: { type: String },
      images: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setTag(this.tag);
  }

  photos() {
    return this.images.images().filter((image) => {
      return image.tags.includes(this.tag);
    });
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
      this.photos().map((photo) => {
        return html`
        <app-photo
          id="${photo.id}"
          tags="${photo.tags}"
          loading="${"lazy"}"
          thumbnailUrl="${photo.thumbnail_url}"
          thumbnailDataUrl="${photo.thumbnail_mosaic_url}"
          imageUrl="${photo.full_image}"></app-photo>`;
      })
    }
      </section>
    </div>
    `;
  }
}

customElements.define("tag-page", TagPage);
