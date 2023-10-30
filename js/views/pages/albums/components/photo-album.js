
import { LitElement, html } from "../../../../library/lit.js";

export class PhotoAlbum extends LitElement {
  createRenderRoot() {
    return this;
  }
  static get properties()  {
    return {
      title: { type: String },
      url: { type: String },
      date: { type: String },
      id: { type: String },
      count: { type: Number }
    }
  }

  broadcastClickAlbum() {
    const dispatched = new CustomEvent('click-album', {
      detail: {
        id: this.id,
        title: this.title
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(dispatched);
  }

  render() {
    return html`
    <div class="photo-album">
      <img src="${this.url}" alt="${this.title} - Photo Album Thumbnail" @click=${this.broadcastClickAlbum}>
      <p class="photo-album-title">${this.title}</p>
      <p class="photo-album-date">${this.date}</p>
      <p class="photo-album-count">${this.count} ${this.count === 1 ? 'photo' : 'photos'}</p>
    </div>
    `
  }
}

customElements.define('photo-album', PhotoAlbum);
