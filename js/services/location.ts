/*
 * Define page routes
 */

import { ThingsService } from "js/things/services.ts";
import { Pages } from "../constants.js";
import { PageUrl } from "../types.ts";
import { Strings } from "js/strings.ts";

export class PageLocation {
  static ROUTES: Record<keyof typeof Pages, CallableFunction> = {
    photos: this.showPhotosUrl,
    albums: this.showAlbumsUrl,
    album: this.showAlbumUrl,
    metadata: this.showMetadataUrl,
    about: this.showAboutUrl,
    videos: this.showVideosUrl,
    thing: this.showThingUrl,
    listing: this.showListingUrl,
  };

  static URL_PREFIX_TO_PAGE: Record<string, keyof typeof Pages> = {
    "#/albums": "albums",
    "#/album": "album",
    "#/metadata": "metadata",
    "#/about": "about",
    "#/videos": "videos",
    "#/thing": "thing",
    "#/photos": "photos",
    "#/listing": "listing",
  };

  static ID_PAGES: Set<keyof typeof Pages> = new Set([
    "album",
    "metadata",
    "thing",
    "listing",
  ]);

  static isPage(value: string): value is keyof typeof Pages {
    return value in Pages;
  }

  static router(page: string) {
    if (PageLocation.isPage(page)) {
      return PageLocation.ROUTES[page];
    }
    throw new Error(`Unknown page: ${page}`);
  }

  static pageUsesId(page: string) {
    return PageLocation.isPage(page) && PageLocation.ID_PAGES.has(page);
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
  static showAlbumUrl(id: string, _: any) {
    window.location.hash = `#/album/${id}`;
    document.title = "Album - photos";
  }
  static showPhotoUrl(id: string, _: any) {
    window.location.hash = `#/photo/${id}`;
    document.title = "Photo - photos";
  }
  static showMetadataUrl(id: string, _: any) {
    window.location.hash = `#/metadata/${id}`;
    document.title = "Metadata - photos";
  }
  static showVideosUrl() {
    window.location.hash = "#/videos";
    document.title = "Videos - photos";
  }

  static showThingUrl(urn: string, tribbleDB: any) {
    window.location.hash = `#/thing/${urn}`;

    const name = ThingsService.getName(tribbleDB, urn);
    if (!name) {
      document.title = "Thing - photos";
      return;
    }

    document.title = `${Strings.capitalise(name)} - photos`;
  }

  static showListingUrl(id: string, _: any) {
    window.location.hash = `#/listing/${id}`;
    document.title = "Listing - photos";
  }

  static extractQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    const addParams = (query: string) => {
      const searchParams = new URLSearchParams(query);
      for (const [key, value] of searchParams.entries()) {
        params[key] = value;
      }
    };

    const hashQueryIdx = window.location.hash.indexOf("?");
    if (hashQueryIdx !== -1) {
      addParams(window.location.hash.slice(hashQueryIdx + 1));
    }

    return params;
  }

  /* */
  static getUrl(): PageUrl {
    const hash = window.location.hash;

    for (
      const [prefix, page] of Object.entries(PageLocation.URL_PREFIX_TO_PAGE)
    ) {
      if (hash.startsWith(prefix)) {
        const qs = PageLocation.extractQueryParams();
        const res: { type: string; id?: string; qs: Record<string, string> } = {
          type: page,
          qs,
        };

        if (PageLocation.ID_PAGES.has(page)) {
          res.id = hash.split("/")[2];
        }

        return res;
      }
    }

    return {
      type: "albums",
      qs: {},
    };
  }
}
