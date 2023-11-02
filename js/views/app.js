
import { LitElement, html } from '../library/lit.js';

import { PageLocation } from '../services/location.js';

import "./pages/albums/pages.js";
import "./pages/photos/pages.js";

import albums from '../../manifest.json'  assert {type: 'json'};

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

  connectedCallback() {
    super.connectedCallback();

    const location = PageLocation.getUrl();

    if (location?.type === 'album') {
      this.page = 'photos';
      this.id = location.id;
      this.title = albums[location.id]?.name;

    } else if (location?.type === 'photo') {
      this.page = 'photos';
      this.id = location.id;
    }
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

    PageLocation.showAlbumUrl(id);
  }

  /*
   * Open a photo
   */
  async receiveClickPhoto(event) {
    const {
      imageUrl
    } = event.detail;

    window.open(imageUrl, '_blank');
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
      @click-album=${this.receiveClickAlbum}
      @click-photo=${this.receiveClickPhoto}>
      ${this.renderPage()}
    </div>`
  }
}

customElements.define('photo-app', PhotoApp);
