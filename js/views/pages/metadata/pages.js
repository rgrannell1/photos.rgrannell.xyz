/*
 * /#/metadata/<photo-id
 *
 * Shows information about the photo, like:
 * - Exif data
 * - Semantic data
 * - Links & Sharing Options
 */

import { html, unsafeHTML } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { JSONFeed } from "../../../services/json-feed.js";

import "./components/share-button.js";
import "../../components/unesco-link.js";
import "../../components/thing-link.js";
import "../../components/tag-link.js";
import { Things } from "../../../services/things.js";
import { KnownThings } from "../../../constants.js";

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
    if (Array.isArray(value)) {
      return html`<ul class="thing-list">
        ${ value.map((subval) => html`<li>${ this.renderSemanticValue.call(this, key, subval) }</li>`) }
      </ul>`;
    }

    if (key.includes("binomial")) {
      return html`<em>${value}</em>`;
    }

    if (key.toLowerCase() === "summary") {
      return html`${unsafeHTML(value ?? "")}`;
    }

    if (Things.isRating(value)) {
      const urn = `urn:ró:rating:${value}`;
      return html`<thing-link .urn="${urn}"></thing-link>`;
    } else if (Things.isUrn(value) && Things.is(value, KnownThings.UNESCO)) {
      return html`<unesco-link .urn="${value}"></unesco-link>`;
    } else if (Things.isUrn(value)) {
      return html`<thing-link .urn="${value}"></thing-link>`;
    }

    return value;
  }

  isIgnoredKey(key) {
    // TODO remove this when semantic data is cleaned up
    console.log(key);
    return (new Set([
      "bird_binomial",
      "wildlife",
      "living_conditions",
    ])).has(key);
  }

  renderSemanticData(semantic) {
    return html`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${
      Object.keys(semantic).sort()
        .filter((key) => !this.isIgnoredKey(key))
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
    const albumId = photo.album_id;

    return html`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${photo.thumbnail_url}"/>

      <p>
        <a href="${photo.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${photo.image_url}></share-metadata-button>
        <a href="#/album/${albumId}">[album]</a>
      </p>

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
