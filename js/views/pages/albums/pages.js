
import { LitElement, html } from "../../../library/lit.js";

import './components/photo-album.js';
import './components/photo-albums.js';

export class AlbumsPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <photo-albums></photo-albums>
    `
  }
}

customElements.define('photo-album-page', AlbumsPage);
