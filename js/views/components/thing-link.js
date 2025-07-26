/*
 * Construct a link for a urn:ró arn
 */

import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.js";
import { Things } from "../../services/things.js";

import { BinomialTypes } from "../../constants.js";
import { Binomials } from "../../services/things.js";

export class ThingLink extends LitElem {
  static properties = {
    urn: { type: String },
    triples: { type: Array },
  };

  name() {
    const { type, id } = Things.parseUrn(this.urn);

    if (BinomialTypes.has(type)) {
      return html`<span>${Binomials.toCommonName(this.triples, id)}</span>`;
    }

    return decodeURIComponent(id);
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
