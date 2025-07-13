/*
 * Define page routes (poorly)
 */

export class PageLocation {
  static router(page) {
    if (page === Pages.PHOTOS) {
      return this.showPhotosUrl;
    } else if (page === Pages.ALBUMS) {
      return this.showAlbumsUrl;
    } else if (page === Pages.ALBUM) {
      return this.showAlbumUrl;
    } else if (page === Pages.METADATA) {
      return this.showMetadataUrl;
    } else if (page === Pages.ABOUT) {
      return this.showAboutUrl;
    } else if (page === Pages.VIDEOS) {
      return this.showVideosUrl;
    } else {
      throw new Error(`Unknown page: ${page}`);
    }
  }

  static pageUsesId(page) {
    return page === Pages.ALBUM ||
      page === Pages.PHOTO ||
      page === Pages.METADATA;
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
