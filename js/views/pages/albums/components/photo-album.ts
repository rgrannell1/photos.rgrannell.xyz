import { html } from "../../../../library/lit.js";
import { parseUrn } from "../../../../library/tribble.js";
import { LitElem } from "../../../../models/lit-element.ts";
import { Dates } from "../../../../services/dates.ts";
import { Photos } from "../../../../services/photos.ts";
import { Countries } from "../../../../services/things.ts";

export class PhotoAlbum extends LitElem {
  static get properties() {
    return {
      title: { type: String },
      triples: { type: Object },
      url: { type: String },
      mosaicColours: { type: String },
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

  renderCountries() {
    return this.countries.split(",").map((country) => {
      const { flag, urn } = Countries.details(this.triples, country);

      const parsed = parseUrn(urn);

      // TODO swap for an anchor tag
      return html`<span href="#/thing/country:${parsed.id}" title=${country}>${flag}</span>`;
    });
  }

  render() {
    performance.mark(`start-album-render-${this.url}`);

    const thumbnailDataUrl = Photos.encodeBitmapDataURL(this.mosaicColours);
    const flags = this.renderCountries();

    const albumId = parseUrn(this.id)

    return html`
    <div class="photo-album">
      <a href="${"/#/album/" + this.id}" onclick="event.preventDefault();">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${thumbnailDataUrl}"/>
        <img @load=${
      this.hidePlaceholder.bind(this)
    } style="z-index: -1" class="u-photo thumbnail-image" width="400" height="400" src="${this.url}" alt="${this.title} - Photo Album Thumbnail" loading="${this.loading}"
        @click=${
      this.broadcast("click-album", {
        id: albumId.id,
        title: this.title,
      })
    }>
    </a>
      <div class="photo-album-metadata">
        <p class="photo-album-title">${this.title}</p>
        <p class="photo-album-date" data-min-date=${this.minDate}>
          <time>${this.dateRange()}</time>
        </p>
        <div class="photo-metadata-inline">
        <p class="photo-album-count">${this.count} ${
      this.count === 1 ? "photo" : "photos"
    }</p>
        <p class="photo-album-countries">${flags}</p>
        </div>

    </div>
    </div>
    `;
  }
}

customElements.define("photo-album", PhotoAlbum);
