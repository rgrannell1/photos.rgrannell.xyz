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
import { ThingsService } from "js/things/services.ts";

export class PhotosPage extends LitElem {
  @property({ state: true })
  triples!: Object;

  @property()
  qs!: Record<string, string>;

  override connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  static IMAGE_RELATIONS = [
    "thumbnailUrl",
    "mosaicColours",
    "fullImage",
  ]

  matchingImages() {
    return ThingsService.photoObjects(this.triples, {
      relation: {
        relation: PhotosPage.IMAGE_RELATIONS,
      },
      target: {
        type: "unknown",
      },
    });
  }

  async forceRerender(idx: number): Promise<void> {
    if (idx % 4 === 0) {
      await new Promise((res) => setTimeout(res, 0));
    }
  }

  render() {
    const photos = this.matchingImages();
    const that = this;

    async function* photosIterable() {
      for (let idx = 0; idx < photos.length; idx++) {
        const photo = photos[idx];

        await that.forceRerender(idx);

        yield html`
          <app-photo
            id=${asUrn(photo.id).id}
            loading="${Photos.loadingMode(idx)}"
            thumbnailUrl="${photo.thumbnailUrl}"
            mosaicColours="${photo.mosaicColours}"
            imageUrl="${photo.fullImage}"></app-photo>`;
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
