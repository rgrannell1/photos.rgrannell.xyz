import { html } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { getAlbums } from "../../../services/albums.js";
import { GraphData } from "../../../services/graph-data.js";

import "./components/photo-album.js";

const albums = getAlbums();

export class AlbumsPage extends LitElem {
  albums() {
    return Object.values(albums).map((album) => {
      const { images } = album;
      if (!images) {
        return;
      }

      const coverImage = images.find((image) => {
        return image.fpath === album.cover_image;
      });

      const url = coverImage?.thumbnail_url ?? images[0]?.thumbnail_url;

      return {
        title: album.name,
        minDate: album.min_date,
        maxDate: album.max_date,
        url,
        id: album.id,
        count: images.length,
      };
    });
  }

  imageCount() {
    let count = 0;

    for (const album of this.albums()) {
      count += album.count;
    }

    return count;
  }

  loadingMode(idx) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const imageDimension = 400;
    const maxImagesPerRow = Math.floor(viewportWidth / imageDimension);
    const maxRowsInFold = Math.floor(viewportHeight / imageDimension);

    return idx > (maxImagesPerRow * maxRowsInFold) ? "lazy" : "eager";
  }

  sortedAlbums() {
    return this.albums().sort((album0, album1) => {
      return album1.maxDate - album0.maxDate;
    });
  }

  connectedCallback() {
    super.connectedCallback();
    const latestAlbum = this.sortedAlbums()[0];
    if (!latestAlbum) {
      return;
    }

    GraphData.set({
      title: this.title,
      description: "Various photos",
      image: latestAlbum.url,
      url: window.location.href,
    });
  }

  render() {
    return html`
    <section class="album-metadata">
      <h1>Albums</h1>
      <p class="photo-count">${this.imageCount()} photos</p>
    </section>

    <section class="album-container">
      ${
      this.sortedAlbums()
        .map((album, idx) => {
          const loading = this.loadingMode(idx);

          return html`
            <photo-album
              title="${album.title}" url="${album.url}"
              id="${album.id}" count="${album.count}"
              minDate="${album.minDate}"
              maxDate="${album.maxDate}"
              loading=${loading}></photo-album>
            `;
        })
    }
    </section>
    `;
  }
}

customElements.define("photo-album-page", AlbumsPage);
