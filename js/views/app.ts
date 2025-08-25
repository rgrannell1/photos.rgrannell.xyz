import { html } from "lit-element";
import { LitElem } from "../models/lit-element.ts";
import { TribblesArtifact } from "../models/artifacts.ts";

import { PageLocation } from "../services/location.ts";

import "./components/sidebar.ts";
import "./components/header.ts";
import "./pages/photos.ts";
import "./pages/albums.ts";
import "./pages/album.ts";
import "./pages/metadata.ts";
import "./pages/about.ts";
import "./pages/thing.ts";
import "./pages/videos.ts";
import "./pages/listing.ts";
import { TribbleDB } from "js/library/tribble.js";

import {
  countriesAsUrns,
  expandBirdwatchUrl,
  expandCdnUrls,
  expandTripleCuries,
  expandUrns,
  ratingsAsUrns,
} from "../things/things.ts";
import { Triple } from "js/types.ts";

function processTriples(
  curies: Record<string, string>,
  triple: Triple,
): Triple[] {
  // derive new triples or modify old ones,
  // sequentially apply functions against intermediate results

  const tripleProcessors = [
    expandUrns,
    ratingsAsUrns,
    countriesAsUrns,
    expandCdnUrls,
    expandBirdwatchUrl,
    expandTripleCuries.bind(null, curies),
  ];

  let outputTriples = [triple];
  for (const fn of tripleProcessors) {
    outputTriples = outputTriples.flatMap(fn);
  }

  return outputTriples;
}

const tribbles = new TribblesArtifact();

export class PhotoApp extends LitElem {
  static DEFAULT_PAGE = "albums";

  page: string;
  sidebarVisible: boolean;
  tribbleDB: object;

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
      tribbleDB: {
        type: Object,
        state: true,
        attribute: false,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.setStateFromUrl();
    this.requestUpdate();

    this._onPopState = this.handlePopState.bind(this);
    this.sidebarVisible = false;
    window.addEventListener("popstate", this._onPopState);

    (async () => {
      const buffer: Triple[] = [];
      if (!this.tribbleDB) {
        this.tribbleDB = new TribbleDB([]);
      }

      const curies = {
        "i": "urn:ró:",
        "birdwatch": "https://birdwatchireland.ie/birds/",
        "photos": "https://photos-cdn.rgrannell.xyz/",
        "wiki": "https://en.wikipedia.org/wiki/",
      };

      for await (const triple of tribbles.stream()) {
        buffer.push(...[triple].flatMap(processTriples.bind(null, curies)));

        if (buffer.length > 500) {
          this.tribbleDB.add(buffer);
          this.tribbleDB = this.tribbleDB;
          buffer.length = 0;
          this.requestUpdate();
        }
      }

      this.tribbleDB.add(buffer);
      // don't love this; it forces re-render
      this.tribbleDB = this.tribbleDB.clone();

      this.requestUpdate();
    })();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener("popstate", this._onPopState);
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

    if (PageLocation.isPage(location?.type)) {
      this.page = location.type;
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

    this.page = "photos";
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

    this.page = "metadata";
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
      return html`
      <albums-page .triples=${this.tribbleDB} class="${classes}"></albums-page>
      `;
    }

    if (this.page === "about") {
      return html`<about-page class="${classes}"></about-page>`;
    }

    if (this.page === "photos") {
      return html`<photos-page .triples=${this.tribbleDB} class="${classes}"></photos-page>`;
    }

    if (this.page === "album") {
      if (!this.id) {
        console.error("no album id provided");
      }

      const album = this.tribbleDB.search({
        source: { type: "album", id: this.id },
      }).firstObject();

      if (!album) {
        console.error(`failed to find album with id ${this.id}`);
      }
      return html`
      <album-page
        .triples=${this.tribbleDB}
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

    if (this.page === "metadata") {
      const image = this.tribbleDB.search({
        source: { type: "photo", id: this.id },
      }).firstObject();

      if (!image) {
        console.error(`failed to find photo with id ${this.id}`);
      }

      return html`
      <metadata-page
        .triples=${this.tribbleDB}
        .image=${image}
        id=${this.id} class="${classes}"></metadata-page>
      `;
    }

    if (this.page === "videos") {
      return html`
      <videos-page .triples=${this.tribbleDB} class="${classes}"></videos-page>
      `;
    }

    if (this.page === "thing") {
      return html`
      <thing-page
        .urn=${"urn:ró:" + this.id}
        .triples=${this.tribbleDB}
        class="${classes}"></thing-page>
      `;
    }

    if (this.page === "listing") {
      return html`
      <listing-page id=${this.id} .triples=${this.tribbleDB} class="${classes}"></listing-page>
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
