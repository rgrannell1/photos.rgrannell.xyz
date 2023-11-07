import { html } from "../../../../library/lit.js";
import { LitElem } from "../../../../models/lit-element.js";

export class AppPhoto extends LitElem {
  static get properties() {
    return {
      imageUrl: { type: String },
      thumbnailUrl: { type: String },
    };
  }

  render() {
    return html`
    <div class="photo">
      <img
        class="photo"
        src="${this.thumbnailUrl}"
        @click=${this.broadcast('click-photo', {
          imageUrl: this.imageUrl
        })}>
    </div>
    `;
  }
}

customElements.define("app-photo", AppPhoto);
