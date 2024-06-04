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
  static PLANES = [
    'Boeing Stearman',
    'Concorde',
    'Consolidated PBY Catalina',
    'EC135 P2',
    'Harrier Jet',
    'P51 Mustang',
    'Pilatus PC-9M',
    'Red Arrows',
    'Saab 37 Viggen'
  ]
  static IRISH_ANIMALS = {
    mammals: [
      'Pine Marten',
      'European Rabbit',
      'Fallow Deer',
      'Goat',
      'Fox',
      'Grey Squirrel',
      'Red Squirrel',
      'Red Deer',
      'Harbour Seal',
      'Grey Seal',
    ].sort(),
    birds: [
      'American Robin',
      'African Grey Parrot',
      'Barn Swallow',
      'Black Crowned Night Heron',
      'Blackbird',
      'Blue and Yellow Macaw',
      'Brent Goose',
      'Chaffinch',
      'Chough',
      'Coal Tit',
      'Coot',
      'Cormorant',
      'Condor',
      "Cooper's Hawk",
      'Duck',
      'Egyptian Goose',
      'Eurasian Collared Dove',
      'European Robin',
      'Eurasian Jay',
      'Fieldfare',
      'Gannet',
      'Great Tit',
      'Greenfinch',
      'Grey Wagtail',
      'Guillemot',
      'Heron',
      'Hooded Crow',
      'House Martin',
      'Jackdaw',
      'Kestrel',
      'Lapwing',
      'Little Egret',
      'Little Grebe',
      'Mandarin Duck',
      'Muscovy Duck',
      'Oystercatcher',
      'Pelican',
      'Pied Wagtail',
      'Pigeon',
      'Peafowl',
      'Puffin',
      'Razorbill',
      'Red Headed Woodpecker',
      'Red Kite',
      'Ring Necked Pheasant',
      'Roseate Tern',
      'Skitty Coot',
      'Smew',
      'Stonechat',
      'Treecreeper',
      'Tufted Duck',
      'Turnstone',
      'Wren',
      'Swift',
      'House Martin'
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
      <h2>Ratings</h2>

      <ul>
        <li><tag-link tagName="⭐"></tag-link></li>
        <li><tag-link tagName="⭐⭐"></tag-link></li>
        <li><tag-link tagName="⭐⭐⭐"></tag-link></li>
        <li><tag-link tagName="⭐⭐⭐⭐"></tag-link></li>
        <li><tag-link tagName="⭐⭐⭐⭐⭐"></tag-link></li>
      </ul>

      <h2>Species</h2>

      <h3>Mammals</h3>

      <section class="album-container">

      ${TagsPage.IRISH_ANIMALS.mammals.map(this.renderTagCover.bind(this))}

      </section>

      <h3>Birds</h3>

      <section class="album-container">
        ${TagsPage.IRISH_ANIMALS.birds.map(this.renderTagCover.bind(this))}
      </section>

      <h2>Planes</h2>
      <section class="album-container">
        ${TagsPage.PLANES.map(this.renderTagCover.bind(this))}
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
