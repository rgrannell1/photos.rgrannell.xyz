import { html } from "../../../library/lit.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { LitElem } from "../../../models/lit-element.js";

export class StatsPage extends LitElem {
  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  render() {
    return html`
    <section>
      <h1>Statistics</h1>
    </section>
    `;
  }
}

customElements.define("stats-page", StatsPage);
