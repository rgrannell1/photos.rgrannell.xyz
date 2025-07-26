/*
 * /#/thing/:urn
 *
 * Details about subjects or places of a photo
 */

import { html } from "../../../library/lit.js";

import "../../components/photo.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { LitElem } from "../../../models/lit-element.js";
import { KnownRelations, BinomialTypes } from "../../../constants.js";
import { Binomials, Things, TriplesDB } from "../../../services/things.js";
import { Photos } from "../../../services/photos.js";


export class ThingPage extends LitElem {
  static get properties() {
    return {
      urn: { type: String },
      images: { type: Object },
      albums: { type: Object },
      semantic: { type: Object },
      triples: { type: Array },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  isSemanticRelation(relation) {
    return (relation === KnownRelations.SUBJECT ||
      relation === KnownRelations.LOCATION ||
      relation === KnownRelations.RATING);
  }

  filterPhotos(images, facts) {
    return facts.filter((fact) => {
      const [_, relation, value] = fact;

      const candidateUrn = Things.isRating(value)
        ? `urn:ró:rating:${encodeURIComponent(value)}`
        : value;

      if (!this.isSemanticRelation(relation) && !Things.isUrn(candidateUrn)) {
        return false;
      }

      try {
        const parsedCandidate = Things.parseUrn(candidateUrn);
        const parsedUrn = Things.parseUrn(this.urn);

        if (parsedUrn.id === "*") {
          return parsedUrn.type === parsedCandidate.type;
        } else {
          return Things.sameURN(candidateUrn, this.urn);
        }
      } catch (err) {
        return false;
      }
    })
      .map((fact) => {
        return images.find((image) => image.id === fact[0]);
      })
      .filter((value) => value !== undefined);
  }

  subjectPhotos(images, facts) {
    return this.filterPhotos(images, facts)
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

  subjectAlbums(images, facts) {
    const filtered = this.filterPhotos(images, facts);
    const albumSet = new Set(filtered.map((photo) => {
      return photo.album_id;
    }));

    return Array.from(albumSet).map((albumId) => {
      const album = this.albums.albums().find(album => {
        return album.id === albumId;
      });

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

  getFacts() {
    const relevant = this.triples.filter((triple) => {
      return triple[0] === this.urn;
    });

    const facts = {};

    for (const triple of relevant) {
      const [_, relation, value] = triple;

      if (!facts.hasOwnProperty(relation)) {
        facts[relation] = [];
      }

      facts[relation].push(value);
    }

    return facts;
  }

  binomialToCommonName(binomial) {
    const match = this.triples.find((triple) => {
      const [source, relation, _] = triple;

      if (!Things.isUrn(source)) {
        return false;
      }

      const parsed = Things.parseUrn(source);
      const normalisedBinomial = binomial.replace(" ", "-").toLowerCase();

      return parsed.id === normalisedBinomial &&
        relation === KnownRelations.NAME;
    });

    if (match) {
      return match[2];
    }

    return binomial;
  }

  getTitle() {
    const triplesName = TriplesDB.findName(this.triples, this.urn);
    console.log(triplesName, this.urn);

    if (triplesName) {
      return triplesName;
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
    } catch (err) {
      return this.urn;
    }
  }

  renderFacts(urn, facts) {
    const pairs = {};

    if (facts.country) {
      pairs["Country"] = html`${facts.country}`;
    }

    return pairs;
  }

  render() {
    // Show a Name, URN, Description,
    // Wikilinks, and all images with this ARN
    // Support bird:* level queries

    const images = this.images.images();
    const facts = this.semantic.semantic();
    const photos = this.subjectPhotos(images, facts);
    const albums = this.subjectAlbums(images, facts);

    const triples = this.getFacts();
    const urn = Things.parseUrn(this.urn);
    const type = urn.type;

    const metadata = Object.assign({
      "Classification": html`<a href="#/thing/${type}:*">${type}</a>`,
    }, this.renderFacts(urn, triples));

    if (BinomialTypes.has(type)) {
      metadata["Binomial"] = html`<em>${Binomials.pretty(urn.id)}</em>`;
    }

    const wikipedia = TriplesDB.findWikipedia(this.triples, this.urn);
    const birdwatchUrl = TriplesDB.findBirdwatchUrl(this.triples, this.urn);
    const longitude = TriplesDB.findLongitude(this.triples, this.urn);
    const latitude = TriplesDB.findLatitude(this.triples, this.urn);

    let location;
    if (longitude && latitude) {
      const googleMapsUrl =
        `https://www.google.com/maps?q=${triples.latitude},${triples.longitude}`;
      location = html`
      <a href="${googleMapsUrl}" target="_blank" rel="noopener">[maps]</a>
      `;
    }

    return html`
      <div>
      <section class="thing-page">
        <h1>${this.getTitle()}</h1>

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
        ${albums}

        </section>
      </div>
    `;
  }
}

customElements.define("thing-page", ThingPage);
