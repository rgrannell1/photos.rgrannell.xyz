/*
 * Define page routes (poorly)
 */

import { Pages } from "../constants.js";

export class PageLocation {
  static ROUTES = {
    [Pages.PHOTOS]: this.showPhotosUrl,
    [Pages.ALBUMS]: this.showAlbumsUrl,
    [Pages.ALBUM]: this.showAlbumUrl,
    [Pages.METADATA]: this.showMetadataUrl,
    [Pages.ABOUT]: this.showAboutUrl,
    [Pages.VIDEOS]: this.showVideosUrl,
    [Pages.THING]: this.showThingUrl,
  }

  static router(page) {
    if (PageLocation.ROUTES.hasOwnProperty(page)) {
      return PageLocation.ROUTES[page];
    }
    throw new Error(`Unknown page: ${page}`);
  }

  static pageUsesId(page) {
    return page === Pages.ALBUM ||
      page === Pages.PHOTO ||
      page === Pages.METADATA ||
      page === Pages.THING;
  }

  static showAboutUrl() {
    window.location.hash = "#/about";
    document.title = "About - photos";
  }
  static showAlbumsUrl() {
    window.location.hash = "#/albums";
    document.title = "Albums - photos";
  }
  static showPhotosUrl() {
    window.location.hash = "#/photos";
    document.title = "Photos - photos";
  }
  static showAlbumUrl(id) {
    window.location.hash = `#/album/${id}`;
    document.title = "Album - photos";
  }
  static showPhotoUrl(id) {
    window.location.hash = `#/photo/${id}`;
    document.title = "Photo - photos";
  }
  static showMetadataUrl(id) {
    window.location.hash = `#/metadata/${id}`;
    document.title = "Metadata - photos";
  }
  static showVideosUrl() {
    window.location.hash = "#/videos";
    document.title = "Videos - photos";
  }

  static showThingUrl(urn) {
    window.location.hash = `#/thing/${urn}`;
    // TODO dynamically look up the name for this urn
    document.title = "Thing - photos";
  }

  static getUrl() {
    if (window.location.hash.startsWith("#/albums")) {
      return {
        type: "albums",
      };
    } else if (window.location.hash.startsWith("#/album")) {
      return {
        type: "album",
        id: window.location.hash.split("/")[2],
      };
    } else if (window.location.hash.startsWith("#/metadata")) {
      return {
        type: "metadata",
        id: window.location.hash.split("/")[2],
      };
    } else if (window.location.hash.startsWith("#/thing")) {
      return {
        type: "thing",
        id: window.location.hash.split("/")[2],
      };
    } else if (window.location.hash.startsWith("#/photos")) {
      return {
        type: "photos",
      };
    } else if (window.location.hash.startsWith("#/about")) {
      return {
        type: "about",
      };
    } else if (window.location.hash.startsWith("#/videos")) {
      return {
        type: "videos",
      };
    } else {
      return {
        type: "albums",
      };
    }
  }
}
