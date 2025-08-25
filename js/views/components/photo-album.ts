import { html, LitElement } from "../../library/lit.js";
import { parseUrn } from "../../library/tribble.js";
import { LitElem } from "../../models/lit-element.ts";
import { Dates } from "../../services/dates.ts";
import { Photos } from "../../services/photos.ts";
import { Countries } from "../../things/things.ts";

// TODO styles are now broken?

export class PhotoAlbum extends LitElement {
  id!: string;
  title!: string;
  triples!: Object;
  url!: string;
  mosaicColours!: string;
  loading!: string;

  broadcast(label: string, detail?: any) {
    return () => {
      const dispatched = new CustomEvent(label, {
        detail,
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(dispatched);
    };
  }

  static get properties() {
    return {
      title: { type: String },
      triples: { type: Object, state: true },
      url: { type: String },
      mosaicColours: { type: String },
      id: { type: String },
      loading: { type: String },
    };
  }

  hidePlaceholder(event) {
    this.broadcast("photo-loaded", { url: this.url })();

    const $placeholder = event.target.parentNode.querySelector(
      ".thumbnail-placeholder",
    );
    $placeholder.style.zIndex = -1;
  }

  renderLink() {
    return html`
    `;
  }

  renderPlaceholder() {
    const thumbnailDataUrl = Photos.encodeBitmapDataURL(this.mosaicColours);

    return html`
    <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${thumbnailDataUrl}"/>
    `;
  }

  renderImage() {
    const albumId = parseUrn(this.id);
    return html`
    <img @load=${
      this.hidePlaceholder.bind(this)
    } style="z-index: -1" class="u-photo thumbnail-image" width="400" height="400" src="${this.url}" alt="${this.title} - Photo Album Thumbnail" loading="${this.loading}"
      @click=${
      this.broadcast("click-album", {
        id: albumId.id,
        title: this.title,
      })
    }>
    `;
  }

  // TODO, just style this one component in a .css file?
  // I don't like that pattern, though...

  render() {
    performance.mark(`start-album-render-${this.url}`);

    return html`
    <link rel="stylesheet" href="/dist/css/style.css">
    <div class="photo-album">
      <a href="${"/#/album/" + this.id}" onclick="event.preventDefault();">
        ${this.renderPlaceholder()}
        ${this.renderImage()}
      </a>
      <slot></slot>
    </div>`;
  }
}

class PhotoAlbumMetadata extends LitElem {
  title!: string;
  triples!: Object;
  minDate!: string;
  maxDate!: string;
  countries!: string;
  count!: number;

  static get properties() {
    return {
      title: { type: String },
      triples: { type: Object },
      minDate: { type: String },
      maxDate: { type: String },
      countries: { type: String },
      count: { type: Number },
    };
  }

  dateRange() {
    if (!this.minDate && !this.maxDate) {
      return "unknown date";
    }
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    return Dates.dateRange(this.minDate, this.maxDate, mediaQuery.matches);
  }

  renderCountries() {
    return this.countries.split(",").map((country: string) => {
      const { flag, urn } = Countries.details(this.triples, country);

      const parsed = parseUrn(urn);
      return html`<a href="#/thing/country:${parsed.id}" title=${country}>${flag}</a>`;
    });
  }

  render() {
    const photoText = this.count === 1 ? "photo" : "photos";

    const flags = this.renderCountries();
    return html`
    <div class="photo-album-metadata">
      <p class="photo-album-title">${this.title}</p>
      <p class="photo-album-date" data-min-date=${this.minDate}>
        <time>${this.dateRange()}</time>
      </p>
      <div class="photo-metadata-inline">
        <p class="photo-album-count">${this.count} ${photoText}</p>
        <p class="photo-album-countries">${flags}</p>
      </div>
    </div>`;
  }
}

customElements.define("photo-album", PhotoAlbum);
customElements.define("photo-album-metadata", PhotoAlbumMetadata);
