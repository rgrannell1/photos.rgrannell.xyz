import { parseUrn } from "js/library/tribble.js";
import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.ts";
import { Photos } from "../../services/photos.ts";

export class AppPhoto extends LitElem {
  static get properties() {
    return {
      id: { type: String },
      imageUrl: { type: String },
      thumbnailUrl: { type: String },
      mosaicColours: { type: String },
      summary: { type: String },
      loading: { type: String },
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
    if (!this.id) {
      return html`<p>Missing photo ID</p>`;
    }

    const photoMetadata = {
      id: this.id,
      imageUrl: this.imageUrl,
      thumbnailUrl: this.thumbnailUrl,
      thumbnailDataUrl: Photos.encodeBitmapDataURL(this.mosaicColours),
    };

    // Yes this is a script injection risk, no I don't plan on doing that to myself.
    const div = document.createElement("div");
    div.innerHTML = this.summary ?? "";
    const sanitisedDangerously = div.textContent ?? div.innerText ?? "";

    return html`
    <div class="photo">
      <a href="${"#/metadata/" + this.id}" onclick="event.preventDefault();">
        <div
          @click=${this.broadcast("click-photo-metadata", photoMetadata)}
          class="photo-metadata-popover">${this.renderIcon()}</div>
      </a>

      <a href="${this.imageUrl}" target="_blank" rel="external">
        <img class="u-photo thumbnail-image thumbnail-placeholder" width="400" height="400" src="${photoMetadata.thumbnailDataUrl}"/>

        <img
          @load=${this.hidePlaceholder.bind(this)} style="z-index: -1"
          class="thumbnail-image"
          alt=${sanitisedDangerously}
          title=${sanitisedDangerously}
          width="400"
          height="400"
          src="${this.thumbnailUrl}"
          loading="${this.loading}"/>
      </a>
    </div>
    `;
  }
}

customElements.define("app-photo", AppPhoto);
