/*
 * #/photos
 *
 * List all photos
 */

import { html } from "lit";

import { asyncAppend } from "lit/directives/async-append.js";
import "../components/photo.ts";
import { Photos } from "../../services/photos.ts";
import { JSONFeed } from "../../services/json-feed.ts";
import { LitElem } from "../../models/lit-element.ts";
import { asUrn } from "js/library/tribble.js";
import { property } from "lit/decorators.js";

export class PhotosPage extends LitElem {
  @property({ state: true })
  triples!: Object;

  override connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  allImages() {
    // NOTE: this is really slow now!
    return this.triples.search({
      source: { type: "photo" },
      relation: {
        relation: [
          "thumbnail_url",
          "mosaic_colours",
          "full_image",
        ],
      },
      target: {
        type: "unknown",
      },
    }).objects().sort((left, right) => {
      return right.created_at - left.created_at;
    });
  }

  render() {
    const photos = this.allImages();

    async function* photosIterable() {
      for (let idx = 0; idx < photos.length; idx++) {
        const photo = photos[idx];

        if (idx % 4 === 0) {
          await new Promise((res) => setTimeout(res, 0));
        }

        yield html`
          <app-photo
            id=${asUrn(photo.id).id}
            loading="${Photos.loadingMode(idx)}"
            thumbnailUrl="${photo.thumbnail_url}"
            mosaicColours="${photo.mosaic_colours}"
            imageUrl="${photo.full_image}"></app-photo>`;
      }
    }

    return html`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${photos.length} photos</p>
      </section>

      <section class="photo-container">
        ${asyncAppend(photosIterable())}
      </section>
    </div>
    `;
  }
}

customElements.define("photos-page", PhotosPage);
