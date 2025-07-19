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
import { BinomialTypes } from "../../../constants.js";

export class ThingPage extends LitElem {
  static get properties() {
    return {
      urn: { type: String },
      images: { type: Object },
      semantic: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  isSemanticRelation(relation) {
    return (relation === KnownRelations.SUBJECT ||
      relation === KnownRelations.LOCATION ||
      relation === KnownRelations.RATING);
  }

  filterPhotos(images, facts) {
    return facts.filter((fact) => {
      const [_, relation, value] = fact;

      const candidateUrn = Things.isRating(value)
        ? `urn:ró:rating:${encodeURIComponent(value)}`
        : value;

      if (!this.isSemanticRelation(relation) && !Things.isUrn(candidateUrn)) {
        return false;
      }

      try {
        const parsedCandidate = Things.parseUrn(candidateUrn);
        const parsedUrn = Things.parseUrn(this.urn);

        if (parsedUrn.id === "*") {
          return parsedUrn.type === parsedCandidate.type;
        } else {
          return Things.sameURN(candidateUrn, this.urn);
        }
      } catch (err) {
        //console.warn(`Invalid URN in fact: ${candidateUrn}`, err);
        return false;
      }
    })
      .map((fact) => {
        return images.find((image) => image.id === fact[0]);
      })
      .filter((value) => value !== undefined);
  }

  subjectPhotos(images, facts) {
    return this.filterPhotos(images, facts)
      .map((photo, idx) => {
        return html`
      <app-photo
        id=${photo.id}
        loading="${Photos.loadingMode(idx)}"
        thumbnailUrl="${photo.thumbnail_url}"
        mosaicColours="${photo.mosaic_colours}"
        imageUrl="${photo.full_image}"></app-photo>`;
      });
  }

  getTitle() {
    try {
      const parsedUrn = Things.parseUrn(this.urn);
      const value = decodeURIComponent(parsedUrn.id);

      if (parsedUrn.id === "*") {
        return `${parsedUrn.type.charAt(0).toUpperCase()}${
          parsedUrn.type.slice(1)
        }`;
      }

      if (BinomialTypes.has(parsedUrn.type)) {
        return value.replace("-", " ").replace(
          /^./,
          (char) => char.toUpperCase(),
        );
      }

      return value;
    } catch (err) {
      return this.urn;
    }
  }

  render() {
    // Show a Name, URN, Description,
    // Wikilinks, and all images with this ARN
    // Support bird:* level queries

    const images = this.images.images();
    const facts = this.semantic.semantic();
    const photos = this.subjectPhotos(images, facts);

    const urn = Things.parseUrn(this.urn);
    const type = urn.type;

    return html`
      <div>
      <section class="thing-page">
      <h1>${this.getTitle()}</h1>

      <h3>Metadata</h3>
      <table class="metadata-table">
        <tr>
          <th class="exif-heading">Group</th>
          <td><a href="#/thing/${type}:*">${type}</a></td>
        </tr>
      </table>

        <br>
          ${photos}

          </section>
      </div>
    `;
  }
}

customElements.define("thing-page", ThingPage);
