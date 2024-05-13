import { html } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { getAlbums } from "../../../services/albums.js";
import "../../components/tag-link.js";
import { Metadata } from "../../../services/tags.js";
import { GraphData } from "../../../services/graph-data.js";

const md = new Metadata();
await md.init();

 /*
   * Render additional information about the album
   *
   */
 function renderHighlight() {
  const tags = new Set([]);

  for (const image of this.album().images) {
    for (const tag of image.tags) {
      tags.add(tag);
    }
  }

  return html`<div>
    <ul>
    ${Array.from(tags)
      .sort()
      .filter(tag => {
        return md.isChild("Animal", tag);
      })
      .map(tag => {
        return html`<li>
          <tag-link tagName="${tag}"></tag-link>
        </li>`;
      })}
    </ul>
  </div>`;
}


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
    return html`<li>
      <tag-link tagName="${tag[0]}" count="${tag[1]}"></tag-link>
    </li>`
  }

  connectedCallback() {
    super.connectedCallback();

    GraphData.set({
      title: `Tags - photos.rgrannell.xyz`,
      description: "Tags - photos.rgrannell.xyz",
      image: "",
      url: window.location.href,
    });
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
