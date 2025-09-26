/*
 * /#/thing/:urn
 *
 * Details about subjects or places of a photo
 */

import { html } from "lit-element";
import { asUrn, parseUrn } from "../../library/tribble.js";

import "../components/photo.ts";
import { JSONFeed } from "../../services/json-feed.ts";
import { LitElem } from "../../models/lit-element.ts";
import { BinomialTypes, KnownRelations, KnownThings } from "../../constants.js";
import { Binomials, Countries, Things } from "../../things/things.ts";
import { Photos } from "../../services/photos.ts";
import { URN } from "js/types.ts";
import { property } from "lit/decorators.js";
import { GoogleMapsService, ThingsService } from "js/things/services.ts";
import { Strings } from "js/strings.ts";
import { PageLocation } from "../../services/location.ts";

export class ThingPage extends LitElem {
  @property()
  urn: string;

  @property({ state: true })
  triples: Object;

  override connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
    this.updatePageLocation();
  }

  private updatePageLocation() {
    const name = ThingsService.getName(this.triples, this.urn);
    if (!name) {
      document.title = "Thing - photos";
      return;
    }

    document.title = `${Strings.capitalise(name)} - photos`;
  }

  isValidImage(image: Record<string, any>) {
    return image && image.thumbnailUrl;
  }

  urnImages(tdb: any, query: Record<string, any>) {
    const relevantPhotos = tdb.search(query);
    const relevantPhotoIds = relevantPhotos.sources();

    return Array.from(relevantPhotoIds).flatMap((photoId: string) => {
      if (photoId.startsWith("urn:ró")) {
        const match = tdb.search({
          source: asUrn(photoId),
        }).firstObject();

        return this.isValidImage(match) ? [match] : [];
      }

      const match = tdb.search({
        source: { id: photoId, type: "photo" },
      }).firstObject();

      return this.isValidImage(match) ? [match] : [];
    });
  }

  renderSubjectPhotos(images: Record<string, string>[]) {
    return images
      .sort((photo0, photo1) => {
        return photo1.createdAt - photo0.createdAt;
      })
      .map((photo, idx) => {
        return html`
      <app-photo
        id=${photo.id.startsWith("urn:") ? parseUrn(photo.id).id : photo.id}
        loading="${Photos.loadingMode(idx)}"
        thumbnailUrl="${photo.thumbnailUrl}"
        mosaicColours="${photo.mosaicColours}"
        imageUrl="${photo.fullImage}"></app-photo>`;
      });
  }

  renderSubjectAlbums(tdb, search) {
    const filtered = this.urnImages(tdb, search);

    const albumSet = new Set(filtered.map((photo) => {
      return photo.albumId;
    }));

    const onAlbumClick = (album) => {
      const parsedId = asUrn(album.id);

      this.dispatchEvent(
        new CustomEvent("click-album", {
          detail: { id: parsedId.id, title: album.title ?? album.name },
          bubbles: true,
          composed: true,
        }),
      );
    };

    return Array
      .from(albumSet)
      .flatMap((albumId) => {
        return ThingsService.albumObjects(this.triples).filter((album) => {
          return parseUrn(album.id).id === albumId;
        });
      })
      .map((album) => {
        const metadata = html`
        <photo-album-metadata
            .triples=${this.triples}
            title="${album.name}"
            count="${album.count}"
            minDate="${album.minDate}"
            maxDate="${album.maxDate}"
            countries="${album.flags}"
        ></photo-album-metadata>`;

        return html`
          <photo-album
            .onClick=${onAlbumClick.bind(null, album)}
            .triples=${this.triples}
            title="${album.name}"
            url="${album.thumbnailUrl}"
            mosaicColours="${album.mosaicColours}"
            id="${album.id}"
            loading="eager">
      ${metadata}
          </photo-album>
      `;
      });
  }

  // todo push into semantic layer
  firstPhotographed(tdb, query) {
    const relevantPhotos = this
      .urnImages(tdb, query)
      .sort((photo0, photo1) => {
        return photo0.createdAt - photo1.createdAt;
      });

    const first = relevantPhotos[0];
    if (!first) {
      return "Unknown";
    }

    return new Date(parseInt(first.createdAt)).toLocaleDateString("en-IE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  // TODO move this to a naming service
  renderTitle() {
    const definedName = ThingsService.getName(this.triples, this.urn);
    if (definedName) {
      return definedName;
    }

    try {
      const parsedUrn = Things.parseUrn(this.urn);
      const value = decodeURIComponent(parsedUrn.id);

      if (parsedUrn.id === "*") {
        return Strings.capitalise(parsedUrn.type);
      }

      // broken subtly
      if (parsedUrn.type === KnownThings.COUNTRY) {
        const countryDetails = this.triples.search({ source: parsedUrn })
          .firstObject();
        if (countryDetails.flag) {
          return `${countryDetails.flag} ${definedName}`;
        } else {
          return definedName;
        }
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
    return html`<a href="#/listing/${type}">${Strings.capitalise(type)}</a>`;
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
          source: { type: "photo" },
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
          <h4>${Strings.capitalise(label)}</h4>
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

    const images = ThingsService.photoObjects(tdb);
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

    if (urnFacts.fcodeName) {
      const fcodeName = urnFacts.fcodeName;
      metadata["Place Type"] = html`${Strings.capitalise(fcodeName)}`;
    }

    if (BinomialTypes.has(type)) {
      // TODO move to fact layer, not render layer
      metadata["First Photographed"] = html`<span>${
        this.firstPhotographed(tdb, {
          target: asUrn(this.urn),
        })
      }</span>`;
    }

    const wikipedia = urnFacts[KnownRelations.WIKIPEDIA];
    const birdwatchUrl = urnFacts[KnownRelations.BIRDWATCH_URL];
    const location = GoogleMapsService.getURL(tdb, this.urn);

    // TODO; rework photos to allow group by function
    const targetSearch = asUrn(this.urn);
    if (targetSearch.id === "*") {
      // don't filter by ID in this case
      delete targetSearch.id;
    }

    // TODO too much logic in a render function

    const photoQueries = this.getPhotoQueries(asUrn(this.urn));

    const photoGroups = {};
    for (const { query, label } of photoQueries) {
      const relevantPhotos = this.urnImages(tdb, query);
      photoGroups[label] = this.renderSubjectPhotos(relevantPhotos);
    }

    const query = {
      source: { type: "photo" },
      target: targetSearch,
    };

    const albums = this.renderSubjectAlbums(tdb, query);
    const photos = this.renderPhotoSection(photoGroups);

    return html`
      <div>
      <section class="thing-page">
        <h1>${this.renderTitle()}</h1>

        <p>
          ${
      BinomialTypes.has(type) && urn.id !== "*"
        ? html`<span class="thing-binomial ${type}-binomial">(${
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
