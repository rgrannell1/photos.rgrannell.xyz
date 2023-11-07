export class PageLocation {
  static showAlbumUrl(id) {
    window.location.hash = `#/album/${id}`;
  }
  static showPhotoUrl(id) {
    window.location.hash = `#/photo/${id}`;
  }
  static getUrl() {
    if (window.location.hash.startsWith("#/album")) {
      return {
        type: "album",
        id: window.location.hash.split("/")[2],
      };
    } else if (window.location.hash.startsWith("#/photo")) {
      return {
        type: "photo",
        id: window.location.hash.split("/")[2],
      };
    }
  }
}
