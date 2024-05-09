import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.js";

export class AppPhoto extends LitElem {
  static get properties() {
    return {
      id: { type: Number },
      imageUrl: { type: String },
      thumbnailUrl: { type: String },
      tags: { type: Array },
      loading: { type: String },
    };
  }

  render() {
    const photoMetadata = {
      id: this.id,
      imageUrl: this.imageUrl,
      thumbnailUrl: this.thumbnailUrl,
      tags: this.tags,
    };

    return html`
    <div class="photo">
      <div
        @click=${this.broadcast("click-photo-metadata", photoMetadata)}
        class="photo-metadata-popover">ℹ️</div>
      <img
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
