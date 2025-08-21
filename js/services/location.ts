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
  };

  static URL_PREFIX_TO_PAGE = {
    "#/albums": Pages.ALBUMS,
    "#/album": Pages.ALBUM,
    "#/metadata": Pages.METADATA,
    "#/about": Pages.ABOUT,
    "#/videos": Pages.VIDEOS,
    "#/thing": Pages.THING,
    "#/photos": Pages.PHOTOS,
  };

  static router(page: string) {
    if (PageLocation.ROUTES.hasOwnProperty(page)) {
      return PageLocation.ROUTES[page];
    }
    throw new Error(`Unknown page: ${page}`);
  }

  static pageUsesId(page: string) {
    return PageLocation.ID_PAGES.has(page);
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
  static showAlbumUrl(id: string) {
    window.location.hash = `#/album/${id}`;
    document.title = "Album - photos";
  }
  static showPhotoUrl(id: string) {
    window.location.hash = `#/photo/${id}`;
    document.title = "Photo - photos";
  }
  static showMetadataUrl(id: string) {
    window.location.hash = `#/metadata/${id}`;
    document.title = "Metadata - photos";
  }
  static showVideosUrl() {
    window.location.hash = "#/videos";
    document.title = "Videos - photos";
  }

  static showThingUrl(urn: string) {
    window.location.hash = `#/thing/${urn}`;
    document.title = "Thing - photos";
  }

  static ID_PAGES = new Set([
    Pages.ALBUM, Pages.METADATA, Pages.THING
  ])

  static getUrl(): { type: string; id?: string }  {
    const hash = window.location.hash;

    for (const [prefix, page] of Object.entries(PageLocation.URL_PREFIX_TO_PAGE)) {
      if (hash.startsWith(prefix)) {
        const res: { type: string; id?: string } = {
          type: page,
        };

        if (PageLocation.ID_PAGES.has(page)) {
          res.id = hash.split("/")[2];
        }

        return res;
      }
    }

    return {
      type: Pages.ALBUMS
    };
  }
}
