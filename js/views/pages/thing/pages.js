/*
 * /#/thing/:urn
 *
 * Details about subjects or places of a photo
 */

import { html } from "../../../library/lit.js";

import "../../components/photo.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { LitElem } from "../../../models/lit-element.js";

export class ThingPage extends LitElem {
  static get properties() {
    return {
      thing: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  render() {
    return html`
      <div>
        <section class="thing-page">
          <h1>${this.thing.name}</h1>
          <p>${this.thing.description}</p>
        </section>
      </div>
    `;
  }
}

customElements.define("thing-page", ThingPage);
