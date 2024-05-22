import { html, until } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { Vault } from "../../../models/vault.js";

import "../../components/tag-link.js";
import "./components/tag-album.js";
import { Metadata } from "../../../services/tags.js";

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


export class TagsPage extends LitElem {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      vault: { type: Object },
    };
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
    </li>`
  }

  renderTagCover(tag) {
    const image = this.vault.tagCover(tag);
    const links = this.vault.tagLinks(tag);

    if (!image) {
      console.error(`No cover image for tag: ${tag}`);
      return;
    }

    return html`<tag-album url="${image.thumbnail_url}" tagName=${tag} .links=${links}>`
  }

  render() {

    return html`
    <section>
      <h2>Irish Species</h2>

      <h2>Irish Mammals</h2>

      <section class="album-container">

      ${this.renderTagCover('Pine Marten')}
      ${this.renderTagCover('European Rabbit')}
      ${this.renderTagCover('Fallow Deer')}
      ${this.renderTagCover('Goat')}
      ${this.renderTagCover('Grey Squirrel')}
      ${this.renderTagCover('Red Squirrel')}
      ${this.renderTagCover('Red Deer')}
      ${this.renderTagCover('Seal')}

      </section>

      <h2>Irish Birds</h2>

      <section class="album-container">

      ${this.renderTagCover('Barn Swallow')}
      ${this.renderTagCover('Blackbird')}
      ${this.renderTagCover('Brent Goose')}
      ${this.renderTagCover('Chaffinch')}
      ${this.renderTagCover('Coot')}
      ${this.renderTagCover('Cormorant')}
      ${this.renderTagCover('Coal Tit')}
      ${this.renderTagCover('Duck')}
      ${this.renderTagCover('Egyptian Goose')}
      ${this.renderTagCover('Eurasian Collared Dove')}
      ${this.renderTagCover('Eurasian Jay')}
      ${this.renderTagCover('Fieldfare')}
      ${this.renderTagCover('Gannet')}
      ${this.renderTagCover('Great Tit')}
      ${this.renderTagCover('Greenfinch')}
      ${this.renderTagCover('Grey Wagtail')}
      ${this.renderTagCover('Guillemot')}
      ${this.renderTagCover('Heron')}
      ${this.renderTagCover('Hooded Crow')}
      ${this.renderTagCover('Jackdaw')}
      ${this.renderTagCover('Kestrel')}
      ${this.renderTagCover('Lapwing')}
      ${this.renderTagCover('Little Egret')}
      ${this.renderTagCover('Little Grebe')}
      ${this.renderTagCover('Mandarin Duck')}
      ${this.renderTagCover('Muscovy Duck')}
      ${this.renderTagCover('Oystercatcher')}
      ${this.renderTagCover('Pigeon')}
      ${this.renderTagCover('Pied Wagtail')}
      ${this.renderTagCover('Puffin')}
      ${this.renderTagCover('Red Kite')}
      ${this.renderTagCover('Ring Necked Pheasant')}
      ${this.renderTagCover('Roseate Tern')}
      ${this.renderTagCover('Skitty Coot')}
      ${this.renderTagCover('Smew')}
      ${this.renderTagCover('Stonechat')}
      ${this.renderTagCover('Treecreeper')}
      ${this.renderTagCover('Tufted Duck')}
      ${this.renderTagCover('Turnstone')}
      ${this.renderTagCover('Wren')}

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
}

customElements.define("tags-page", TagsPage);
