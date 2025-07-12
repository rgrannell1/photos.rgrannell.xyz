export class PageLocation {
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
  static showDateUrl(date) {
    window.location.hash = `#/date/${date}`;
    document.title = "Date - photos";
  }
  static showLocationsUrl() {
    window.location.hash = "#/locations";
    document.title = "Locations - photos";
  }
  static showTagsUrl() {
    window.location.hash = "#/tags";
    document.title = "Tags - photos";
  }
  static showStatsUrl() {
    window.location.hash = "#/stats";
    document.title = "Stats - photos";
  }
  static showMetadataUrl(id) {
    window.location.hash = `#/metadata/${id}`;
    document.title = "Metadata - photos";
  }
  static showTagAlbumUrl(tagName) {
    window.location.hash = `#/tag/${encodeURIComponent(tagName)}`;
    document.title = "Tag - photos";
  }
  static showVideosUrl() {
    window.location.hash = "#/videos";
    document.title = "Videos - photos";
  }
  static showSearchQuery(query) {
    const loc = window.location.toString();

    if (loc.indexOf("?") > 0) {
      const original = window.location.hash.toString().slice(
        0,
        window.location.hash.toString().indexOf("?"),
      );
      window.location.hash = original + "?" + encodeURIComponent(query);
    } else {
      window.location.hash = window.location.hash + "?" +
        encodeURIComponent(query);
    }
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
    } else if (window.location.hash.startsWith("#/locations")) {
      return {
        type: "locations",
      };
    } else if (window.location.hash.startsWith("#/tags")) {
      return {
        type: "tags",
      };
    } else if (window.location.hash.startsWith("#/tag")) {
      return {
        type: "tag-album",
        tag: decodeURIComponent(window.location.hash.split("/")[2]),
      };
    } else if (window.location.hash.startsWith("#/stats")) {
      return {
        type: "stats",
      };
    } else if (window.location.hash.startsWith("#/metadata")) {
      return {
        type: "metadata",
        id: window.location.hash.split("/")[2],
      };
    } else if (window.location.hash.startsWith("#/date")) {
      return {
        type: "date",
        date: window.location.hash.split("/")[2],
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
