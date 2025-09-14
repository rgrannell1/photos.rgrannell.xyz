/*
 * /#/albums
 *
 * All albums. Shows cover photos in a grid + some basic album information.
 */

import { asyncAppend } from "lit/directives/async-append.js";
import { html } from "lit";
import { LitElem } from "../../models/lit-element.ts";
import { JSONFeed } from "../../services/json-feed.ts";
import { Photos } from "../../services/photos.ts";

import "../components/photos-stats.ts";
import "../components/photo-album.ts";
import "../components/year-cursor.ts";
import { property } from "lit/decorators.js";
import { asUrn } from "js/library/tribble.js";
import { ThingsService } from "js/things/services.ts";
import { Album } from "js/types.ts";

export class AlbumsPage extends LitElem {
  @property({})
  albums!: Object;

  @property({ state: true })
  triples!: Object;

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  render() {
    performance.mark("start-albums-render");

    const onAlbumClick = (album: Album) => {
      const parsedId = asUrn(album.id);

      this.dispatchEvent(
        new CustomEvent("click-album", {
          detail: { id: parsedId.id, title: album.name },
          bubbles: true,
          composed: true,
        }),
      );
    };

    const albums = ThingsService.albumObjects(this.triples);

    /*
     * append photo albums to the DOM
     */
    async function* albumIterable() {
      let year = 2000; // I didn't have a camera yet...
      const currentYear = new Date().getFullYear();

      for (let idx = 0; idx < albums.length; idx++) {
        const album = albums[idx];
        const loading = Photos.loadingMode(idx);

        const albumYear = new Date(album.minDate).getFullYear();
        if (albumYear !== year) {
          year = albumYear;

          if (albumYear !== currentYear) {
            yield html`<h2 class="album-year-heading">${albumYear}</h2>`;
          }
        }

        if (idx % 4 === 0) {
          await new Promise((res) => setTimeout(res, 0));
        }

        const metadata = html`
        <photo-album-metadata
          .triples=${this.triples}
            title="${album.name}"
            minDate="${album.minDate}"
            maxDate="${album.maxDate}"
            countries="${album.flags}"
            count="${album.photosCount}"
        ></photo-album-metadata>`;

        yield html`
          <photo-album
            .onClick=${onAlbumClick.bind(null, album)}
            .triples=${this.triples}
            title="${album.name}"
            url="${album.thumbnailUrl}"
            mosaicColours="${album.mosaicColours}"
            id="${album.id}"
            loading=${loading}>
            ${metadata}
            </photo-album>
          `;
      }
    }

    return html`
    <section class="album-metadata">
      <h1 class="albums-header">Albums</h1>
      <photos-stats></photos-stats>
    </section>

    <year-cursor></year-cursor>

    <section class="album-container">
      ${asyncAppend(albumIterable.bind(this)())}
    </section>
    `;
  }
}

customElements.define("albums-page", AlbumsPage);
