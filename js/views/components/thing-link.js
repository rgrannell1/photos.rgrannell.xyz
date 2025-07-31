/*
 * Construct a link for a urn:ró arn
 */
import { KnownThings } from "../../constants.js";

import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.js";
import { Things, TriplesDB } from "../../services/things.js";

import { BinomialTypes } from "../../constants.js";
import { Binomials } from "../../services/things.js";

export class UnescoLink extends LitElem {
  static properties = {
    urn: { type: String },
  };

  id() {
    return Things.parseUrn(this.urn)?.id ?? "unknown";
  }

  url() {
    return this.id() ? `https://whc.unesco.org/en/list/${this.id()}` : null;
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
    const name = TriplesDB.findName(this.triples, this.urn);

    if (name) {
      return html`<span>${name}</span>`;
    }

    return decodeURIComponent(id);
  }

  linkClass() {
    const { type } = Things.parseUrn(this.urn);

    if (type === KnownThings.BIRD) {
      return "bird-link";
    } else if (type === KnownThings.MAMMAL) {
      return "mammal-link";
    }
  }

  render() {
    if (!Things.isUrn(this.urn)) {
      return html`<span>Invalid URN</span>`;
    }

    return html`
      <a class="thing-link ${this.linkClass()}" href="${Things.toURL(this.urn)}">${this.name()}</a>
    `;
  }
}

customElements.define("thing-link", ThingLink);
