import { css, html, LitElement, unsafeCSS } from "lit-element";
import { parseUrn } from "@rgrannell1/tribbledb";
import { LitElem } from "../../models/lit-element.ts";
import { Dates } from "../../services/dates.ts";
import { Photos } from "../../services/photos.ts";
import { Countries } from "../../things/things.ts";
import { property } from "lit/decorators.js";

const response = await fetch(
  `/dist/css/photo-album.${window.envConfig.build_id}.css`,
);
const cssText = await response.text();
const cssModule = { default: cssText };

const styles = css`${unsafeCSS(cssModule.default)}`;

export class PhotoAlbum extends LitElement {
  @property()
  id?: string;
  @property()
  title?: string;
  @property()
  triples?: Object;
  @property()
  url?: string;
  @property()
  mosaicColours?: string;
  @property()
  loading?: string;
  @property()
  path: string = "/#/album/";

  @property()
  onClick?: Function;

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
    if (this.mosaicColours) {
      const thumbnailDataUrl = Photos.encodeBitmapDataURL(this.mosaicColours);

      return html`
      <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${thumbnailDataUrl}"/>
      `;
    }

    return html``;
  }

  renderImage() {
    return html`
    <img @load=${
      this.hidePlaceholder.bind(this)
    } style="z-index: -1" class="u-photo thumbnail-image" width="400" height="400" src="${this.url}" alt="${this.title} - Photo Album Thumbnail" loading="${this.loading}"
      @click=${this.onClick?.bind(this)}>
    `;
  }

  static styles = styles;

  // TODO, just style this one component in a .css file?
  // I don't like that pattern, though...

  render() {
    performance.mark(`start-album-render-${this.url}`);

    return html`
    <div class="photo-album">
      <a href="${this.path + this.id}" onclick="event.preventDefault();">
        ${this.renderPlaceholder()}
        ${this.renderImage()}
      </a>
      <slot></slot>
    </div>`;
  }
}

class PhotoAlbumMetadata extends LitElem {
  @property()
  title!: string;

  @property()
  triples!: Object;
  @property()
  minDate!: string;
  @property()
  maxDate!: string;
  @property()
  countries!: string;
  @property()
  count!: number;

  static styles = styles;

  dateRange() {
    if (!this.minDate && !this.maxDate) {
      return "unknown date";
    }
    const mediaQuery = globalThis.matchMedia("(max-width: 500px)");

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
