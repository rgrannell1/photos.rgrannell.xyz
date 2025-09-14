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
import { Photos } from "../../services/photos.ts";
import { property } from "lit/decorators.js";
import { Strings } from "../../strings.ts";
import { ThingsService } from "js/things/services.ts";

class ListingPageService {
  static chooseCoverImage(tdb, type: string, urn: string): string | undefined {
    const results = tdb.search({
      source: { type: "photo" },
      relation: "cover",
      target: asUrn(urn),
    });

    return results.firstObject()?.id;
  }

  static chooseBestImage(tdb, type: string, urn: string): string | undefined {
    const results = tdb.search({
      source: { type: "photo" },
      target: asUrn(urn),
    });

    const sourceIds = results.sources();
    if (!sourceIds) {
      console.error("no photos found");
    }

    const coverImage = this.chooseCoverImage(tdb, type, urn);
    if (coverImage && sourceIds.has(coverImage)) {
      return coverImage;
    }

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
  @property({ state: true })
  triples!: Object;

  @property()
  url!: string;

  @property()
  id!: string;

  @property()
  mosaicColours!: string;

  @property()
  count!: number;

  @property()
  loading!: string;

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
      <div class="thing-metadata">
        <p>${name}</p>
        ${
      thingDetails.wikipedia
        ? html`<span><a href="${thingDetails.wikipedia}">[wiki]</a></span>`
        : ""
    }

        ${
      thingDetails.birdwatchUrl,
        ? html`<span><a href="${thingDetails.birdwatchUrl}">[birdwatch]</a></span>`
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

    const loadThingPage = (urn: string, name: string) => {
      const {type, id} = asUrn(urn);

      const dispatched = new CustomEvent("click-thing-album", {
        detail: { id: `${type}:${id}`, name },
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(dispatched);
    };

    const image = this.triples.search({
      source: asUrn(imageUrn),
    }).firstObject();

    const parsedId = asUrn(this.id);
    const idLink = `${parsedId.type}:${parsedId.id}`;

    // TODO wire into photo parser
    return html`
      <photo-album
        .onClick=${loadThingPage.bind(null, urn, name)}
        .triples=${this.triples}
        title="${name}"
        url="${image.thumbnailUrl}"
        mosaicColours="${image.mosaicColours}"
        id=${idLink}
        path="#/thing/"
        loading=${Photos.loadingMode(idx)}>
      ${this.renderMetadata(type, urn, name)}
        </photo-album>
    `;
  }

  render() {
    const tdb = this.triples;
    const namedThings = ThingsService.getDistinctNames(tdb, this.id);

    // loop over, create albums page

    return html`
    <section class="album-metadata">
      <h1 class="albums-header">${Strings.capitalise(this.id)}s</h1>
      <a href="/#/thing/${this.id}:*">See all ${
      Strings.pluralise(this.id)
    } photos</a>
    </section>

    <section class="album-container">

      ${
      namedThings.map((thing, idx) =>
        this.renderThingAlbum(this.id, thing.id, thing.name, idx)
      )
    }
    </section>
    `;
  }
}

customElements.define("listing-page", ListingPage);
