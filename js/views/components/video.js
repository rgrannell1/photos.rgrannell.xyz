import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.js";

export class AppVideo extends LitElem {
  static get properties() {
    return {
      id: { type: String },
      url: { type: String },
      preload: { type: String },
    };
  }

  render() {
    return html`
    <video controls class="thumbnail-video" preload="${this.preload}">
      <source src="${this.url}" type="video/mp4">
    </video>
    `;
  }
}

customElements.define("app-video", AppVideo);
