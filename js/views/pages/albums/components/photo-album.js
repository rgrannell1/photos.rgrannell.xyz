import { html } from "../../../../library/lit.js";
import { LitElem } from "../../../../models/lit-element.js";

export class PhotoAlbum extends LitElem {
  static get properties() {
    return {
      title: { type: String },
      url: { type: String },
      minDate: { type: String },
      maxDate: { type: String },
      id: { type: String },
      count: { type: Number },
      loading: { type: String },
    };
  }

  dateRange() {
    if (!this.minDate && !this.maxDate) {
      return "unknown date";
    }

    const minDate = new Date(parseFloat(this.minDate));
    const maxDate = new Date(parseFloat(this.maxDate));

    const opts = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const from = minDate.toLocaleDateString("en-IE", opts);
    const to = maxDate.toLocaleDateString("en-IE", opts);

    if (from === to) {
      return from;
    }

    return `${from} — ${to}`;
  }

  render() {
    console.log('album', this.loading)

    return html`
    <div class="photo-album">
      <img width="400" height="400" src="${this.url}" alt="${this.title} - Photo Album Thumbnail"
      loading="${this.loading}"
      @click=${this.broadcast('click-album', {
          id: this.id,
          title: this.title,
        })}>
      <p class="photo-album-title">${this.title}</p>
      <p class="photo-album-date">${this.dateRange()}</p>
      <p class="photo-album-count">${this.count} ${
      this.count === 1 ? "photo" : "photos"
    }</p>
    </div>
    `;
  }
}

customElements.define("photo-album", PhotoAlbum);
