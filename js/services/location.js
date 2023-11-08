export class PageLocation {
  static showAlbumsUrl() {
    window.location.hash = "#/albums";
    document.title = "Albums - photos";
  }
  static showAlbumUrl(id) {
    window.location.hash = `#/album/${id}`;
    document.title = "Album - photos";
  }
  static showPhotoUrl(id) {
    window.location.hash = `#/photo/${id}`;
    document.title = "Photo - photos";
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
    } else if (window.location.hash.startsWith("#/photo")) {
      return {
        type: "photo",
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
    } else if (window.location.hash.startsWith("#/stats")) {
      return {
        type: "stats",
      };
    } else if (window.location.hash.startsWith("#/metadata")) {
      return {
        type: "metadata",
        id: window.location.hash.split("/")[2],
      };
    }
  }
}
