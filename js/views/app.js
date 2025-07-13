import { html } from "../library/lit.js";
import { HaystackSearchEngine } from "../library/haystack.js";
import { LitElem } from "../models/lit-element.js";
import {
  AlbumsArtifact,
  ExifArtifact,
  ImagesArtifact,
  MetadataArtifact,
  SemanticArtifact,
  VideosArtifact,
} from "../models/artifacts.js";

import { PageLocation } from "../services/location.js";

import { LoadMode, Pages } from "../constants.js";

import "./components/sidebar.js";
import "./components/header.js";

import "./pages/photos/pages.js";
import "./pages/albums/pages.js";
import "./pages/album/pages.js";
import "./pages/metadata/pages.js";
import "./pages/about/pages.js";
import "./pages/videos/pages.js";

const albums = new AlbumsArtifact();
const images = new ImagesArtifact();
const videos = new VideosArtifact();
const metadata = new MetadataArtifact();
const exif = new ExifArtifact();
const semantic = new SemanticArtifact();

export const DEFAULT_DEPENDENCIES = [
  [albums, LoadMode.EAGER],
  [images, LoadMode.EAGER],
  [videos, LoadMode.EAGER],
  [metadata, LoadMode.EAGER],
  [exif, LoadMode.EAGER],
  [semantic, LoadMode.EAGER],
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
    [metadata, LoadMode.LAZY],
    [exif, LoadMode.LAZY],
    [semantic, LoadMode.LAZY],
  ],
  [Pages.ALBUMS]: [
    [albums, LoadMode.EAGER],
    [images, LoadMode.LAZY],
    [videos, LoadMode.LAZY],
    [metadata, LoadMode.LAZY],
    [exif, LoadMode.LAZY],
    [semantic, LoadMode.LAZY],
  ],
  [Pages.PHOTOS]: [
    [albums, LoadMode.EAGER],
    [images, LoadMode.EAGER],
    [videos, LoadMode.EAGER],
    [metadata, LoadMode.LAZY],
    [exif, LoadMode.LAZY],
    [semantic, LoadMode.LAZY],
  ],
  [Pages.VIDEOS]: [
    [albums, LoadMode.LAZY],
    [images, LoadMode.LAZY],
    [videos, LoadMode.EAGER],
    [metadata, LoadMode.LAZY],
    [exif, LoadMode.LAZY],
    [semantic, LoadMode.LAZY],
  ],
  [Pages.ALBUM]: [
    [albums, LoadMode.EAGER],
    [images, LoadMode.EAGER],
    [videos, LoadMode.EAGER],
    [semantic, LoadMode.EAGER],
    [metadata, LoadMode.LAZY],
    [exif, LoadMode.LAZY],
  ],
  [Pages.PHOTO]: [
    [albums, LoadMode.EAGER],
    [images, LoadMode.EAGER],
    [videos, LoadMode.EAGER],
    [metadata, LoadMode.LAZY],
    [exif, LoadMode.EAGER],
    [semantic, LoadMode.EAGER],
  ],

  // Remove
  [Pages.DATE]: [
    [albums, LoadMode.EAGER],
    [images, LoadMode.EAGER],
    [videos, LoadMode.EAGER],
    [metadata, LoadMode.LAZY],
    [exif, LoadMode.LAZY],
    [semantic, LoadMode.LAZY],
  ],
  [Pages.TAG_ALBUM]: [
    [albums, LoadMode.LAZY],
    [images, LoadMode.EAGER],
    [videos, LoadMode.EAGER],
    [metadata, LoadMode.LAZY],
    [exif, LoadMode.EAGER],
    [semantic, LoadMode.EAGER],
  ],
  [Pages.TAG]: [
    [albums, LoadMode.LAZY],
    [images, LoadMode.EAGER],
    [videos, LoadMode.EAGER],
    [metadata, LoadMode.LAZY],
    [exif, LoadMode.EAGER],
    [semantic, LoadMode.EAGER],
  ],
  [Pages.LOCATIONS]: [
    [albums, LoadMode.EAGER],
    [images, LoadMode.LAZY],
    [videos, LoadMode.LAZY],
    [metadata, LoadMode.LAZY],
    [exif, LoadMode.EAGER],
    [semantic, LoadMode.EAGER],
  ],
  [Pages.METADATA]: [
    [albums, LoadMode.LAZY],
    [images, LoadMode.EAGER],
    [videos, LoadMode.EAGER],
    [metadata, LoadMode.EAGER],
    [exif, LoadMode.EAGER],
    [semantic, LoadMode.EAGER],
  ],
  [Pages.STATS]: [
    [albums, LoadMode.LAZY],
    [images, LoadMode.LAZY],
    [videos, LoadMode.LAZY],
    [metadata, LoadMode.LAZY],
    [exif, LoadMode.EAGER],
    [semantic, LoadMode.EAGER],
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
  static LOCATION_TYPE_TO_PAGE = {
    "album": Pages.ALBUM,
    "albums": Pages.ALBUMS,
    "photos": Pages.PHOTOS,
    "date": Pages.DATE,
    "tag-album": Pages.TAG_ALBUM,
    "tags": Pages.TAGS,
    "locations": Pages.LOCATIONS,
    "stats": Pages.STATS,
    "metadata": Pages.METADATA,
    "about": Pages.ABOUT,
    "videos": Pages.VIDEOS,
  };
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      sidebarVisible: { type: Boolean, state: true },
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
    if (
      this.page === Pages.METADATA || this.page === Pages.ALBUM ||
      this.page === Pages.METADATA
    ) {
      this.id = location.id;
    } else if (this.page === Pages.TAG_ALBUM) {
      this.tag = location.tag;
    } else if (this.page === Pages.DATE) {
      this.date = location.date;
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

    this.page = Pages.PHOTOS;
    this.id = id;
    this.title = title;

    PageLocation.showAlbumUrl(id);
  }

  async receiveClickTag(event) {
    const { tagName } = event.detail;

    this.page = Pages.TAG_ALBUM;
    this.tag = tagName;

    PageLocation.showTagAlbumUrl(tagName);
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
  async receiveClickPhotoMetadata(event) {
    const {
      id,
      imageUrl,
      thumbnailUrl,
      tags,
    } = event.detail;

    this.page = Pages.METADATA;
    this.id = id;
    this.imageUrl = imageUrl;
    this.thumbnailUrl = thumbnailUrl;
    this.tags = tags ?? [];

    PageLocation.showMetadataUrl(id);
  }

  /*
   * Toggle between light and dark mode
   */
  receiveSwitchTheme(event) {
    this.darkMode = !this.darkMode;

    localStorage.setItem("darkMode", this.darkMode);

    this.requestUpdate();
  }

  /*
   * On @navigate-page, update the URL
   */
  receiveNavigatePage(event) {
    this.page = event.detail.page;

    if (this.page === Pages.ABOUT) {
      PageLocation.showAboutUrl();
    } else if (this.page === Pages.PHOTOS) {
      PageLocation.showPhotosUrl();
    } else if (this.page === Pages.ALBUMS) {
      PageLocation.showAlbumsUrl();
    } else if (this.page === Pages.TAGS) {
      PageLocation.showTagsUrl();
    } else if (this.page === Pages.LOCATIONS) {
      PageLocation.showLocationsUrl();
    } else if (this.page === Pages.STATS) {
      PageLocation.showStatsUrl();
    } else if (this.page === Pages.PHOTOS) {
      PageLocation.showAlbumUrl(this.id);
    } else if (this.page === Pages.METADATA) {
      PageLocation.showMetadataUrl(this.id);
    } else if (this.page === Pages.DATE) {
      PageLocation.showDateUrl(this.date);
    } else if (this.page === Pages.VIDEOS) {
      PageLocation.showVideosUrl();
    } else {
      PageLocation.showAlbumsUrl();
    }

    this.sidebarVisible = false;
  }

  /*
   * Render the subpage (e.g metadata, albums, photos, etc.)
   */
  renderPage(sidebarVisible) {
    const classes = ["page"];

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

    if (this.page === Pages.ABOUT) {
      return html`<about-page class="${classes.join(" ")}"></about-page>`;
    }

    if (this.page === Pages.PHOTOS) {
      return html`<photos-page class="${
        classes.join(" ")
      }" .images=${images}></photos-page>`;
    }

    if (this.page === Pages.ALBUM) {
      if (!this.id) {
        console.error("no album id provided");
      }

      const album = albums.albums().find((album) => {
        return album.id === this.id;
      });

      if (!album) {
        console.error(`failed to find album with id ${this.id}`);
      }

      return html`
      <album-page
        .images=${images}
        .videos=${videos}
        .semantic=${semantic}
        title=${album.album_name}
        id=${this.id}
        minDate=${album.min_date}
        maxDate=${album.max_date}
        imageCount=${album.photos_count}
        description=${album.description}
        class="${classes.join(" ")}"></album-page>
      `;
    }

    if (this.page === Pages.METADATA) {
      const photo = images.images().find((image) => {
        return image.id === this.id;
      });

      const exifData = exif.exif().find((exif) => {
        return exif.id === this.id;
      });

      const semanticData = semantic.semantic().filter((semantic) => {
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
      <metadata-page .image=${photo} .semantic=${relations} .exif=${exifData} id=${this.id} class="${
        classes.join(" ")
      }"></metadata-page>
      `;
    }

    if (this.page === Pages.VIDEOS) {
      return html`
      <videos-page .videos=${videos} class="${classes.join(" ")}"></videos-page>
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

    const searchEngine = new HaystackSearchEngine();

    // events are mostly handled here
    return html`
    <body>
      <div class="${topLevelClasses.join(" ")}"
        @click-album=${this.receiveClickAlbum}
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
