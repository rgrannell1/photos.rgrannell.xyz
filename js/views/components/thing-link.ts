/*
 * Construct a link for a urn:ró arn
 */
import { KnownRelations, KnownThings } from "../../constants.js";

import { html } from "lit-element";
import { LitElem } from "../../models/lit-element.ts";
import { Things } from "../../things/things.ts";

import { BinomialTypes } from "../../constants.js";
import { Binomials } from "../../things/things.ts";
import { property } from "lit/decorators.js";

export class UnescoLink extends LitElem {
  @property()
  urn: string;

  getId() {
    return Things.parseUrn(this.urn)?.id ?? "unknown";
  }

  url() {
    return this.getId()
      ? `https://whc.unesco.org/en/list/${this.getId()}`
      : null;
  }

  render() {
    if (!this.getId()) {
      return html`<span>Invalid UNESCO URN</span>`;
    }
    return html`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.getId()}</span>
        <span class="unesco-text-short">UNESCO #${this.getId()}</span>
      </a>
    `;
  }
}

customElements.define("unesco-link", UnescoLink);

export class ThingLink extends LitElem {
  urn!: string;
  triples!: any;

  static properties = {
    urn: { type: String },
    triples: { type: Object },
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
