import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.js";

export class AppVideo extends LitElem {
  static get properties() {
    return {
      id: { type: String },
      url: { type: String },
      preload: { type: String },
      url_poster: { type: String },
      url_unscaled: { type: String },
      url_1080p: { type: String },
      url_720p: { type: String },
      url_480p: { type: String }
    };
  }

  render() {
    return html`
    <div>
      <video controls class="thumbnail-video" preload="${this.preload}" poster=${this.url_poster}>
        <source src="${this.url_480p}" type="video/mp4">
      </video>
      <ul>
        <a href="${this.url_unscaled}">[L]</a>
        <a href="${this.url_1080p}">[M]</a>
        <a href="${this.url_720p}">[S]</a>
        <a href="${this.url_480p}">[XS]</a>
      </ul>

    </div>
    `;
  }
}

customElements.define("app-video", AppVideo);
