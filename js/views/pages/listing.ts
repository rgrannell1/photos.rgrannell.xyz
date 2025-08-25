/*
 * /#/listing/<id>
 *
 * A list of all things of type "bird", "plane", etc. Unlike
 * thing/type:*, it's not just a photo list. It's more like the albums
 * page
 */

import { html } from "lit-element";
import { asUrn } from "../../library/tribble.js";

import "../components/photo.ts";
import "../components/video.ts";
import "../components/share.ts";
import "../components/thing-link.ts";

import { LitElem } from "../../models/lit-element.ts";
import { Photos } from "js/services/photos.ts";

class ListingPageService {
  /*
   * List all things of this type, and the name
   */
  static getDistinctThings(tdb, type: string) {
    const results = tdb.search({
      source: { type },
      relation: "name",
    }).objects() as { id: string; name: string }[];

    return results.sort((res0, res1) => {
      return res0.name.localeCompare(res1.name);
    });
  }

  static chooseBestImage(tdb, type: string, urn: string): string | undefined {
    const results = tdb.search({
      source: { type: "photo" },
      target: asUrn(urn),
    });

    const sourceIds = results.sources();
    const ratedPhotos = Array.from(sourceIds).map((source: string) => {
      const result = tdb.search({
        source: asUrn(source),
        relation: "rating",
      });
      const ratings = Array.from(result.targets()).map((rating: string) => {
        return decodeURIComponent(asUrn(rating).id).length;
      });

      return {
        photo: source,
        rating: Math.max(...ratings),
      };
    }).sort((pair0, pair1) => {
      return pair1.rating - pair0.rating;
    });

    const bestPhoto = ratedPhotos[0];
    if (!bestPhoto) {
      console.error("No photo found for", type, urn);
    }

    return bestPhoto?.photo;
  }
}

class ThingAlbum extends LitElem {
  static get properties() {
    return {
      triples: { type: Object, state: true },
      url: { type: String },
      id: { type: String },
      mosaicColours: { type: String },
      count: { type: Number },
      loading: { type: String },
    };
  }
  render() {
    const thumbnailDataUrl = Photos.encodeBitmapDataURL(this.mosaicColours);

    return html`
    <div class="photo-album">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${this.url}" src="${thumbnailDataUrl}"/>
    </div>
    `;
  }
}

customElements.define("thing-album", ThingAlbum);

export class ListingPage extends LitElem {
  id!: string;
  triples!: Object;

  static get properties() {
    return {
      id: { type: String },
      triples: { type: Object, state: true },
    };
  }

  renderMetadata(type: string, urn: string, name: string) {
    const thingDetails = this.triples.search({
      source: asUrn(urn),
    }).firstObject();

    return html`
      <div>
        <p>${name}</p>
        ${
      thingDetails.wikipedia
        ? html`<span><a href="${thingDetails.wikipedia}">[wiki]</a></span>`
        : ""
    }

        ${
      thingDetails.birdwatch_url
        ? html`<span><a href="${thingDetails.birdwatch_url}">[birdwatch]</a></span>`
        : ""
    }
      </div>
    `;
  }

  /*
   * Render the album page. Can differ between different types.
   */
  renderThingAlbum(type: string, urn: string, name: string, idx: number) {
    const imageUrn = ListingPageService.chooseBestImage(
      this.triples,
      type,
      urn,
    );

    const image = this.triples.search({
      source: asUrn(imageUrn),
    }).firstObject();

    return html`
          <photo-album
            .triples=${this.triples}
            title="${"no such thing exists"}"
            url="${image.thumbnail_url}"
            mosaicColours="${image.mosaic_colours}"
            id="${"urn:ró:album:fake"}"
            loading=${Photos.loadingMode(idx)}>
          ${this.renderMetadata(type, urn, name)}
            </photo-album>

    `;
  }

  render() {
    const tdb = this.triples;

    // get all named things
    const things = ListingPageService.getDistinctThings(tdb, this.id);

    // loop over, create albums page

    return html`
    <section class="album-metadata">
      <h1 class="albums-header">${this.id.charAt(0).toUpperCase() + this.id.slice(1)}s</h1>
      <a href="/#thing/${this.id}:*">See all ${this.id} photos</a>
    </section>

    <section class="album-container">

      ${
      things.map((thing, idx) =>
        this.renderThingAlbum(this.id, thing.id, thing.name, idx)
      )
    }
    </section>
    `;
  }
}

customElements.define("listing-page", ListingPage);
