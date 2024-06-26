import { html } from "../../../../library/lit.js";
import { LitElem } from "../../../../models/lit-element.js";

export class TagAlbum extends LitElem {
  static get properties() {
    return {
      tagName: { type: String },
      url: { type: String },
      thumbnailDataUrl: { type: String },
      links: { type: Object },
      loading: { type: String },
      cache: { type: Array },
    };
  }

  hidePlaceholder(event) {
    this.broadcast("photo-loaded", { url: this.thumbnailUrl })();

    const $placeholder = event.target.parentNode.querySelector(
      ".thumbnail-placeholder",
    );
    $placeholder.style.zIndex = -1;
  }

  render() {
    const { tagName } = this;

    if (this.cache.includes(this.url)) {
        return html`<div class="photo-album">
        <img
          class="thumbnail-image" width="400" height="400" src="${this.url}" title="${tagName}" alt="${tagName} - Tag Photo Album Thumbnail"
          @click=${this.broadcast("click-tag", { tagName })}
          loading="${this.loading}"/>

        <br>
        <p>${tagName}</p>

        <!-- Add links to wikipedia and birdwatch -->
        ${
        this?.links?.wikipedia
          ? html`<a href="${this.links.wikipedia}">[wiki]</a>`
          : ""
      }
        ${
        this?.links?.birdwatch
          ? html`<a href="${this.links.birdwatch}">[birdwatch]</a>`
          : ""
      }
      </div>`;
    }

    return html`<div class="photo-album">
      <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${this.thumbnailDataUrl}"/>

      <img
        @load=${this.hidePlaceholder.bind(this)} style="z-index: -1"
        class="thumbnail-image" width="400" height="400" src="${this.url}" title="${tagName}" alt="${tagName} - Tag Photo Album Thumbnail"
        @click=${this.broadcast("click-tag", { tagName })}
        loading="${this.loading}"/>

      <br>
      <p>${tagName}</p>

      <!-- Add links to wikipedia and birdwatch -->
      ${
      this?.links?.wikipedia
        ? html`<a href="${this.links.wikipedia}">[wiki]</a>`
        : ""
    }
      ${
      this?.links?.birdwatch
        ? html`<a href="${this.links.birdwatch}">[birdwatch]</a>`
        : ""
    }
    </div>`;
  }
}

customElements.define("tag-album", TagAlbum);
