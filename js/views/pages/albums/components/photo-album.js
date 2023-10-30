
import { LitElement, html } from "../../../../library/lit.js";

export class PhotoAlbum extends LitElement {
  createRenderRoot() {
    return this;
  }
  static get properties()  {
    return {
      title: { type: String },
      url: { type: String },
      minDate: { type: String },
      maxDate: { type: String },
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

  dateRange() {
    if (!this.minDate && !this.maxDate) {
      return 'unknown date';
    }

    const minDate = new Date(parseFloat(this.minDate));
    const maxDate = new Date(parseFloat(this.maxDate));

    const from = minDate.toLocaleDateString('en-IE');
    const to = maxDate.toLocaleDateString('en-IE');

    console.log(from)

    return `${from} — ${to}`;
  }

  render() {
    return html`
    <div class="photo-album">
      <img src="${this.url}" alt="${this.title} - Photo Album Thumbnail" @click=${this.broadcastClickAlbum}>
      <p class="photo-album-title">${this.title}</p>
      <p class="photo-album-date">${this.dateRange()}</p>
      <p class="photo-album-count">${this.count} ${this.count === 1 ? 'photo' : 'photos'}</p>
    </div>
    `
  }
}

customElements.define('photo-album', PhotoAlbum);
