/*
 * /#/album/<id>
 *
 * Each individual album page. Shows photos, videos, and some album metadata
 */

import { html, unsafeHTML } from "../../../library/lit.js";

import "../../components/photo.js";
import "../../components/video.js";
import "./components/share.js";
import "../../components/unesco-link.js";

import { Dates } from "../../../services/dates.js";
import { Photos } from "../../../services/photos.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { Things } from "../../../services/things.js";
import { LitElem } from "../../../models/lit-element.js";
import { KnownThings } from "../../../constants.js";
import { CountriesService } from "../../../services/countries.js";

export class AlbumPage extends LitElem {
  static get properties() {
    return {
      title: { type: String },
      id: { type: String },
      minDate: { type: String },
      maxDate: { type: String },
      imageCount: { type: Number },
      description: { type: String },
      images: { type: Object },
      videos: { type: Object },
      semantic: { type: Object },
      countries: { type: String },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    const photo = this.albumPhotos()[0];
    if (!photo) {
      console.error(`empty album! ${this.id}`);
    }

    JSONFeed.setIndex();
  }

  albumPhotos() {
    const semantic = this.semantic.semantic();

    return this.images.images().filter((image) => {
      return image.album_id === this.id;
    }).map((image) => {
      const relations = {};

      const relevantFacts = semantic.filter((fact) => {
        return fact[0] === image.id;
      });

      for (const [_, type, value] of relevantFacts) {
        if (!relations[type]) {
          relations[type] = [];
        }
        relations[type].push(value);
      }

      return { ...image, relations };
    });
  }

  albumVideos() {
    return this.videos.videos().filter((video) => {
      return video.album_id === this.id;
    });
  }

  renderPhotoCount() {
    return this.imageCount === 1
      ? `${this.imageCount} photo`
      : `${this.imageCount} photos`;
  }

  thingsLinks() {
    const groups = {};
    const albumPhotos = this.albumPhotos();

    for (const type of [KnownThings.UNESCO]) {
      groups[type] = Array.from(new Set(
        albumPhotos.flatMap((photo) => {
          return photo.relations.location?.filter((location) => {
            return Things.is(location, type);
          });
        }).filter(val => val),
      ));
    }

    return Array.from(groups[KnownThings.UNESCO]).map((urn) => {
      return html`<unesco-link urn="${urn}"></unesco-link>`;
    });
  }

  render() {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    const range = Dates.dateRange(
      this.minDate,
      this.maxDate,
      mediaQuery.matches,
    );

    const albumPhotos = this.albumPhotos();
    const photos = albumPhotos.map((photo, idx) => {
      return html`
      <app-photo
        id=${photo.id}
        summary=${photo.relations.summary}
        loading="${Photos.loadingMode(idx)}"
        thumbnailUrl="${photo.thumbnail_url}"
        mosaicColours="${photo.mosaic_colours}"
        imageUrl="${photo.full_image}"></app-photo>`;
    });

    const videos = this.albumVideos().map((video, idx) => {
      return html`<app-video
        id=${video.id}
        url_poster=${video.poster_url}
        url_unscaled=${video.video_url_unscaled}
        url_1080p=${video.video_url_1080p}
        url_720p=${video.video_url_720p}
        url_480p=${video.video_url_480p}
        ></app-video>`;
    });

    const flags = CountriesService.flags(this?.countries.split(","));

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
          ${this.thingsLinks().map((link) => html`<li>${link}</li>`)}
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
