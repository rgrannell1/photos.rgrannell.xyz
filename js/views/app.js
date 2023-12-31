import { html } from "../library/lit.js";
import { LitElem } from "../models/lit-element.js";

import { PageLocation } from "../services/location.js";
import { getAlbums } from "../services/albums.js";

import "./components/sidebar.js";
import "./components/header.js";

import "./pages/albums/pages.js";
import "./pages/locations/pages.js";
import "./pages/photos/pages.js";
import "./pages/stats/pages.js";
import "./pages/tag/pages.js";
import "./pages/tags/pages.js";
import "./pages/metadata/pages.js";

const albums = getAlbums();

export class PhotoApp extends LitElem {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      sidebarVisible: { type: Boolean },
      id: { type: Number },
      tags: { type: Array },
      imageUrl: { type: String },
      thumbnailUrl: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    this.setStateFromUrl();
  }

  setStateFromUrl() {
    const location = PageLocation.getUrl();

    if (location?.type === "album") {
      this.page = "albums";
      this.id = location.id;
      this.title = albums[location.id]?.name;
    } else if (location?.type === "photo") {
      this.page = "photos";
      this.id = location.id;
    } else if (location?.type === "tag-album") {
      this.page = "tag-album";
      this.tag = location.tag;
    } else if (location?.type === "tags") {
      this.page = "tags";
    } else if (location?.type === "locations") {
      this.page = "locations";
    } else if (location?.type === "stats") {
      this.page = "stats";
    } else if (location?.type === "metadata") {
      this.page = "metadata";
      this.id = location.id;
    } else {
      this.page = "albums";
    }

    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  /*
   * Navigate to the album page
   */
  receiveClickAlbum(event) {
    const {
      title,
      id,
    } = event.detail;

    this.page = "photos";
    this.id = id;
    this.title = title;

    PageLocation.showAlbumUrl(id);
  }

  /*
   * Open a photo
   */
  async receiveClickPhoto(event) {
    const {
      imageUrl,
    } = event.detail;

    window.open(imageUrl, "_blank");
  }

  async receiveClickTag(event) {
    const { tagName } = event.detail;

    this.page = "tag-album";
    this.tag = tagName;

    PageLocation.showTagAlbumUrl(tagName);
  }

  async receiveClickBurgerMenu() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  async receiveClickPhotoMetadata(event) {
    const {
      id,
      imageUrl,
      thumbnailUrl,
      tags,
    } = event.detail;

    this.page = "metadata";
    this.id = id;
    this.imageUrl = imageUrl;
    this.thumbnailUrl = thumbnailUrl;
    this.tags = tags ?? [];

    PageLocation.showMetadataUrl(id);
  }

  async receiveNavigatePage(event) {
    this.page = event.detail.page;

    if (this.page === "albums") {
      PageLocation.showAlbumsUrl();
    } else if (this.page === "tags") {
      PageLocation.showTagsUrl();
    } else if (this.page === "locations") {
      PageLocation.showLocationsUrl();
    } else if (this.page === "stats") {
      PageLocation.showStatsUrl();
    } else if (this.page === "photos") {
      PageLocation.showAlbumUrl(this.id);
    } else if (this.page === "metadata") {
      PageLocation.showMetadataUrl(this.id);
    } else {
      PageLocation.showAlbumsUrl();
    }

    this.sidebarVisible = false;
  }

  renderPage(sidebarVisible) {
    const classes = ["photo-page"];

    if (sidebarVisible) {
      classes.push("sidebar-visible");
    }

    if (!this.page || this.page === "albums") {
      return html`
      <photo-album-page class="${classes.join(" ")}"></photo-album-page>
      `;
    }

    if (this.page === "photos") {
      return html`
      <photos-page title=${this.title} id=${this.id} class="${
        classes.join(" ")
      }"></photos-page>
      `;
    }

    if (this.page === "tag-album") {
      return html`
      <tag-page tag=${this.tag} class="${classes.join(" ")}"></tag-page>
      `;
    }

    if (this.page === "tags") {
      return html`
      <tags-page class="${classes.join(" ")}"></tags-page>
      `;
    }

    if (this.page === "locations") {
      return html`
      <locations-page class="${classes.join(" ")}"></locations-page>
      `;
    }

    if (this.page === "stats") {
      return html`
      <stats-page class="${classes.join(" ")}"></stats-page>
      `;
    }

    if (this.page === "metadata") {
      return html`
      <metadata-page id=${this.id} class="${classes.join(" ")}"></metadata-page>
      `;
    }
  }
  render() {
    const classes = ["app-container"];
    if (this.sidebarVisible) {
      classes.push("sidebar-visible");
    }

    return html`
    <div
      @click-album=${this.receiveClickAlbum}
      @click-photo=${this.receiveClickPhoto}
      @click-tag=${this.receiveClickTag}
      @click-burger-menu=${this.receiveClickBurgerMenu}
      @click-photo-metadata=${this.receiveClickPhotoMetadata}
      @navigate-page=${this.receiveNavigatePage}>
        <photo-header></photo-header>

      <div class="${classes.join(" ")}">
          <photo-sidebar visible=${this.sidebarVisible}></photo-sidebar>
          ${this.renderPage(this.sidebarVisible)}
      </div>
    </div>
    `;
  }
}

customElements.define("photo-app", PhotoApp);
