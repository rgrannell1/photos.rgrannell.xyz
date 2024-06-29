import { html } from "../library/lit.js";
import { LitElem } from "../models/lit-element.js";
import { AlbumsArtifact, ImagesArtifact, MetadataArtifact } from "../models/artifacts.js";

import { PageLocation } from "../services/location.js";

import "./components/sidebar.js";
import "./components/header.js";

import "./pages/albums/pages.js";
import "./pages/locations/pages.js";
import "./pages/album/pages.js";
import "./pages/stats/pages.js";
import "./pages/tag/pages.js";
import "./pages/tags/pages.js";
import "./pages/metadata/pages.js";

const albums = new AlbumsArtifact();
const images = new ImagesArtifact();
const metadata = new MetadataArtifact();

class AppInitialiser {
  static async init() {
    const location = PageLocation.getUrl();

    if (location?.type === "albums" || location?.type === "album") {
      await albums.init();
      images.init();
      metadata.init();
    } else if (location?.type === "photo" || location?.type === "photos") {
      await images.init();
      await albums.init();
      metadata.init();
    } else if (location?.type === "tag-album") {
      await images.init();
      albums.init();
      metadata.init();
    } else if (location?.type === "tags") {
      await images.init();
      albums.init();
      metadata.init();
    } else if (location?.type === "locations") {
      await albums.init();
      images.init();
      metadata.init();
    } else if (location?.type === "metadata") {
      await images.init();
    } else if (location?.type === "stats") {

    } else if (location?.type === "album") {
      await images.init();
      albums.init();
      metadata.init();
    } else {
      await albums.init();
      images.init();
      metadata.init();
    }
  }
}

await AppInitialiser.init();

export class PhotoApp extends LitElem {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      sidebarVisible: { type: Boolean },
      id: { type: String },
      tags: { type: Array },
      imageUrl: { type: String },
      thumbnailUrl: { type: String },
      route: { type: String },
      params: { type: Object },
      query: { type: Object },
      darkMode: { type: Boolean },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.setStateFromUrl();
    this.requestUpdate();

    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener("popstate", this.handlePopState.bind(this));
  }

  handlePopState() {
    this.setStateFromUrl();
    this.requestUpdate();
  }

  setStateFromUrl() {
    const location = PageLocation.getUrl();

    if (location?.type === "album") {
      this.page = "photos";
      this.id = location.id;
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

  receiveSwitchTheme(event) {
    this.darkMode = !this.darkMode;

    localStorage.setItem("darkMode", this.darkMode);

    this.requestUpdate();
  }


  receiveNavigatePage(event) {
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
      <photo-album-page .albums="${albums}" class="${
        classes.join(" ")
      }"></photo-album-page>
      `;
    }

    if (this.page === "photos") {
      const album = albums.albums().find((album) => {
        return album.id === this.id;
      });

      return html`
      <album-page
        .images=${images}
        title=${album.album_name}
        id=${this.id}
        minDate=${album.min_date}
        maxDate=${album.max_date}
        imageCount=${album.image_count}
        description=${album.description}
        class="${classes.join(" ")}"></album-page>
      `;
    }

    if (this.page === "tag-album") {
      return html`
      <tag-page tag=${this.tag} .images=${images} class="${classes.join(" ")}"></tag-page>
      `;
    }

    if (this.page === "tags") {
      return html`
      <tags-page class="${classes.join(' ')}" .metadata=${metadata} .images=${images}></tags-page>
      `;
    }

    if (this.page === "locations") {
      return html`
      <locations-page .albums="${albums}" class="${classes.join(" ")}"></locations-page>
      `;
    }

    if (this.page === "stats") {
      return html`
      <stats-page class="${classes.join(" ")}"></stats-page>
      `;
    }

    if (this.page === "metadata") {
      const photo = images.images().find(image => {
        return image.id === this.id;
      });

      if (!photo) {
        console.error(`failed to find photo with id ${this.id}`);
      }

      return html`
      <metadata-page .image=${photo} id=${this.id} class="${classes.join(" ")}"></metadata-page>
      `;
    }
  }

  loadDarkMode() {
    if (typeof this.darkMode !== "undefined") {
      return this.darkMode;
    }
    return localStorage.getItem("darkMode") === "true";
  }

  render() {
    const classes = ["app-container"];
    if (this.sidebarVisible) {
      classes.push("sidebar-visible");
    }

    const $html = document.documentElement;
    const topLevelClasses = ["photos-app"];
    if (this.darkMode) {
      $html.classList.add("dark-mode");
      topLevelClasses.push("dark-mode");
    } else {
      $html.classList = [];
    }

    // events are mostly handled here
    return html`
    <body>
      <div class="${topLevelClasses.join(" ")}"
        @click-album=${this.receiveClickAlbum}
        @click-photo=${this.receiveClickPhoto}
        @click-tag=${this.receiveClickTag}
        @click-burger-menu=${this.receiveClickBurgerMenu}
        @click-photo-metadata=${this.receiveClickPhotoMetadata}
        @switch-theme=${this.receiveSwitchTheme}
        @navigate-page=${this.receiveNavigatePage}>

        <photo-header .tag=${this.tag} .darkMode=${this.loadDarkMode()}></photo-header>

        <div class="${classes.join(" ")}">
            <photo-sidebar visible=${this.sidebarVisible}></photo-sidebar>
            ${this.renderPage(this.sidebarVisible)}
        </div>
      </div>
    </body>
    `;
  }
}

customElements.define("photo-app", PhotoApp);
