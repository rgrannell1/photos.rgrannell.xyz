import { html, LitElement } from "../../../../library/lit.js";

export class AppPhoto extends LitElement {
  static get properties() {
    return {
      imageUrl: { type: String },
      thumbnailUrl: { type: String },
    };
  }
  createRenderRoot() {
    return this;
  }

  broadcastClickPhoto() {
    const dispatched = new CustomEvent("click-photo", {
      detail: { imageUrl: this.imageUrl },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(dispatched);
  }

  render() {
    return html`
    <div class="photo">
      <img
        class="photo"
        src="${this.thumbnailUrl}"
        @click=${this.broadcastClickPhoto}>
    </div>
    `;
  }
}

customElements.define("app-photo", AppPhoto);
