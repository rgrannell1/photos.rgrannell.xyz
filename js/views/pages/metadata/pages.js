import { html, unsafeHTML } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { JSONFeed } from "../../../services/json-feed.js";

import "./components/share-button.js";
import "../../components/unesco.js";
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

  renderSemanticKey(key) {
    return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  }

  renderSemanticValue(key, value) {
    if (key.includes("binomial")) {
      return html`<em>${value}</em>`;
    }

    // this is bad, but a start
    // componentise this
    if (value.startsWith('urn:ró:unesco')) {
      return html`<unesco-link .urn="${value}"></unesco-link>`;
    }

    return value;
  }

  renderSemanticData(semantic) {
    return html`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${
      Object.keys(semantic).sort()
        .map((key) => {
          return html`
            <tr>
              <th class="exif-heading">${this.renderSemanticKey(key)}</th>
              <td>${this.renderSemanticValue(key, semantic[key])}</td>
          `;
        })
    }
      <table>
    `;
  }

  render() {
    const photo = this.image;
    const exif = this.exif;
    const semantic = this.semantic;

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

      ${this.renderSemanticData(semantic)}

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
