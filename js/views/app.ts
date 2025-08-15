import { html } from "../library/lit.js";
import { LitElem } from "../models/lit-element.ts";
import {
  TribblesArtifact,
  TriplesArtifact,
} from "../models/artifacts.ts";

import { PageLocation } from "../services/location.ts";

import { LoadMode, Pages } from "../constants.js";

import "./components/sidebar.ts";
import "./components/header.ts";

import "./pages/photos/pages.ts";
import "./pages/albums/pages.ts";
import "./pages/album/pages.ts";
import "./pages/metadata/pages.ts";
import "./pages/about/pages.ts";
import "./pages/thing/pages.ts";
import "./pages/videos/pages.ts";
import { getTribbleDB } from "../services/things.ts";

const triples = new TriplesArtifact();

const tribbles = new TribblesArtifact();
tribbles.init();

export const DEFAULT_DEPENDENCIES = [
  [triples, LoadMode.EAGER],
];
/*
 * The largest network requests will be for images.json,
 * albums.json, and metadata.json. We should block the page until
 * the critical resources FOR THAT page are loaded, but we can fire off
 * the other requests in the background. If the user waits a few seconds
 * before navigating to another page, it's likely the required data will
 * already be cached in `window`
 *
 * The only difficulty is we need to track which resources are required
 * for each page.
 */
export const PAGE_DEPENDECIES = {
  [Pages.ABOUT]: [
    [triples, LoadMode.EAGER],
  ],
  [Pages.ALBUMS]: [
    [triples, LoadMode.EAGER],
  ],
  [Pages.PHOTOS]: [
    [triples, LoadMode.EAGER],
  ],
  [Pages.VIDEOS]: [
    [triples, LoadMode.EAGER],
  ],
  [Pages.ALBUM]: [
    [triples, LoadMode.EAGER],
  ],
  // TODO DOES THIS EXIST
  [Pages.PHOTO]: [
    [triples, LoadMode.EAGER],
  ],

  [Pages.METADATA]: [
    [triples, LoadMode.EAGER],
  ],
  [Pages.THING]: [
    [triples, LoadMode.EAGER],
  ],
};
class AppInitialiser {
  static async init() {
    const location = PageLocation.getUrl();
    console.log(`loading ${location?.type}`);

    const dependencies = PAGE_DEPENDECIES[location?.type] ??
      DEFAULT_DEPENDENCIES;
    const eagerlyLoaded = [];

    for (const [artifact, loadMode] of dependencies) {
      if (loadMode === LoadMode.EAGER) {
        eagerlyLoaded.push(artifact.init());
      } else if (loadMode === LoadMode.LAZY) {
        // non-blocking load of this artifact
        artifact.init();
      }
    }

    // block awaiting eagerly loaded artifacts
    await Promise.all(eagerlyLoaded);
  }
}

await AppInitialiser.init();

export class PhotoApp extends LitElem {
  static DEFAULT_PAGE = Pages.ALBUMS;

