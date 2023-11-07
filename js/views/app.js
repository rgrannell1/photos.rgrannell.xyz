import { html, LitElement } from "../library/lit.js";

import { PageLocation } from "../services/location.js";

import "./components/sidebar.js";
import "./components/header.js";

import "./pages/albums/pages.js";
import "./pages/locations/pages.js";
import "./pages/photos/pages.js";
import "./pages/stats/pages.js";
import "./pages/tags/pages.js";

import albums from "../../manifest.json" assert { type: "json" };

export class PhotoApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      id: { type: Number },
      sidebarVisible: { type: Boolean },
    };
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    const location = PageLocation.getUrl();

    if (location?.type === "album") {
      this.page = "albums";
      this.id = location.id;
      this.title = albums[location.id]?.name;
    } else if (location?.type === "photo") {
      this.page = "photos";
      this.id = location.id;
    } else if (location?.type === "tags") {
      this.page = "tags";
    } else if (location?.type === "locations") {
      this.page = "locations";
    } else if (location?.type === "stats") {
      this.page = "stats";
    }
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

  async receiveClickBurgerMenu() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  async receiveNavigatePage(event) {
    this.page = event.detail.page;
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
      @click-burger-menu=${this.receiveClickBurgerMenu}
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
