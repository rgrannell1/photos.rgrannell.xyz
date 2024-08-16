import { html } from "../../../../library/lit.js";
import { LitElem } from "../../../../models/lit-element.js";
import { Dates } from "../../../../services/dates.js";

export class PhotoAlbum extends LitElem {
  static get properties() {
    return {
      title: { type: String },
      url: { type: String },
      thumbnailDataUrl: { type: String },
      minDate: { type: String },
      maxDate: { type: String },
      id: { type: String },
      count: { type: Number },
      countries: { type: String },
      loading: { type: String },
    };
  }

  dateRange() {
    if (!this.minDate && !this.maxDate) {
      return "unknown date";
    }
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    return Dates.dateRange(this.minDate, this.maxDate, mediaQuery.matches);
  }

  hidePlaceholder(event) {
    this.broadcast("photo-loaded", { url: this.url })();

    const $placeholder = event.target.parentNode.querySelector(
      ".thumbnail-placeholder",
    );
    $placeholder.style.zIndex = -1;
  }

  render() {
    return html`
    <div class="photo-album">
      <a href="${'/#/album/' + this.id}" onclick="event.preventDefault();">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${this.thumbnailDataUrl}"/>
        <img @load=${
        this.hidePlaceholder.bind(this)
      } style="z-index: -1" class="thumbnail-image" width="400" height="400" src="${this.url}" alt="${this.title} - Photo Album Thumbnail" loading="${this.loading}"
        @click=${
        this.broadcast("click-album", {
          id: this.id,
          title: this.title,
        })
      }>
    </a>
      <div class="photo-album-metadata">
        <p class="photo-album-title">${this.title}</p>
        <p class="photo-album-date">
          <time>${this.dateRange()}</time>
        </p>
        <div class="photo-metadata-inline">
        <p class="photo-album-count">${this.count} ${
      this.count === 1 ? "photo" : "photos"
    }</p>
        <p class="photo-album-countries">${this.countries}</p>
        </div>

    </div>
    </div>
    `;
  }
}

customElements.define("photo-album", PhotoAlbum);
