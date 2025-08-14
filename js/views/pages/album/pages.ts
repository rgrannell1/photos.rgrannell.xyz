/*
 * /#/album/<id>
 *
 * Each individual album page. Shows photos, videos, and some album metadata
 */

import { html, unsafeHTML } from "../../../library/lit.js";
import { parseUrn } from "../../../library/tribble.js";

import "../../components/photo.ts";
import "../../components/video.ts";
import "./components/share.ts";
import "../../components/thing-link.ts";

import { Dates } from "../../../services/dates.ts";
import { Photos } from "../../../services/photos.ts";
import { JSONFeed } from "../../../services/json-feed.ts";
import { Countries, Things } from "../../../services/things.ts";
import { LitElem } from "../../../models/lit-element.ts";
import { KnownRelations, KnownThings } from "../../../constants.js";

export class AlbumPage extends LitElem {
  static get properties() {
    return {
      title: { type: String },
      id: { type: String },
      minDate: { type: String },
      maxDate: { type: String },
      imageCount: { type: Number },
      description: { type: String },
      triples: { type: Array },
      countries: { type: String },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    JSONFeed.setIndex();
  }

  albumPhotos(tdb) {
    const albumPhotoSources: Set<string> = tdb.search({
      source: { type: 'photo' },
      relation: 'album_id',
      target: { id: this.id }
    }).sources();

    return Array.from(albumPhotoSources).flatMap((source: string) => {
      const info = tdb.search({
        source: parseUrn(source)
      }).firstObject();

      return info ? [info] : [];
    });
  }

  albumVideos(tdb) {
    const albumVideoIds: Set<string> = tdb.search({
      source: {
        type: 'video'
      },
      relation: 'album_id',
      target: {
        id: this.id
      }
    }).sources();

    return Array.from(albumVideoIds).flatMap((source: string) => {
      const info = tdb.search({
        source: parseUrn(source)
      }).firstObject();

      return info ? [info] : [];
    });
  }

  renderPhotoCount() {
    return this.imageCount === 1
      ? `${this.imageCount} photo`
      : `${this.imageCount} photos`;
  }

  thingsLinks(tdb) {
    const groups = {};
    const albumPhotos = this.albumPhotos(tdb);

    for (const type of [KnownThings.UNESCO]) {
      groups[type] = Array.from(
        new Set(
          albumPhotos.flatMap((photo: Record<string, string | string[]>) => {
            return photo[KnownRelations.LOCATION]?.filter(
              (location: string) => {
                return Things.is(location, type);
              },
            );
          }).filter((val) => val),
        ),
      );
    }

    for (
      const type of [
        KnownThings.BIRD,
        KnownThings.MAMMAL,
        KnownThings.REPTILE,
        KnownThings.FISH,
        KnownThings.AMPHIBIAN,
        KnownThings.INSECT,
      ]
    ) {
      groups[type] = Array.from(
        new Set(
          albumPhotos.flatMap((photo) => {
            return photo[KnownRelations.SUBJECT]?.filter(
              (subject: string) => {
                return Things.is(subject, type);
              },
            );
          }).filter((val) => val),
        ),
      );
    }

    let links = [];

    links = links.concat(groups[KnownThings.UNESCO].map((urn) => {
      return html`<unesco-link urn="${urn}"></unesco-link>`;
    }));

    for (
      const type of [
        KnownThings.BIRD,
        KnownThings.MAMMAL,
        KnownThings.REPTILE,
        KnownThings.FISH,
        KnownThings.AMPHIBIAN,
        KnownThings.INSECT,
      ]
    ) {
      links = links.concat(groups[type].map((urn) => {
        return html`<thing-link .urn="${urn}" .triples="${this.triples}"></thing-link>`;
      }));
    }

    return links;
  }

  render() {
    const tdb = this.triples;

    const mediaQuery = window.matchMedia("(max-width: 500px)");
    const range = Dates.dateRange(
      this.minDate,
      this.maxDate,
      mediaQuery.matches,
    );

    const albumPhotos = this.albumPhotos(tdb);
    const photos = albumPhotos.map((photo, idx) => {
      return html`
      <app-photo
        id=${photo.id}
        summary=${photo.summary}
        loading="${Photos.loadingMode(idx)}"
        thumbnailUrl="${photo.thumbnail_url}"
        mosaicColours="${photo.mosaic_colours}"
        imageUrl="${photo.full_image}"></app-photo>`;
    });

    const videos = this.albumVideos(tdb).map((video, idx) => {
      return html`<app-video
        id=${video.id}
        url_poster=${video.poster_url}
        url_unscaled=${video.video_url_unscaled}
        url_1080p=${video.video_url_1080p}
        url_720p=${video.video_url_720p}
        url_480p=${video.video_url_480p}
        ></app-video>`;
    });

    const flags = this?.countries.split(",").map((country: string) => {
      const { flag, urn } = Countries.details(this.triples, country);

      const parsed = parseUrn(urn);

      // TODO swap for an anchor tag
      return html`<span href="#/thing/country:${parsed.id}" title=${country}>${flag}</span>`;
    });

    return html`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${range}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-countries">${flags}</p>
        <p class="photo-album-description">${unsafeHTML(this.description)}
        </p>

        <album-share-button
          .title=${this.title}
          .url=${window.location.href}></album-share-button>
        <a href="#/albums">[albums]</a>

        <ul class="unesco-links">
          ${this.thingsLinks(tdb).map((link) => html`<li>${link}</li>`)}
        </ul>

      </section>

      <section class="photo-container">
        ${photos}
      </section>

      <section class="video-container">
        ${videos}
      </section>
    </div>
    `;
  }
}

customElements.define("album-page", AlbumPage);
