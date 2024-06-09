import { html, LitElement } from "../../../library/lit.js";
import { JSONFeed } from "../../../services/json-feed.js";

export class StatsPage extends LitElement {
  createRenderRoot() {
    return this;
  }

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
