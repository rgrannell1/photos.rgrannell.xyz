/*
 * /#/metadata/<photo-id
 *
 * Shows information about the photo, like:
 * - Exif data
 * - Semantic data
 * - Links & Sharing Options
 */

import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { html } from "lit-element";
import { LitElem } from "../../models/lit-element.ts";
import { JSONFeed } from "../../services/json-feed.ts";
import { property } from "lit/decorators.js";

import "../components/share-button.ts";
import "../components/thing-link.ts";
import { Things, Triples } from "../../things/things.ts";
import { ExifRelations, KnownThings } from "../../constants.js";
import { parseUrn } from "js/library/tribble.js";

function Heading(text: string) {
  return html`<th class="exif-heading">${text}</th>`;
}

export class MetadataPage extends LitElem {
  @property()
  id!: string;
  @property()
  image!: Object;
  @property({ state: true })
  sharing!: boolean;
  @property({ state: true })
  triples!: Object;

  override connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  renderAperture(exif) {
    if (exif.fStop === "Unknown") {
      return html`<td>Unknown</td>`;
    } else if (exif.fStop === "0.0") {
      return html`<td>Manual aperture control</td>`;
    } else if (!exif.fStop) {
      return html`<td>Unknown</td>`;
    }

    return html`<td>ƒ/${exif.fStop}</td>`;
  }

  renderFocalLength(exif) {
    if (exif.focalLength === "Unknown") {
      return html`${exif.focalLength}`;
    } else if (exif.focalLength === "0") {
      return html`<td>Manual lens</td>`;
    } else if (!exif.focalLength) {
      return html`<td>Unknown</td>`;
    } else {
      return html`<td>${exif.focalLength}mm equiv.</td>`;
    }
  }

  renderSemanticKey(key) {
    return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  }

  renderSemanticValue(key, value) {
    if (Array.isArray(value)) {
      return html`<ul class="thing-list">
        ${
        value.map((subval) =>
          html`<li>${this.renderSemanticValue.call(this, key, subval)}</li>`
        )
      }
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
      return html`<thing-link .triples=${this.triples} .urn="${urn}"></thing-link>`;
    } else if (Things.isUrn(value) && Things.is(value, KnownThings.UNESCO)) {
      return html`<unesco-link .urn="${value}"></unesco-link>`;
    } else if (Things.isUrn(value)) {
      return html`<thing-link .triples=${this.triples} .urn="${value}"></thing-link>`;
    }

    return value;
  }

  isIgnoredKey(key) {
    // TODO remove this when semantic data is cleaned up
    return (new Set([
      "birdBinomial",
      "mammalBinomial",
      "wildlife",
      "livingConditions",
      "pngUrl",
    ])).has(key);
  }

  renderSemanticData(triples: [string, string, string][]) {
    return html`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${
      triples.sort((triple0, triple1) => {
        return Triples.getRelation(triple0).localeCompare(
          Triples.getRelation(triple1),
        );
      })
        .filter((triple) => {
          return !this.isIgnoredKey(Triples.getRelation(triple));
        })
        .map((triple) => {
          return html`
          <tr>
            <th class="exif-heading">${
            this.renderSemanticKey(Triples.getRelation(triple))
          }</th>
              <td>${
            this.renderSemanticValue(
              Triples.getRelation(triple),
              Triples.getTarget(triple),
            )
          }</td>
          `;
        })
    }
      <table>
    `;
  }

  renderModel(exif) {
    if (typeof exif.model === "string") {
      return html`
      ${Heading("Camera Model")}
      <td><thing-link .triples=${this.triples} .urn=${exif.model}></thing-link></td>`;
    }
    return html`
      ${Heading("Camera Model")}
      <td>Unknown</td>
    `;
  }

  renderDimensions(exif) {
    if (typeof exif.width === "number" && typeof exif.height === "number") {
      return html`
        ${Heading("Dimensions")}
        <td>${exif.width} x ${exif.height}</td>`;
    }
    return html`
      ${Heading("Dimensions")}
      <td>Unknown</td>
    `;
  }

  renderShutterSpeed(exif) {
    if (typeof exif.shutterSpeed === "number") {
      return html`
        ${Heading("Shutter Speed")}
        <td>1/${Math.round(1 / exif.shutterSpeed)}</td>`;
    }
    return html`
      ${Heading("Shutter Speed")}
      <td>Unknown</td>
    `;
  }

  renderExif(tdb) {
    const exif = tdb.search({
      source: {
        type: "photo",
        id: this.id,
      },
      relation: {
        //relation: ExifRelations,
      },
    }).firstObject();

    if (!exif) {
      return html`<p>No EXIF data available</p>`;
    }

    const date = new Date(parseInt(exif.createdAt));
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return html`
    <h3>Exif</h3>

    <table class="metadata-table">
      <tr>
        <th class="exif-heading">Date-Time</th>
        <td><time>
        ${formattedDate}
      </time></td>
      </tr>
      <tr>
        ${this.renderModel(exif)}
        </tr>
      <tr>
        ${this.renderDimensions(exif)}
      </tr>
      <tr>
        <th class="exif-heading">Focal Length</th>
        ${this.renderFocalLength(exif)}
      </tr>
      <tr>
        ${this.renderShutterSpeed(exif)}
      </tr>
      <tr>
        <th class="exif-heading">Aperture</th>
        ${this.renderAperture(exif)}
        </tr>
      <tr>
        <th class="exif-heading">ISO</th>
        <td>${exif.iso ?? "Unknown"}</td>
      </tr>
    </table>
    `;
  }

  render() {
    const photo = this.image;
    const albumId = photo.albumId;

    const tdb = this.triples;
    const imageTriples = tdb.search({
      source: {
        id: parseUrn(photo.id).id,
      },
      relation: {
        predicate: (relation: string) => {
          const TODO = new Set([
            "albumId",
            "fullImage",
            "mosaicColours",
            "thumbnailUrl",
          ]);
          return !ExifRelations.has(relation) && !TODO.has(relation);
        },
      },
    }).triples();

    return html`
    <section>
    <h1>Metadata</h1>

    <img class="u-photo thumbnail-image" src="${photo.thumbnailUrl}"/>

      <p>
        <a href="${photo.fullImage}">[webp]</a>
        <a href="${photo.pngUrl}">[png]</a>
        <share-metadata-button format="image/webp" url=${photo.pngUrl}></share-metadata-button>
        <a href="#/album/${albumId}">[album]</a>
      </p>

      ${this.renderSemanticData(imageTriples)}
      ${this.renderExif(tdb)}

    </section>
    `;
  }
}

customElements.define("metadata-page", MetadataPage);
