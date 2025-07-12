import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.js";

export class UnescoLink extends LitElem {
  static properties = {
    urn: { type: String }
  };

  get placeId() {
    const match = this.urn?.match(/^urn:ró:unesco:(\d+)$/);
    return match ? match[1] : null;
  }

  get url() {
    return this.placeId
      ? `https://whc.unesco.org/en/list/${this.placeId}`
      : null;
  }

  render() {
    if (!this.placeId) {
      return html`<span>Invalid UNESCO URN</span>`;
    }
    return html`
      <a class="unesco-link" href="${this.url}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.placeId}</span>
        <span class="unesco-text-short">UNESCO #${this.placeId}</span>
      </a>
    `;
  }
}

customElements.define('unesco-link', UnescoLink);