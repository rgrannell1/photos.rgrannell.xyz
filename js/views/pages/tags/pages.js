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


const albums = await (new Vault()).albums();

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

  async renderTagCover(tag) {
    const vault = new Vault();
    const image = await vault.tagCover(tag);
    const links = await vault.tagLinks(tag);

    return html`<tag-album url="${image.thumbnail_url}" tagName=${tag} .links=${links}>`
  }

  render() {

    return html`
    <section>
      <h2>Irish Species</h2>

      <h2>Irish Mammals</h2>

      <section class="album-container">

      ${until(this.renderTagCover('Pine Marten'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('European Rabbit'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Fallow Deer'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Goat'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Grey Squirrel'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Red Squirrel'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Red Deer'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Seal'), html`<p>Temp Loading</p>`)}

      </section>

      <h2>Irish Birds</h2>

      <section class="album-container">

      ${until(this.renderTagCover('Barn Swallow'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Blackbird'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Brent Goose'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Chaffinch'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Coot'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Cormorant'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Coal Tit'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Duck'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Egyptian Goose'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Eurasian Collared Dove'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Eurasian Jay'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Fieldfare'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Gannet'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Great Tit'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Greenfinch'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Grey Wagtail'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Guillemot'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Heron'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Hooded Crow'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Jackdaw'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Kestrel'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Lapwing'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Little Egret'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Little Grebe'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Mandarin Duck'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Muscovy Duck'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Oystercatcher'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Pidgeon'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Pied Wagtail'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Puffin'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Red Kite'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Ring Necked Pheasant'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Roseate Tern'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Skitty Coot'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Smew'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Stonechat'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Treecreeper'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Tufted Duck'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Turnstone'), html`<p>Temp Loading</p>`)}
      ${until(this.renderTagCover('Wren'), html`<p>Temp Loading</p>`)}

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
