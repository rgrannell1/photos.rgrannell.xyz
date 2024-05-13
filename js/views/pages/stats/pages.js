import { html, LitElement } from "../../../library/lit.js";

export class StatsPage extends LitElement {
  createRenderRoot() {
    return this;
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
