import { html, until } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { JSONFeed } from "../../../services/json-feed.js";

import "../../components/tag-link.js";
import "./components/tag-album.js";
import { Metadata } from "../../../models/tags.js";

export class TagsPage extends LitElem {
  static get properties() {
    return {
      vault: { type: Object },
      metadata: { state: true },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  tags() {
    const tags = {};

    const albums = this.vault.albums();

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
    </li>`;
  }

  renderTagCover(tag) {
    const image = this.vault.tagCover(tag);
    const links = this.vault.tagLinks(tag);

    if (!image) {
      console.error(`No cover image for tag: ${tag}`);
      return;
    }

    return html`<tag-album url="${image.thumbnail_url}" tagName=${tag} .links=${links}>`;
  }

  renderPlaceholder() {
    return html`
    <section>
      <p>Loading Photo Metadata</p>
    </section>
    `;
  }

  tagsFamily(md, name) {
    const children = new Set(md.metadata[name].children);
    return Array.from(children).sort()
  }

  async renderPage() {
    const md = new Metadata();
    await md.init();

    return html`
    <section>
      <h2>By Ratings</h2>

      <ul>
        <li><tag-link tagName="⭐"></tag-link></li>
        <li><tag-link tagName="⭐⭐"></tag-link></li>
        <li><tag-link tagName="⭐⭐⭐"></tag-link></li>
        <li><tag-link tagName="⭐⭐⭐⭐"></tag-link></li>
        <li><tag-link tagName="⭐⭐⭐⭐⭐"></tag-link></li>
      </ul>

      <h2>By Species</h2>

      <h3>Mammals</h3>

      <section class="album-container">
        ${this.tagsFamily(md, 'Mammal').sort().map(this.renderTagCover.bind(this))}
      </section>

      <h3>Birds</h3>

      <section class="album-container">
        ${this.tagsFamily(md, 'Bird').sort().map(this.renderTagCover.bind(this))}
      </section>

      <h2>Planes</h2>
      <section class="album-container">
        ${this.tagsFamily(md, 'Plane').sort().map(this.renderTagCover.bind(this))}
      </section>

      <br>
      <details>
        <summary>All Tags</summary>
        <ul>
          ${this.tags().map((tag) => this.renderTagLink(tag))}
        </ul>
      </details>
    </section>
    `;
  }

  render() {
    return html`${until(this.renderPage(), this.renderPlaceholder())}`;
  }
}

customElements.define("tags-page", TagsPage);
