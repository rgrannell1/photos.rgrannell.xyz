/*
 * Construct a link for a urn:ró arn
 */
import { KnownRelations, KnownThings } from "../../constants.js";

import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.ts";
import { Things } from "../../services/things.ts";

import { BinomialTypes } from "../../constants.js";
import { Binomials } from "../../services/things.ts";

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
    const name = this.triples.search({
      source: Things.parseUrn(this.urn),
      relation: KnownRelations.NAME,
    }).firstTarget();

    console.log(this.urn);

    if (name) {
      return html`<span>${name}</span>`;
    }

    return decodeURIComponent(id);
  }

  linkClass() {
    const { type } = Things.parseUrn(this.urn);

    const classes = {
      [KnownThings.BIRD]: "bird-link",
      [KnownThings.MAMMAL]: "mammal-link",
      [KnownThings.REPTILE]: "reptile-link",
      [KnownThings.AMPHIBIAN]: "amphibian-link",
      [KnownThings.FISH]: "fish-link",
      [KnownThings.INSECT]: "insect-link",
    };

    return classes[type] ?? "";
  }

  render() {
    if (!Things.isUrn(this.urn)) {
      return html`<span>Invalid URN</span>`;
    }

    return html`
      <a class="thing-link ${this.linkClass()}" href="${
      Things.toURL(this.urn)
    }">${this.name()}</a>
    `;
  }
}

customElements.define("thing-link", ThingLink);
