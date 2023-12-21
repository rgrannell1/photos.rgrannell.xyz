import { html } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { getAlbums } from "../../../services/albums.js";

const albums = getAlbums();

export class TagsPage extends LitElem {
  createRenderRoot() {
    return this;
  }

  tags() {
    const tags = {};

    for (const album of Object.values(albums)) {
      for (const image of album.images) {
        for (const tag of image.tags) {
          if (!tags[tag]) {
            tags[tag] = 0;
          }

          tags[tag]++;
        }
      }
    }

    return Object.entries(tags).toSorted((tag0, tag1) => {
      return tag0[0].localeCompare(tag1[0]);
    });
  }

  renderTagLink(tag) {
    const [tagName, count] = tag;
    const encodedTagName = encodeURIComponent(tagName);

    return html`
    <li>
      <a
        href="#/tag/${encodedTagName}"
        @click=${
      this.broadcast("click-tag", { tagName })
    }>${tagName}</a> (${count})
    </li>`;
  }

  render() {
    return html`
    <section>
      <h1>Tags</h1>


      <details>
        <summary>All Tags</summary>
        <ul>
          ${this.tags().map((tag) => this.renderTagLink(tag))}
        </ul>
      </details>
    </section>
    `;
  }
}

customElements.define("tags-page", TagsPage);
