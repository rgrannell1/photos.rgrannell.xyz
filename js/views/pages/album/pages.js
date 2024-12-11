import { html, unsafeHTML } from "../../../library/lit.js";

import "../../components/photo.js";
import "../../components/video.js";
import "./components/share.js";

import { Dates } from "../../../services/dates.js";
import { Photos } from "../../../services/photos.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { SocialCard } from "../../../services/social-card.js";
import { LitElem } from "../../../models/lit-element.js";

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
    };
  }

  connectedCallback() {
    super.connectedCallback();

    const photo = this.albumPhotos()[0];
    if (!photo) {
      console.error(`empty album! ${this.id}`);
    }
    SocialCard.set({
      url: window.location.href,
      title: this.title,
      description: this.description,
      image: photo.thumbnail_url,
    });

    JSONFeed.setIndex();
  }

  albumPhotos() {
    return this.images.images().filter((image) => {
      return image.album_id === this.id;
    });
  }

  albumVideos() {
    return this.videos.videos().filter((video) => {
      return video.album_id === this.id;
    });
  }

  renderPhotoCount() {
    console.log(
      this
    )

    return this.imageCount === 1
      ? `${this.imageCount} photo`
      : `${this.imageCount} photos`;
  }

  render() {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    const range = Dates.dateRange(
      this.minDate,
      this.maxDate,
      mediaQuery.matches,
    );

    const photos = this.albumPhotos().map((photo, idx) => {
      return html`
      <app-photo
        id=${photo.id}
        tags="${photo.tags}"
        loading="${Photos.loadingMode(idx)}"
        thumbnailUrl="${photo.thumbnail_url}"
        thumbnailDataUrl="${photo.thumbnail_mosaic_url}"
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
        ></app-video>`
    });

    return html`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${range}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-description">${unsafeHTML(this.description)}</p>
        <br>
        <album-share-button
          .title=${this.title}
          .url=${window.location.href}></album-share-button>
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
