
import { LitElement, html } from "../../../../library/lit.js";

export class AppPhoto extends LitElement {
  static get properties()  {
    return {
      thumbnailUrl: { type: String },
      fullUrl: { type: String },
      id: { type: Number }
    }
  }
  createRenderRoot() {
    return this;
  }

  broadcastClickPhoto() {
    const dispatched = new CustomEvent('click-photo', {
      detail: { id: this.id },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(dispatched);
  }

  render() {
    return html`
    <div class="photo">
      <img src="${this.thumbnailUrl}" @click=${this.broadcastClickPhoto}>
    </div>
    `
  }
}

customElements.define('app-photo', AppPhoto);
