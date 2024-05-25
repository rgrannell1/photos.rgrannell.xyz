import { html } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { Vault } from "../../../models/vault.js";

import "../../components/tag-link.js";

export class MetadataPage extends LitElem {
  static get properties() {
    return {
      id: { type: Number },
      vault: { type: Object },
    };
  }

  photo() {
    if (!this.id) {
      throw new Error('metadata: requires id')
    }
    for (const album of Object.values(this.vault.albums())) {
      for (const image of album.images) {
        if (parseInt(image.id) === this.id) {
          return image;
        }
      }
    }
  }

  renderLocation() {
    const photo = this.photo();

    if (!photo.location?.address) {
      return html``;
    }

    const { address, latitude, longitude } = photo.location;

    return html`
    <br/>
    <div>
    Photographed near <a href="geo:${latitude},${longitude}">
      <address>${address}</address>
    </a>
    </div>

    `;
  }

  render() {
    const photo = this.photo();

    const tags = (photo.tags.sort() ?? [])
      .filter(tagName => {
        return tagName !== "Published";
      })
      .map((tagName) => {
        return html`<li><tag-link tagName="${ tagName }"></tag-link></li>`;
      });

    return html`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${photo.thumbnail_url}"/>

      <p>
        <a href="${photo.image_url}">[full image]</a>
      </p>

      ${this.renderLocation()}

      ${
        photo.description ? html`<br/><p>${photo.description}</p>` : html``
      }

      <h3>Tags</h3>
      <ul class="metadata-list">${tags}</ul>

      <h3>Exif</h3>

      <ul class="metadata-list">
        <li>
          <p>Date-Time: ${photo.exif.dateTime}</p>
        </li>
        <li>
          <p>Camera Model: ${photo.exif.model}</p>
        </li>
        <li>
          <p>Aparture: ${photo.exif.fNumber}</p>
        </li>
        <li>
          <p>Focal Length: ${photo.exif.focalLength}mm equiv.</p>
        </li>
        <li>
          <p>Dimensions: ${photo.exif.width} x  ${photo.exif.height}</p>
        </li>
        <li>
          <p>ISO: ${photo.exif.iso}</p>
        </li>
      </ul>

    </section>
    `;
  }
}

customElements.define("metadata-page", MetadataPage);
