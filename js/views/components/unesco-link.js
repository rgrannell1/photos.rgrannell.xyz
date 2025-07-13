import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.js";
import { Things } from "../../services/things.js"

export class UnescoLink extends LitElem {
  static properties = {
    urn: { type: String },
  };

  id() {
    return Things.parseUrn(this.urn)?.id ?? 'unknown';
  }

  url() {
    return this.id()
      ? `https://whc.unesco.org/en/list/${this.id()}`
      : null;
  }

  render() {
    if (!this.id()) {
      return html`<span>Invalid UNESCO URN</span>`;
    }
    return html`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.id()}</span>
        <span class="unesco-text-short">UNESCO #${this.id()}</span>
      </a>
    `;
  }
}

customElements.define("unesco-link", UnescoLink);
