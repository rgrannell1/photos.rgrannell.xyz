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

      <h3>Tags</h3>
      <ul>${tags}</ul>

      <h3>URLs</h3>

      <ul>
        <li>
          <a class="long-url" href="${photo.image_url}">Image URL</a>
        </li>
        <li>
          <a class="long-url" href="${photo.thumbnail_url}">Thumbnail URL</a>
        </li>
      </ul>

      <h3>Exif</h3>
      <p>Date-Time: ${photo.exif.dateTime}</p>
      <p>Model: ${photo.exif.model}</p>
      <p>Aparture: ${photo.exif.fNumber}</p>
      <p>Focal Length: ${photo.exif.focalLength}</p>
      <p>Width: ${photo.exif.width}</p>
      <p>Height: ${photo.exif.height}</p>
      <p>ISO: ${photo.exif.iso}</p>

    </section>
    `;
  }
}

customElements.define("metadata-page", MetadataPage);

