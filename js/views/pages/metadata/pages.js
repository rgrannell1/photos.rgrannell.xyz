import { html } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";

import albums from "../../../../manifest.json" assert { type: "json" };

export class MetadataPage extends LitElem {
  static get properties() {
    return {
      id: { type: Number }
    };
  }

  photo() {
    for (const album of Object.values(albums)) {
      for (const image of album.images) {
        if (parseInt(image.id) === this.id) {
          return image;
        }
      }
    }
  }

  render() {
    const photo = this.photo();

    const tags = (photo.tags ?? []).map((tag) => {
      return html`
      <li>
        <a href="#/tag/${tag}">${tag}</a>
      </li>
      `;
    });

    return html`
    <section>
    <h1>Metadata</h1>

    <img src="${photo.thumbnail_url}"/>

      <p>
        <a href="${photo.image_url}">[full image]</a>
      </p>

      <h3>Tags</h3>
      <ul class="metadata-list">${tags}</ul>

      <h3>Exif</h3>

      <ul class="metadata-list">
        <li>
          <p>Date-Time: ${photo.exif.dateTime}</p>
        </li>
        <li>
          <p>Model: ${photo.exif.model}</p>
        </li>
        <li>
          <p>Aparture: ${photo.exif.fNumber}</p>
        </li>
        <li>
          <p>Focal Length: ${photo.exif.focalLength}mm Equivalent</p>
        </li>
        <li>
          <p>Width: ${photo.exif.width}</p>
        </li>
        <li>
          <p>Height: ${photo.exif.height}</p>
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

