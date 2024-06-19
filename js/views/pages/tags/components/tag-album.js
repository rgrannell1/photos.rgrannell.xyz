import { html } from "../../../../library/lit.js";
import { LitElem } from "../../../../models/lit-element.js";

export class TagAlbum extends LitElem {
  static get properties() {
    return {
      tagName: { type: String },
      url: { type: String },
      links: { type: Object },
      loading: { type: String },
    };
  }

  render() {
    const { tagName } = this;

    return html`<div class="photo-album">
      <img class="thumbnail-image" width="400" height="400" src="${this.url}" title="${tagName}" alt="${tagName} - Tag Photo Album Thumbnail"
        @click=${this.broadcast("click-tag", { tagName })}
        loading="${this.loading}"/>

      <br>
      <p>${tagName}</p>

      <!-- Add links to wikipedia and birdwatch -->
      ${
      this?.links?.wikipedia
        ? html`<a href="${this.links.wikipedia}">[wiki]</a>`
        : ""
    }
      ${
      this?.links?.birdwatch
        ? html`<a href="${this.links.birdwatch}">[birdwatch]</a>`
        : ""
    }
    </div>`;
  }
}

customElements.define("tag-album", TagAlbum);
