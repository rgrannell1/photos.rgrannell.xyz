
import "../../components/photo.js";
import { html } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { Photos } from "../../../services/photos.js";

export class DatePage extends LitElem {
  static get properties() {
    return {
      date: { type: String },
      images: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  datePhotos() {
    return this.images.images().filter((image) => {
      if (!image.date_time) {
        return false;
      }

      const [date] = image.date_time.split(' ')
      return date.replace(/\:/g, '-') === this.date;
    });
  }

  render() {
    const photos = this.datePhotos().map((photo, idx) => {
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
        <h1>Photos from ${this.date}</h1>
        <p class="photo-album-date">
          <time>${this.date}</time>
        </p>
        <p class="photo-album-count">${photos.length} photos</p>
      </section>

      <section class="photo-container">
        ${photos}
      </section>
    </div>
    `;
  }
}

customElements.define("date-page", DatePage);
