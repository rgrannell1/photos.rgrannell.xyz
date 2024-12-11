import { cache, html, until } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { JSONFeed } from "../../../services/json-feed.js";

import "../../components/tag-link.js";
import "./components/tag-album.js";

export class TagsPage extends LitElem {
  static get properties() {
    return {
      images: { type: Object },
      metadata: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  tags() {
    const tags = {};

    for (const image of this.images.images()) {
      for (const tag of image.tags) {
        if (!tags[tag]) {
          tags[tag] = 0;
        }

        tags[tag]++;
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

  tagCover(tag) {
    const tagged = this.images.images().filter((image) => {
      return image.tags.includes(tag);
    });

    return tagged[0];
  }

  tagLinks(tag) {
    return this.metadata[tag]?.links;
  }

  renderTagCover(tag) {
    const image = this.tagCover(tag);
    const links = this.tagLinks(tag);

    if (!image) {
      console.error(`No cover image for tag: ${tag}`);
      return;
    }

    return html`<tag-album url="${image.thumbnail_url}" thumbnailDataUrl="${image.thumbnail_mosaic_url}" tagName=${tag} .links=${links}>`;
  }

  tagsFamily(md, name) {
    const children = new Set(md._data[name].children);
    return Array.from(children).sort();
  }

  render() {
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

      <section class="no-margin album-container">
        ${
      this.tagsFamily(this.metadata, "Mammal").sort().map(
        this.renderTagCover.bind(this),
      )
    }
      </section>

      <h3>Birds</h3>

      <section class="no-margin album-container">
        ${
      this.tagsFamily(this.metadata, "Bird").sort().map(
        this.renderTagCover.bind(this),
      )
    }
      </section>

      <h2>Planes</h2>
      <section class="no-margin album-container">
        ${
      this.tagsFamily(this.metadata, "Plane").sort().map(
        this.renderTagCover.bind(this),
      )
    }
    </section>

      <h2>Helicopters</h2>
      <section class="no-margin album-container">
        ${
      this.tagsFamily(this.metadata, "Helicopter").sort().map(
        this.renderTagCover.bind(this),
      )
    }
    </section>
    </section>
    `;
  }
}

customElements.define("tags-page", TagsPage);
