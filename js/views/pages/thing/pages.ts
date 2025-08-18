/*
 * /#/thing/:urn
 *
 * Details about subjects or places of a photo
 */

import { html } from "../../../library/lit.js";
import { asUrn, parseUrn } from "../../../library/tribble.js";

import "../../components/photo.ts";
import { JSONFeed } from "../../../services/json-feed.ts";
import { LitElem } from "../../../models/lit-element.ts";
import { BinomialTypes, KnownRelations } from "../../../constants.js";
import { Binomials, Things } from "../../../things/things.ts";
import { Photos } from "../../../services/photos.ts";
import { URN } from "js/types.ts";

export class ThingPage extends LitElem {
  static get properties() {
    return {
      urn: { type: String },
      triples: { type: Object, state: true },
    };
  }

  override connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  urnImages(tdb: any, query: any) {
    const relevantPhotos = tdb.search(query);
    const relevantPhotoIds = relevantPhotos.sources();

    return Array.from(relevantPhotoIds).flatMap((photoId) => {
      const match = tdb.search({
        source: { id: photoId, type: "photo" },
      }).firstObject();

      return match ? [match] : [];
    });
  }

  renderSubjectPhotos(images: Record<string, string>[]) {
    return images
      .sort((photo0, photo1) => {
        return photo1.created_at - photo0.created_at;
      })
      .map((photo, idx) => {
        return html`
      <app-photo
        id=${photo.id.startsWith("urn:") ? parseUrn(photo.id).id : photo.id}
        loading="${Photos.loadingMode(idx)}"
        thumbnailUrl="${photo.thumbnail_url}"
        mosaicColours="${photo.mosaic_colours}"
        imageUrl="${photo.full_image}"></app-photo>`;
      });
  }

  getAlbums() {
    return this.triples.search({
      source: { type: "album" },
    }).objects();
  }

  renderSubjectAlbums(tdb, search) {
    const filtered = this.urnImages(tdb, search);

    const albumSet = new Set(filtered.map((photo) => {
      return photo.album_id;
    }));

    return Array
      .from(albumSet)
      .flatMap((albumId) => {
        return this.getAlbums().filter((album) => {
          return parseUrn(album.id).id === albumId;
        });
      })
      .sort((album0, album1) => {
        return album1.min_date - album0.min_date;
      })
      .map((album) => {
        return html`
          <photo-album
            .triples=${this.triples}
            title="${album.name}"
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
  firstPhotographed(images, tdb, query) {
    const relevantPhotos = this
      .urnImages(tdb, query)
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
      relation: KnownRelations.NAME,
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

  renderClassification(type: string) {
    return html`<a href="#/thing/${type}:*">${type.charAt(0).toUpperCase()}${
      type.slice(1)
    }</a>`;
  }

  getPhotoQueries(urn: URN) {
    const target: Partial<URN> = urn;
    if (target.id === "*") {
      delete target.id;
    }

    const queries = [];
    if (BinomialTypes.has(urn.type)) {
      for (const label of ["captivity", "wild"]) {
        const qs = { context: label };

        const target = { ...urn, ...{ qs } };
        queries.push({
          label,
          query: { target },
        });
      }
    } else {
      // todo, search where QS is missing
      queries.push({
        label: "default",
        query: {
          target: urn,
        },
      });
    }

    return queries;
  }

  renderPhotoSection(groups) {
    return html`<div>
    ${
      Object.entries(groups).flatMap(([label, groupPhotos]) => {
        if (!groupPhotos) {
          return [];
        }
        if (groupPhotos.length === 0) {
          return [];
        }

        if (label === "default") {
          return [html`
        <div class="photo-group">
          ${groupPhotos}
        </div>
        `];
        }

        return [html`
        <div class="photo-group">
          <h4>${label.charAt(0).toUpperCase() + label.slice(1)}</h4>
          ${groupPhotos}
        </div>
      `];
      })
    }
    <div/>`;
  }

  render() {
    // Show a Name, URN, Description,
    // Wikilinks, and all images with this ARN
    // Support bird:* level queries
    const tdb = this.triples;

    const images = tdb.search({
      source: { type: "photo" },
    }).objects();
    const urn = Things.parseUrn(this.urn);

    const type = urn.type;

    const urnFacts = tdb.search({
      source: asUrn(this.urn),
    }).firstObject() ?? {};

    const metadata = Object.assign({
      "Classification": this.renderClassification(type),
    });

    if (urnFacts.country) {
      metadata["Country"] =
        html`<thing-link .triples=${this.triples} urn=${urnFacts.country}></thing-link>`;
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
        this.firstPhotographed(images, tdb, {
          target: asUrn(this.urn),
        })
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

    // TODO; rework photos to allow group by function
    const targetSearch = asUrn(this.urn);
    if (targetSearch.id === "*") {
      // don't filter by ID in this case
      delete targetSearch.id;
    }

    const query = {
      target: targetSearch,
      //relation: { relation: semanticRelations }, TODO broken
    };

    const queries = this.getPhotoQueries(asUrn(this.urn));

    const photoGroups = {};
    for (const { query, label } of queries) {
      const relevantPhotos = this.urnImages(tdb, query);
      photoGroups[label] = this.renderSubjectPhotos(relevantPhotos);
    }

    const albums = this.renderSubjectAlbums(tdb, query);
    const photos = this.renderPhotoSection(photoGroups);

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
