
import { LitElement, html } from '../library/lit.js';

import "./pages/albums/pages.js";
import "./pages/photos/pages.js";

export class PhotoApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      id: { type: Number }
    }
  }

  createRenderRoot() {
    return this;
  }
  /*
   * Navigate to the album page
   */
  receiveClickAlbum(event) {
    const {
      title,
      id
    } = event.detail;

    this.page = 'photos';
    this.id = id;
    this.title = title;
  }

  renderPage() {
    if (!this.page || this.page === 'albums') {
      return html`
      <photo-album-page></photo-album-page>
      `
    }

    if (this.page === 'photos') {
      return html`
      <photos-page title=${this.title} id=${this.id}></photos-page>
      `
    }
  }
  render() {
    return html`<div
      @click-album=${this.receiveClickAlbum}>

      ${this.renderPage()}
    </div>`
  }
}

customElements.define('photo-app', PhotoApp);
