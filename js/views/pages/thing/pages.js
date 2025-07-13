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
      urn: { type: String },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  render() {
    // Show a Name, URN, Description,
    // Wikilinks, and all images with this ARN

    return html`
      <div>
        <section class="thing-page">
          <h1>${this.urn}</h1>
        </section>
      </div>
    `;
  }
}

customElements.define("thing-page", ThingPage);
