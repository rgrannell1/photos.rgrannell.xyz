/*
 * /#/albums
 *
 * All albums. Shows cover photos in a grid + some basic album information.
 */

import { asyncAppend } from "../../../library/lit.js";
import { html } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.ts";
import { JSONFeed } from "../../../services/json-feed.ts";
import { Photos } from "../../../services/photos.ts";

import "./components/photos-stats.ts";
import "./components/photo-album.ts";
import "./components/year-cursor.ts";

export class AlbumsPage extends LitElem {
  static get properties() {
    return {
      albums: { type: Object },
      stats: { type: Object },
      triples: { type: Object },
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
      let year = 2000;
      const currentYear = new Date().getFullYear();

      for (let idx = 0; idx < sorted.length; idx++) {
        const album = sorted[idx];
        const loading = Photos.loadingMode(idx);

        const albumYear = new Date(album.minDate).getFullYear();
        if (albumYear !== year) {
          year = albumYear;

          if (albumYear !== currentYear) {
            yield html`<h2 class="album-year-heading">${albumYear}</h2>`;
          }
        }

        yield html`
          <photo-album
            .triples=${this.triples}
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

    <year-cursor></year-cursor>

    <section class="album-container">
      ${asyncAppend(albumIterable.bind(this)())}
    </section>
    `;
  }
}

customElements.define("albums-page", AlbumsPage);
