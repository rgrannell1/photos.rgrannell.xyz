/*
 * #/videos
 *
 * List all videos in a grid, with differen quality options available.
 */

import { html } from "../../../library/lit.js";

import "../../components/video.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { LitElem } from "../../../models/lit-element.js";
import { Videos } from "../../../services/videos.js";

export class VideosPage extends LitElem {
  static get properties() {
    return {
      videos: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  videos() {
    return this.videos.videos();
  }

  render() {
    const videos = this.videos().map((video, idx) => {
      return html`<app-video
      id=${video.id}
      url_poster=${video.poster_url}
      url_unscaled=${video.video_url_unscaled}
      url_1080p=${video.video_url_1080p}
      url_720p=${video.video_url_720p}
      url_480p=${video.video_url_480p}
      preload="${Videos.loadingMode(idx)}"
      ></app-video>`;
    });

    return html`
    <div>
      <section class="photos-metadata">
        <h1>Videos</h1>
        <p class="photo-album-count">${videos.length} videos</p>
      </section>

      <section class="photo-container">
        ${videos}
      </section>
    </div>
    `;
  }
}

customElements.define("videos-page", VideosPage);
