export class PageLocation {
  static showAlbumsUrl() {
    window.location.hash = "#/albums";
  }
  static showAlbumUrl(id) {
    window.location.hash = `#/album/${id}`;
  }
  static showPhotoUrl(id) {
    window.location.hash = `#/photo/${id}`;
  }
  static showLocationsUrl() {
    window.location.hash = "#/locations";
  }
  static showTagsUrl() {
    window.location.hash = "#/tags";
  }
  static showStatsUrl() {
    window.location.hash = "#/stats";
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
    }
  }
}
