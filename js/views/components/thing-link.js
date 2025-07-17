/*
 * Construct a link for a urn:ró arn
 */

import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.js";
import { Things } from "../../services/things.js"

import { BinomialTypes } from "../../constants.js";

export class ThingLink extends LitElem {
  static properties = {
    urn: { type: String },
  };

  name() {
    const { type, id } = Things.parseUrn(this.urn);

    if (BinomialTypes.has(type)) {
      const label = id.charAt(0).toUpperCase() + id.slice(1);
      return html`<em>${decodeURIComponent(label.replace('-', ' '))}</em>`;
    }

    return decodeURIComponent(id)
  }

  render() {
    if (!Things.isUrn(this.urn)) {
      return html`<span>Invalid URN</span>`;
    }

    return html`
      <a class="thing-link" href="${Things.toURL(this.urn)}">${this.name()}</a>
    `;
  }
}

customElements.define("thing-link", ThingLink);
