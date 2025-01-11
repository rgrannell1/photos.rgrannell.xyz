import { html, unsafeHTML } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { JSONFeed } from "../../../services/json-feed.js";

import "./components/share-button.js";
import "../../components/tag-link.js";

export class MetadataPage extends LitElem {
  static get properties() {
    return {
      id: { type: String },
      image: { type: Object },
      exif: { type: Object },
      semantic: { type: Object },
      sharing: { state: true, type: Boolean },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  renderAperture() {
    if (this.exif.f_stop === "Unknown") {
      return html`<td>Unknown aperture</td>`;
    } else if (this.exif.f_stop === "0.0") {
      return html`<td>Manual aperture control</td>`;
    }

    return html`<td>ƒ/${this.exif.f_stop}</td>`;
  }

  renderFocalLength() {
    if (this.exif.focal_length === "Unknown") {
      return html`${this.exif.focal_length}`;
    } else if (this.exif.focal_length === "0") {
      return html`<td>Manual lens</td>`;
    } else {
      return html`<td>${this.exif.focal_length}mm equiv.</td>`;
    }
  }

  render() {
    const photo = this.image;
    const exif = this.exif;
    const semantic = this.semantic;

    console.log(semantic);

    const tags = (photo.tags.sort() ?? [])
      .filter((tag) => tag !== "Published" && !tag.includes("⭐"))
      .sort()
      .map((tagName) => {
        return html`<li><tag-link tagName="${tagName}"></tag-link></li>`;
      });

    return html`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${photo.thumbnail_url}"/>

      <p>
        <a href="${photo.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${photo.image_url}></share-metadata-button>
      </p>

      ${
      photo.description
        ? html`<br/><p>${unsafeHTML(photo.description)}</p>`
        : html``
    }

      <h3>Rating</h3>
      <p>${semantic.rating ?? "unrated"}</p>

      <h3>Photo Subject</h3>
      <p>${semantic.style ?? ""}</p>

      <h3>Tags</h3>
      <ul class="photo-tag-list">${tags}</ul>

      <h3>Exif</h3>

    <table class="metadata-table">
      <tr>
        <th class="exif-heading">Date-Time</th>
        <td><time>
        ${exif.created_at}
      </time></td>
      </tr>
      <tr>
        <th class="exif-heading">Camera Model</th>
        <td>${exif.model}</td>
        </tr>
      <tr>
        <th class="exif-heading">Dimensions</th>
        <td>${exif.width} x ${exif.height}</td>
      </tr>
      <tr>
        <th class="exif-heading">Focal Length</th>
        ${this.renderFocalLength()}
      </tr>
      <tr>
        <th class="exif-heading">Shutter Speed</th>
        <td>1/${
      exif.exposure_time ? Math.round(1 / exif.exposure_time) : "Unknown"
    }</td>
      </tr>
      <tr>
        <th class="exif-heading">Aperture</th>
        ${this.renderAperture()}
        </tr>
      <tr>
        <th class="exif-heading">ISO</th>
        <td>${exif.iso}</td>
      </tr>
    </table>

    </section>
    `;
  }
}

customElements.define("metadata-page", MetadataPage);
