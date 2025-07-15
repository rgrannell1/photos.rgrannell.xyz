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

  isSemanticRelation(relation) {
    return (relation === KnownRelations.SUBJECT || relation === KnownRelations.LOCATION || relation === KnownRelations.RATING);
  }

  subjectPhotos(images, facts) {
    return facts.filter((fact) => {
      const [_, relation, value] = fact;

      const candidateUrn = Things.isRating(value)
        ? `urn:ró:rating:${encodeURIComponent(value)}`
        : value

      return this.isSemanticRelation(relation) && Things.sameURN(candidateUrn, this.urn);
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

  getTitle() {
    try {
      const parsedUrn = Things.parseUrn(this.urn);
      return `${decodeURIComponent(parsedUrn.id)}`;
    } catch (err) {
      return this.urn;
    }
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
          <h1>${this.getTitle()}</h1>

          ${photos}
        </section>
      </div>
    `;
  }
}

customElements.define("thing-page", ThingPage);
