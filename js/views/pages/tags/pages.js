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
  static IRISH_ANIMALS = {
    mammals: [
      'Pine Marten',
      'European Rabbit',
      'Fallow Deer',
      'Goat',
      'Grey Squirrel',
      'Red Squirrel',
      'Red Deer',
      'Seal'
    ].sort(),
    birds: [
      'Barn Swallow',
      'Blackbird',
      'Brent Goose',
      'Chaffinch',
      'Coal Tit',
      'Coot',
      'Cormorant',
      'Duck',
      'Egyptian Goose',
      'Eurasian Collared Dove',
      'Eurasian Jay',
      'Fieldfare',
      'Gannet',
      'Great Tit',
      'Greenfinch',
      'Grey Wagtail',
      'Guillemot',
      'Heron',
      'Hooded Crow',
      'Jackdaw',
      'Kestrel',
      'Lapwing',
      'Little Egret',
      'Little Grebe',
      'Mandarin Duck',
      'Muscovy Duck',
      'Oystercatcher',
      'Pied Wagtail',
      'Pigeon',
      'Puffin',
      'Razorbill',
      'Red Kite',
      'Ring Necked Pheasant',
      'Roseate Tern',
      'Skitty Coot',
      'Smew',
      'Stonechat',
      'Treecreeper',
      'Tufted Duck',
      'Turnstone',
      'Wren'
    ].sort()
  }

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

      ${TagsPage.IRISH_ANIMALS.mammals.map(this.renderTagCover.bind(this))}

      </section>

      <h2>Irish Birds</h2>

      <section class="album-container">
        ${TagsPage.IRISH_ANIMALS.birds.map(this.renderTagCover.bind(this))}
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