  // TODO dislike, move to constants
  static LOCATION_TYPE_TO_PAGE = {
    "album": Pages.ALBUM,
    "albums": Pages.ALBUMS,
    "photos": Pages.PHOTOS,
    "metadata": Pages.METADATA,
    "about": Pages.ABOUT,
    "videos": Pages.VIDEOS,
    "thing": Pages.THING,
  };

  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      sidebarVisible: { type: Boolean, state: true },
      id: { type: String },
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
    this.sidebarVisible = false;
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener("popstate", this.handlePopState.bind(this));
  }

  handlePopState() {
    this.setStateFromUrl();
    this.requestUpdate();
  }

  /*
   * Extract the page-type and other attributes from the URL
   * and set the state accordingly
   */
  setStateFromUrl() {
    const location = PageLocation.getUrl();

    if (PhotoApp.LOCATION_TYPE_TO_PAGE[location?.type]) {
      this.page = PhotoApp.LOCATION_TYPE_TO_PAGE[location.type];
    } else {
      console.error("did not match pagetype", location?.type);
      this.page = PhotoApp.DEFAULT_PAGE;
    }

    // set additional state from the url
    if (PageLocation.pageUsesId(this.page)) {
      this.id = location.id;
    }
  }

  /*
   * Navigate to the album page
   */
  receiveClickAlbum(event: CustomEvent) {
    const {
      title,
      id,
    } = event.detail;

    this.page = Pages.PHOTOS;
    this.id = id;
    this.title = title;

    PageLocation.showAlbumUrl(id);
  }

  /*
   * When we click on the burger menu icon, toggle the sidebar
   */
  async receiveClickBurgerMenu() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  /*
   * When we click on a photo's info icon, navigate to the photo's metadata page
   */
  async receiveClickPhotoMetadata(event: CustomEvent) {
    const {
      id,
      imageUrl,
      thumbnailUrl,
    } = event.detail;

    this.page = Pages.METADATA;
    this.id = id;
    this.imageUrl = imageUrl;
    this.thumbnailUrl = thumbnailUrl;

    PageLocation.showMetadataUrl(id);
  }

  /*
   * Toggle between light and dark mode
   */
  receiveSwitchTheme(_) {
    this.darkMode = !this.darkMode;

    localStorage.setItem("darkMode", this.darkMode.toString());

    this.requestUpdate();
  }

  /*
   * On @navigate-page, update the URL
   * by using the `PageLocation` service
   */
  receiveNavigatePage(event: CustomEvent) {
    // state updates
    this.page = event.detail.page;
    this.sidebarVisible = false;

    const router = PageLocation.router(this.page);
    if (!router) {
      console.error(`no router found for page ${this.page}`);
    }

    if (PageLocation.pageUsesId(this.page)) {
      router(this.id);
    } else {
      router();
    }
  }

  pageClasses(sidebarVisible: boolean) {
    const classes = ["page"];

    if (sidebarVisible) {
      classes.push("sidebar-visible");
    }

    return classes.join(" ");
  }

  /*
   * Render the subpage (e.g metadata, albums, photos, etc.)
   */
  renderPage(sidebarVisible: boolean) {
    const classes = this.pageClasses(sidebarVisible);

    if (!this.page || this.page === "albums") {
      const tdb = getTribbleDB(triples._data);

      return html`
      <albums-page .triples=${tdb} class="${classes}"></albums-page>
      `;
    }

    if (this.page === Pages.ABOUT) {
      return html`<about-page class="${classes}"></about-page>`;
    }

    if (this.page === Pages.PHOTOS) {
      const tdb = getTribbleDB(triples._data);

      return html`<photos-page .triples=${tdb} class="${classes}"></photos-page>`;
    }

    if (this.page === Pages.ALBUM) {
      if (!this.id) {
        console.error("no album id provided");
      }

      const tdb = getTribbleDB(triples._data);
      const album = tdb.search({
        source: { type: "album", id: this.id },
      }).firstObject();

      if (!album) {
        console.error(`failed to find album with id ${this.id}`);
      }
      return html`
      <album-page
        .triples=${tdb}
        title=${album.name}
        id=${this.id}
        minDate=${album.min_date}
        maxDate=${album.max_date}
        imageCount=${album.photos_count}
        description=${album.description}
        countries=${album.flags}
        class="${classes}"></album-page>
      `;
    }

    if (this.page === Pages.METADATA) {
      const image = getTribbleDB(triples._data).search({
        source: { type: 'photo', id: this.id }
      }).firstObject();

      if (!image) {
        console.error(`failed to find photo with id ${this.id}`);
      }

      return html`
      <metadata-page
        .triples=${getTribbleDB(triples._data)}
        .image=${image}
        id=${this.id} class="${classes}"></metadata-page>
      `;
    }

    if (this.page === Pages.VIDEOS) {
      return html`
      <videos-page .triples=${getTribbleDB(triples._data)} class="${classes}"></videos-page>
      `;
    }

    if (this.page === Pages.THING) {
      return html`
      <thing-page
        .urn=${"urn:ró:" + this.id}
        .triples=${getTribbleDB(triples._data)}
        class="${classes}"></thing-page>
      `;
    }
  }

  /*
   * Check if dark mode is enabled by examining this component
   * and localstorage.#
   */
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
        @click-burger-menu=${this.receiveClickBurgerMenu}
        @click-photo-metadata=${this.receiveClickPhotoMetadata}
        @switch-theme=${this.receiveSwitchTheme}
        @navigate-page=${this.receiveNavigatePage}>

        <photo-header .darkMode=${this.loadDarkMode()}></photo-header>

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
