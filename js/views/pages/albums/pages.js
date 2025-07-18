/*
 * /#/albums
 *
 * All albums. Shows cover photos in a grid + some basic album information.
 */

import { html } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { Photos } from "../../../services/photos.js";

import "./components/photos-stats.js";
import "./components/photo-album.js";

export class AlbumsPage extends LitElem {
  static get properties() {
    return {
      albums: { type: Object },
      stats: { type: Object },
    };
  }
  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }
  getAlbums() {
    return Object.values(this.albums.albums()).map((album) => {
      const { photos_count } = album;

      return {
        title: album.album_name,
        minDate: album.min_date,
        maxDate: album.max_date,
        url: album.thumbnail_url,
        thumbnailDataUrl: `data:image/bmp;base64,${album.thumbnail_mosaic_url}`,
        id: album.id,
        count: photos_count,
        flags: (album.flags ?? "").split(","),
      };
    });
  }



  render() {
    performance.mark("start-albums-render");


    return html`
    <section class="album-metadata">
      <h1 class="albums-header">Albums</h1>
      <photos-stats
        .stats=${this.stats.stats()}
        ></photos-stats>
    </section>

    <section class="album-container">
      ${
      this.getAlbums()
        .sort((album0, album1) => {
          return album1.maxDate - album0.maxDate;
        })
        .map((album, idx) => {
          const loading = Photos.loadingMode(idx);

          return html`
            <photo-album
              title="${album.title}"
              url="${album.url}"
              thumbnailDataUrl="${album.thumbnailDataUrl}"
              id="${album.id}" count="${album.count}"
              minDate="${album.minDate}"
              maxDate="${album.maxDate}"
              .countries="${album.flags}"
              loading=${loading}>
              </photo-album>
            `;
        })
    }
    </section>
    `;
  }
}

customElements.define("photo-album-page", AlbumsPage);
