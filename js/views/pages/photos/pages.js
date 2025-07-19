/*
 * #/photos
 *
 * List all photos
 */

import { html } from "../../../library/lit.js";

import "../../components/photo.js";
import "./components/search.js";
import { Photos } from "../../../services/photos.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { LitElem } from "../../../models/lit-element.js";

export class PhotosPage extends LitElem {
  static get properties() {
    return {
      images: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  allImages() {
    return this.images.images().sort((left, right) => {
      return right.created_at - left.created_at;
    });
  }

  render() {
    const photos = this.allImages().map((photo, idx) => {
      return html`
      <app-photo
        id=${photo.id}
        tags="${photo.tags}"
        loading="${Photos.loadingMode(idx)}"
        thumbnailUrl="${photo.thumbnail_url}"
        mosaicColours="${photo.mosaic_colours}"
        imageUrl="${photo.full_image}"></app-photo>`;
    });

    return html`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${photos.length} photos</p>
      </section>

      <section class="photo-container">
        ${photos}
      </section>
    </div>
    `;
  }
}

customElements.define("photos-page", PhotosPage);
