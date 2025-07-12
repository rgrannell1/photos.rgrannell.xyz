import { html } from "../../../library/lit.js";

import "../../components/photo.js";
import "../../components/search-bar.js";
import { Photos } from "../../../services/photos.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { LitElem } from "../../../models/lit-element.js";
import { ImagesArtifact } from "../../../models/artifacts.js";

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
    // TODO horrid
    if (!this.images.images) {
      return this.images._data.map(ImagesArtifact.processImage);
    }

    return this.images.images();
  }

  render() {
    const photos = this.allImages().map((photo, idx) => {
      return html`
      <app-photo
        id=${photo.id}
        tags="${photo.tags}"
        loading="${Photos.loadingMode(idx)}"
        thumbnailUrl="${photo.thumbnail_url}"
        thumbnailDataUrl="${photo.thumbnail_mosaic_url}"
        imageUrl="${photo.full_image}"></app-photo>`;
    });

    return html`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${photos.length} photos</p>
      </section>

      <content-searchbar entity="photo" .content=${this.allImages()}>
      </content-searchbar>

      <section class="photo-container">
        ${photos}
      </section>
    </div>
    `;
  }
}

customElements.define("photos-page", PhotosPage);
