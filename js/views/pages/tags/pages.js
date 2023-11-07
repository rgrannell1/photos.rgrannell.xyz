import { html, LitElement } from "../../../library/lit.js";

export class TagsPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <section>
      <h1>Tags</h1>
    </section>
    `;
  }
}

customElements.define("tags-page", TagsPage);
