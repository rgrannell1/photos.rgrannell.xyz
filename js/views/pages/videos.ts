/*
 * #/videos
 *
 * List all videos in a grid, with differen quality options available.
 */

import { html } from "lit-element";

import { asyncAppend } from "lit/directives/async-append.js";
import "../components/video.ts";
import { JSONFeed } from "../../services/json-feed.ts";
import { LitElem } from "../../models/lit-element.ts";
import { Videos } from "../../services/videos.ts";
import { property } from "lit/decorators.js";

export class VideosPage extends LitElem {
  @property({ state: true })
  triples: Object;

  override connectedCallback() {
    super.connectedCallback();
    JSONFeed.setIndex();
  }

  getVideos() {
    return this.triples.search({
      source: { type: "video" },
    }).objects();
  }

  render() {
    const videos = this.getVideos();

    async function* videosIterable() {
      for (let idx = 0; idx < videos.length; idx++) {
        const video = videos[idx];

        if (idx % 4 === 0) {
          await new Promise((res) => setTimeout(res, 0));
        }

        yield html`<app-video
          id=${video.id}
          url_poster=${video.poster_url}
          url_unscaled=${video.video_url_unscaled}
          url_1080p=${video.video_url_1080p}
          url_720p=${video.video_url_720p}
          url_480p=${video.video_url_480p}
          preload="${Videos.loadingMode(idx)}"
        ></app-video>`;
      }
    }

    return html`
    <div>
      <section class="photos-metadata">
        <h1>Videos</h1>
        <p class="photo-album-count">${videos.length} videos</p>
      </section>

      <section class="photo-container">
        ${asyncAppend(videosIterable())}
      </section>
    </div>
    `;
  }
}

customElements.define("videos-page", VideosPage);
