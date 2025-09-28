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
import { ThingsService } from "../../things/services.ts";
import { TribbleDB } from "@rgrannell1/tribbledb";

export class VideosPage extends LitElem {
  @property({ state: true })
  triples!: TribbleDB;

  override connectedCallback() {
    super.connectedCallback();
    JSONFeed.setIndex();

    document.title = "Videos- photos";
  }

  render() {
    const videos = ThingsService.videoObjects(this.triples);
    async function* videosIterable() {
      for (let idx = 0; idx < videos.length; idx++) {
        const video = videos[idx];

        if (idx % 4 === 0) {
          await new Promise((res) => setTimeout(res, 0));
        }

        yield html`<app-video
          id=${video.id}
          urlPoster=${video.posterUrl}
          urlUnscaled=${video.videoUrlUnscaled}
          url1080p=${video.videoUrl1080p}
          url720p=${video.videoUrl720p}
          url480p=${video.videoUrl480p}
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
