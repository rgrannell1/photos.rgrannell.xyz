import { html, LitElement } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";

export class MetadataPage extends LitElem {
  static get properties() {
    return {
      id: { type: Number },
      tags: { type: Array },
      imageUrl: { type: String },
      thumbnailUrl: { type: String },
    };
  }

  render() {
    console.log(this.id, this.tags, this.imageUrl, this.thumbnailUrl)

    const tags = (this.tags ?? []).map((tag) => {
      return html`
      <li>
        <a href="#/tag/${tag}">${tag}</a>
      </li>
      `;
    });

    return html`
    <section>
      <h1>Metadata</h1>

      <ol>
        <dt>Tags</dt>
        <dd>
          <ul>${tags}</ul>
        </dd>

        <dt>Image URL</dt>
        <dd>
          <a class="long-url" href="${this.imageUrl}">${this.imageUrl}</a>
        </dd>

        <dt>Thumbnail URL</dt>
        <dd>
          <a class="long-url" href="${this.thumbnailUrl}">${this.thumbnailUrl}</a>
        </dd>

      </ol>
    </section>
    `;
  }
}

customElements.define("metadata-page", MetadataPage);
