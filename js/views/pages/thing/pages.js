/*
 * /#/thing/:urn
 *
 * Details about subjects or places of a photo
 */

import { html } from "../../../library/lit.js";

import "../../components/photo.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { LitElem } from "../../../models/lit-element.js";
import { KnownRelations } from "../../../constants.js";
import { Things } from "../../../services/things.js";
import { Photos } from "../../../services/photos.js";

export class ThingPage extends LitElem {
  static get properties() {
    return {
      urn: { type: String },
      images: { type: Object },
      semantic: { type: Object }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  subjectPhotos(images, facts) {
    return facts.filter((fact) => {
      const [_, relation, value] = fact;

      return (relation === KnownRelations.SUBJECT || relation === KnownRelations.LOCATION) && Things.sameURN(value, this.urn);
    })
    .map((fact) => {
      return images.find(image => image.id === fact[0]);
    })
    .filter((value) => value !== undefined)
    .map((photo, idx) => {
      return html`
      <app-photo
        id=${photo.id}
        tags="${photo.tags}"
        loading="${Photos.loadingMode(idx)}"
        thumbnailUrl="${photo.thumbnail_url}"
        thumbnailDataUrl="${photo.thumbnail_mosaic_url}"
        imageUrl="${photo.full_image}"></app-photo>`;
    });
  }

  render() {
    // Show a Name, URN, Description,
    // Wikilinks, and all images with this ARN


    const images = this.images.images();
    const facts = this.semantic.semantic();
    const photos = this.subjectPhotos(images, facts);

    return html`
      <div>
        <section class="thing-page">
          <h1>${this.urn}</h1>

          ${photos}
        </section>
      </div>
    `;
  }
}

customElements.define("thing-page", ThingPage);
