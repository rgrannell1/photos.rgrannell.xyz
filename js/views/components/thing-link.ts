/*
 * Construct a link for a urn:ró arn
 */
import { KnownRelations, KnownThings } from "../../constants.js";

import { html } from "lit-element";
import { LitElem } from "../../models/lit-element.ts";
import { Countries, Things } from "../../things/things.ts";

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

export class CountryLink extends LitElem {
  @property()
  urn!: string;

  @property()
  name!: string;

  @property()
  triples!: string;

  render() {
    const details = Countries.urnDetails(this.triples, this.urn);
    const href = Things.toURL(this.urn);

    return html`<a class="country-link" href="${href}">${details.flag} ${details.name}</a>`;
  }
}

customElements.define("country-link", CountryLink);

export class ThingLink extends LitElem {
  @property()
  urn!: string;

  @property()
  triples!: any;

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

    const url = Things.toURL(this.urn);

    if (Things.is(this.urn, KnownThings.COUNTRY)) {
      return html`
        <country-link .triples=${this.triples} urn="${this.urn}" name=${this.name()}></country-link>
      `;
    }

    return html`
      <a class="thing-link ${this.linkClass()}" title="${this.name()}" href="${url}">${this.name()}</a>
    `;
  }
}

customElements.define("thing-link", ThingLink);
