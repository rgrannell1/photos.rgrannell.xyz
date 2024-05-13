import { html, LitElement } from "../../../library/lit.js";

import "../../components/photo.js";
import { Dates } from "../../../services/dates.js";
import { Photos } from "../../../services/photos.js";
import { getAlbums } from "../../../services/albums.js";
import { GraphData } from "../../../services/graph-data.js";

const albums = getAlbums();

export class TagPage extends LitElement {
  static get properties() {
    return {
      tag: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    const photos = this.photos();
    if (!photos) {
      return
    }

    const cover = photos[0];

    GraphData.set({
      title: `${this.tag} - photos.rgrannell.xyz`,
      description: "Statistics - photos.rgrannell.xyz",
      image: cover.thumbnailUrl,
      url: window.location.href,
    });
  }

  photos() {
    const images = [];

    for (const album of Object.values(albums)) {
      for (const image of album.images) {
        if (!image.tags.includes(this.tag)) {
          continue;
        }

        const parsedDate = image.exif.dateTime
          ? Dates.parse(image.exif.dateTime)
          : undefined;

        images.push({
          id: image.id,
          dateTime: parsedDate,
          thumbnailUrl: image.thumbnail_url,
          imageUrl: image.image_url,
          tags: image.tags,
        });
      }
    }

    return images;
  }

  imageCount() {
    return this.photos().length;
  }

  render() {
    const [minDate, maxDate] = Dates.findRange(this.photos());

    const range = Dates.dateRange(minDate, maxDate);

    return html`
    <div>
      <section class="photos-metadata">
        <h1>${this.tag}</h1>
        <p class="photo-album-date">${range}</p>
        <p class="photo-album-count">${this.imageCount()} photos</p>
      </section>

      <section class="photo-container">
        ${
      this.photos().map((photo, idx) => {
        return html`
        <app-photo
          id="${photo.id}"
          tags="${photo.tags}"
          loading="${Photos.loadingMode(idx)}"
          thumbnailUrl="${photo.thumbnailUrl}"
          imageUrl="${photo.imageUrl}"></app-photo>`;
      })
    }
      </section>
    </div>
    `;
  }
}

customElements.define("tag-page", TagPage);
