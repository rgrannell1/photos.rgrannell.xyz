import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.js";

export class AppVideo extends LitElem {
  static get properties() {
    return {
      id: { type: String },
      url: { type: String }
    };
  }

  render() {
    const photoMetadata = {
      id: this.id,
      imageUrl: this.imageUrl,
      thumbnailUrl: this.thumbnailUrl,
      thumbnailDataUrl: this.thumbnailDataUrl,
      tags: this.tags,
    };

    return html`
    <video controls class="thumbnail-video">
      <source src="${this.url}" type="video/mp4">
    </video>
    `;
  }
}

customElements.define("app-video", AppVideo);
