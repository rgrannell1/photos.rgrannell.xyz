/*
 * /#/thing/:urn
 *
 * Details about subjects or places of a photo
 */

import { html } from "../../../library/lit.js";

import "../../components/photo.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { LitElem } from "../../../models/lit-element.js";
import { BinomialTypes, KnownRelations } from "../../../constants.js";
import {
  Binomials,
  Things
} from "../../../services/things.js";
import { Photos } from "../../../services/photos.js";
import { asUrn } from "../../../library/tribble.js";

export class ThingPage extends LitElem {
  static get properties() {
    return {
      urn: { type: String },
      images: { type: Object },
      albums: { type: Object },
      triples: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  filterUrnImages(images, tdb) {
    const semanticRelations = [
      KnownRelations.SUBJECT,
      KnownRelations.LOCATION,
      KnownRelations.RATING,
    ];

    const targetSearch = asUrn(this.urn);

    // don't filter by ID in this case
    if (targetSearch.id === "*") {
      delete targetSearch.id;
    }


    const relevantPhotos = tdb.search({
      target: targetSearch,
      // TODO broken
      //relation: { relation: semanticRelations },
    })

    const relevantPhotoIds = relevantPhotos.sources()

    return Array.from(relevantPhotoIds).flatMap((photoId) => {
      return images.filter((image) => image.id === photoId).slice(0, 1);
    });
  }

  renderSubjectPhotos(images, tdb) {
    return this.filterUrnImages(images, tdb)
      .sort((photo0, photo1) => {
        return photo1.created_at - photo0.created_at;
      })
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

  renderSubjectAlbums(images, tdb) {
    const filtered = this.filterUrnImages(images, tdb);
    const albumSet = new Set(filtered.map((photo) => {
      return photo.album_id;
    }));

    return Array
      .from(albumSet)
      .flatMap((albumId) => {
        return this.albums.albums().filter((album) => {
          return album.id === albumId;
        });
      })
      .sort((album0, album1) => {
        return album1.min_date - album0.min_date;
      })
      .map((album) => {
        return html`
          <photo-album
            title="${album.album_name}"
            url="${album.thumbnail_url}"
            mosaicColours="${album.mosaic}"
            id="${album.id}"
            count="${album.photos_count}"
            minDate="${album.min_date}"
            maxDate="${album.max_date}"
            countries="${album.flags}"
            loading="eager">
            </photo-album>
      `;
      });
  }

  // todo push into semantic layer
  firstPhotographed(images, tdb) {
    const relevantPhotos = this
      .filterUrnImages(images, tdb)
      .sort((photo0, photo1) => {
        return photo0.created_at - photo1.created_at;
      });

    const first = relevantPhotos[0];

    if (!first) {
      return "Unknown";
    }

    return new Date(first.created_at).toLocaleDateString("en-IE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  renderTitle() {
    const { id, type } = Things.parseUrn(this.urn);

    const definedName = this.triples.search({
      source: { id, type },
      relation: KnownRelations.NAME
    }).firstTarget();

    if (definedName) {
      return definedName;
    }

    try {
      const parsedUrn = Things.parseUrn(this.urn);
      const value = decodeURIComponent(parsedUrn.id);

      if (parsedUrn.id === "*") {
        return `${parsedUrn.type.charAt(0).toUpperCase()}${
          parsedUrn.type.slice(1)
        }`;
      }

      if (BinomialTypes.has(parsedUrn.type)) {
        return Binomials.toCommonName(this.triples, value);
      }

      return value;
    } catch (_) {
      return this.urn;
    }
  }

  renderClassification(type) {
    return html`<a href="#/thing/${type}:*">${type.charAt(0).toUpperCase()}${
      type.slice(1)
    }</a>`;
  }

  render() {
    // Show a Name, URN, Description,
    // Wikilinks, and all images with this ARN
    // Support bird:* level queries
    const tdb = this.triples;

    const images = this.images.images();
    const photos = this.renderSubjectPhotos(images, tdb);
    const albums = this.renderSubjectAlbums(images, tdb);

    const urn = Things.parseUrn(this.urn);
    const type = urn.type;

    const urnFacts = tdb.search({
      source: asUrn(this.urn),
    }).firstObject() ?? {};

    const metadata = Object.assign({
      "Classification": this.renderClassification(type),
    });

    if (urnFacts.country) {
      metadata["Country"] = html`${urnFacts.country}`;
    }

    if (urnFacts.fcode_name) {
      const fcodeName = urnFacts.fcode_name;
      metadata["Place Type"] = html`${fcodeName.charAt(0).toUpperCase()}${
        fcodeName.slice(1)
      }`;
    }

    if (BinomialTypes.has(type)) {
      // TODO move to fact layer, not render layer
      metadata["First Photographed"] = html`<span>${
        this.firstPhotographed(images, tdb)
      }</span>`;
    }

    const wikipedia = urnFacts[KnownRelations.WIKIPEDIA];
    const birdwatchUrl = urnFacts[KnownRelations.BIRDWATCH_URL];
    const longitude = urnFacts[KnownRelations.LONGITUDE];
    const latitude = urnFacts[KnownRelations.LATITUDE];

    let location;
    if (longitude && latitude) {
      const googleMapsUrl =
        `https://www.google.com/maps?q=${latitude},${longitude}`;
      location = html`
      <a href="${googleMapsUrl}" target="_blank" rel="noopener">[maps]</a>
      `;
    }

    return html`
      <div>
      <section class="thing-page">
        <h1>${this.renderTitle()}</h1>

        <p>
          ${
      BinomialTypes.has(type) && urn.id !== "*"
        ? html`<span class="thing-binomial">(${
          Binomials.pretty(urn.id)
        })</span>`
        : html``
    }
        </p>
        <br>

        ${
      wikipedia
        ? html`<a href="${wikipedia}" target="_blank" rel="noopener">[wikipedia]</a>`
        : html``
    }
        ${
      birdwatchUrl
        ? html`<a href="${birdwatchUrl}" target="_blank" rel="noopener">[birdwatch]</a>`
        : html``
    }
        ${location ? html`<span class="location">${location}</span>` : html``}

        <h3>Metadata</h3>
        <table class="metadata-table">
        ${
      Object.entries(metadata).map(
        ([key, value]) =>
          html`
          <tr>
            <th class="exif-heading">${key}</th>
            <td>${value}</td>
          </tr>
          `,
      )
    }
        </table>

        <br>
        ${photos}

        <h3>Albums</h3>

        </section>

        <section class="album-container">
          ${albums}
        </section>

      </div>
    `;
  }
}

customElements.define("thing-page", ThingPage);
