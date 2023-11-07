import { html, LitElement } from "../../../library/lit.js";

export class LocationsPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <section>
      <h1>Locations</h1>
    </section>
    `;
  }
}

customElements.define("locations-page", LocationsPage);
