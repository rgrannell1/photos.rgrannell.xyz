import { html } from "../library/lit.js";
import { LitElem } from "../models/lit-element.js";
import {
  AlbumsArtifact,
  ExifArtifact,
  ImagesArtifact,
  StatsArtifact,
  TriplesArtifact,
  VideosArtifact,
} from "../models/artifacts.js";

import { PageLocation } from "../services/location.js";

import { LoadMode, Pages } from "../constants.js";

import "./components/sidebar.js";
import "./components/header.js";

import "./pages/photos/pages.js";
import "./pages/albums/pages.js";
import "./pages/album/pages.ts";
import "./pages/metadata/pages.ts";
import "./pages/about/pages.js";
import "./pages/videos/pages.js";
import "./pages/thing/pages.js";
import { getTribbleDB } from "../services/things.js";

const albums = new AlbumsArtifact();
const images = new ImagesArtifact();
const videos = new VideosArtifact();
const exif = new ExifArtifact();
const stats = new StatsArtifact();
const triples = new TriplesArtifact();

export const DEFAULT_DEPENDENCIES = [
  [albums, LoadMode.EAGER],
  [images, LoadMode.EAGER],
  [videos, LoadMode.EAGER],
  [exif, LoadMode.EAGER],
  [stats, LoadMode.EAGER],
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
    [albums, LoadMode.LAZY],
    [images, LoadMode.LAZY],
    [videos, LoadMode.LAZY],
    [exif, LoadMode.LAZY],
    [stats, LoadMode.LAZY],
    [triples, LoadMode.EAGER],
  ],
  [Pages.ALBUMS]: [
    [albums, LoadMode.EAGER],
    [images, LoadMode.LAZY],
    [videos, LoadMode.LAZY],
    [exif, LoadMode.LAZY],
    [stats, LoadMode.EAGER],
    [triples, LoadMode.EAGER],
  ],
  [Pages.PHOTOS]: [
    [albums, LoadMode.EAGER],
    [images, LoadMode.EAGER],
    [videos, LoadMode.EAGER],
    [exif, LoadMode.LAZY],
    [stats, LoadMode.LAZY],
    [triples, LoadMode.EAGER],
  ],
  [Pages.VIDEOS]: [
    [albums, LoadMode.LAZY],
    [images, LoadMode.LAZY],
    [videos, LoadMode.EAGER],
    [exif, LoadMode.LAZY],
    [stats, LoadMode.LAZY],
    [triples, LoadMode.EAGER],
  ],
  [Pages.ALBUM]: [
    [albums, LoadMode.EAGER],
    [images, LoadMode.EAGER],
    [videos, LoadMode.EAGER],
    [stats, LoadMode.LAZY],
    [exif, LoadMode.LAZY],
    [triples, LoadMode.EAGER],
  ],
  // TODO DOES THIS EXIST
  [Pages.PHOTO]: [
    [albums, LoadMode.EAGER],
    [images, LoadMode.EAGER],
    [videos, LoadMode.EAGER],
    [exif, LoadMode.EAGER],
    [stats, LoadMode.LAZY],
    [triples, LoadMode.EAGER],
  ],

  [Pages.METADATA]: [
    [albums, LoadMode.LAZY],
    [images, LoadMode.EAGER],
    [videos, LoadMode.EAGER],
    [exif, LoadMode.EAGER],
    [stats, LoadMode.LAZY],
    [triples, LoadMode.EAGER],
  ],
  [Pages.THING]: [
    [albums, LoadMode.EAGER],
    [images, LoadMode.EAGER],
    [videos, LoadMode.LAZY],
    [exif, LoadMode.LAZY],
    [stats, LoadMode.LAZY],
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
      <photo-album-page .stats=${stats} .albums="${albums}" class="${classes}"></photo-album-page>
      `;
    }

    if (this.page === Pages.ABOUT) {
      return html`<about-page class="${classes}"></about-page>`;
    }

    if (this.page === Pages.PHOTOS) {
      return html`<photos-page class="${classes}" .images=${images}></photos-page>`;
    }

    if (this.page === Pages.ALBUM) {
      if (!this.id) {
        console.error("no album id provided");
      }

      const album = albums.albums().find((album: any) => {
        return album.id === this.id;
      });

      if (!album) {
        console.error(`failed to find album with id ${this.id}`);
      }

      return html`
      <album-page
        .images=${images}
        .videos=${videos}
        .triples=${getTribbleDB(triples._data)}
        title=${album.album_name}
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
      const photo = images.images().find((image: any) => {
        return image.id === this.id;
      });

      const exifData = exif.exif().find((exif: any) => {
        return exif.id === this.id;
      });

      // TODO this sucks

      const semanticData = triples._data.filter((semantic: any) => {
        return semantic[0] === this.id;
      });

      const relations = {};
      for (const [_, relation, target] of semanticData) {
        if (!relations[relation]) {
          relations[relation] = target;
        } else if (typeof relations[relation] === "string") {
          relations[relation] = [relations[relation], target];
        }
      }

      if (!photo) {
        console.error(`failed to find photo with id ${this.id}`);
      }

      return html`
      <metadata-page
        .triples=${getTribbleDB(triples._data)}
        .image=${photo}
        .semantic=${triples._data} .exif=${exifData} id=${this.id} class="${classes}"></metadata-page>
      `;
    }

    if (this.page === Pages.VIDEOS) {
      return html`
      <videos-page .videos=${videos} class="${classes}"></videos-page>
      `;
    }

    if (this.page === Pages.THING) {
      console.log(getTribbleDB(triples._data))
      return html`
      <thing-page
        .urn=${"urn:ró:" + this.id}
        .images=${images}
        .albums=${albums}
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
