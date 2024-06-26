import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.js";

export class AppPhoto extends LitElem {
  static get properties() {
    return {
      id: { type: String },
      imageUrl: { type: String },
      thumbnailDataUrl: { type: String },
      thumbnailUrl: { type: String },
      tags: { type: Array },
      loading: { type: String },
      cache: { type: Array },
    };
  }

  renderIcon() {
    return html`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `;
  }

  hidePlaceholder(event) {
    this.broadcast("photo-loaded", { url: this.thumbnailUrl })();

    const $placeholder = event.target.parentNode.querySelector(
      ".thumbnail-placeholder",
    );
    $placeholder.style.zIndex = -1;
  }

  render() {
    const photoMetadata = {
      id: this.id,
      imageUrl: this.imageUrl,
      thumbnailUrl: this.thumbnailUrl,
      thumbnailDataUrl: this.thumbnailDataUrl,
      tags: this.tags,
    };

    if (this.cache.includes(this.url)) {
      return html`
      <div class="photo">
        <div
          @click=${this.broadcast("click-photo-metadata", photoMetadata)}
          class="photo-metadata-popover">${this.renderIcon()}</div>

        <img
          class="thumbnail-image"
          width="400"
          height="400"
          src="${this.thumbnailUrl}"
          loading="${this.loading}"
          @click=${this.broadcast("click-photo", { imageUrl: this.imageUrl })}/>
      </div>
      `;
    }

    return html`
    <div class="photo">
      <div
        @click=${this.broadcast("click-photo-metadata", photoMetadata)}
        class="photo-metadata-popover">${this.renderIcon()}</div>

      <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${this.thumbnailDataUrl}"/>

      <img
        @load=${this.hidePlaceholder.bind(this)} style="z-index: -1"
        class="thumbnail-image"
        width="400"
        height="400"
        src="${this.thumbnailUrl}"
        loading="${this.loading}"
        @click=${this.broadcast("click-photo", { imageUrl: this.imageUrl })}/>
    </div>
    `;
  }
}

customElements.define("app-photo", AppPhoto);
