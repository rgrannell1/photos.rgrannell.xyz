/*
 * Construct a link for a urn:ró arn
 */

import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.js";
import { Things } from "../../services/things.js"

export class ThingLink extends LitElem {
  static properties = {
    urn: { type: String },
  };

  render() {
    if (!Things.isUrn(this.urn)) {
      return html`<span>Invalid UNESCO URN</span>`;
    }

    return html`
      <a class="thing-link" href="${Things.toURL(this.urn)}">${this.urn}</a>
    `;
  }
}

customElements.define("thing-link", ThingLink);
