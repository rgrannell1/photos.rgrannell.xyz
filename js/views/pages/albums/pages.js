/*
 * /#/albums
 *
 * All albums. Shows cover photos in a grid + some basic album information.
 */

import { asyncAppend } from "../../../library/lit.js";
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
        mosaicColours: album.mosaic,
        id: album.id,
        count: photos_count,
        flags: album.flags,
      };
    });
  }

  render() {
    performance.mark("start-albums-render");

    const sorted = this.getAlbums()
      .sort((album0, album1) => {
        return album1.maxDate - album0.maxDate;
      });

    /*
     * append photo albums to the DOM
     */
    async function* albumIterable() {
      for (let idx = 0; idx < sorted.length; idx++) {
        const album = sorted[idx];
        const loading = Photos.loadingMode(idx);

        yield html`
          <photo-album
            title="${album.title}"
            url="${album.url}"
            mosaicColours="${album.mosaicColours}"
            id="${album.id}" count="${album.count}"
            minDate="${album.minDate}"
            maxDate="${album.maxDate}"
            countries="${album.flags}"
            loading=${loading}>
            </photo-album>
          `;
      }
    }

    return html`
    <section class="album-metadata">
      <h1 class="albums-header">Albums</h1>
      <photos-stats
        .stats=${this.stats.stats()}
        ></photos-stats>
    </section>

    <section class="album-container">
      ${asyncAppend(albumIterable())}
    </section>
    `;
  }
}

customElements.define("photo-album-page", AlbumsPage);
