
import { html, LitElement } from "../../../library/lit.js";
import { GraphData } from "../../../services/graph-data.js";

export class StatsPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    GraphData.set({
      title: this.title,
      description: "Statistics - photos.rgrannell.xyz",
      image: "",
      url: window.location.href,
    });
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
