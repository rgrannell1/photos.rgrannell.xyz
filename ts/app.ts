import m from "mithril";
import { Header } from "./components/header.ts";
import { loadState } from "./state.ts";
import { Sidebar } from "./components/sidebar.ts";
import { AlbumsPage } from "./pages/albums.ts";
import {
  readAlbum,
  readAlbumById,
  readAlbumPhotosByAlbumId,
  readAlbums,
  readAlbumVideosByAlbumId,
  readThingsByAlbumId,
} from "./services/albums.ts";
import { AboutPage } from "./pages/about.ts";
import { VideosPage } from "./pages/videos.ts";
import { readVideos } from "./services/videos.ts";
import { listen } from "./events.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { AlbumPage } from "./pages/album.ts";
import { PhotosPage } from "./pages/photos.ts";
import { PhotoPage } from "./pages/photo.ts";
import { readPhotoById, readPhotos } from "./services/photos.ts";
import { ListingPage } from "./pages/listing.ts";
import { readNamedTypeThings } from "./services/things.ts";
import { Album } from "./types.ts";

const state = await loadState();
type AppAttrs = {};

/* */
export function AlbumsApp(): m.Component<AppAttrs> {
  return {
    oninit() {
      listen("click_album", (event) => {
        const { id, title } = (event as CustomEvent).detail;

        const parsed = asUrn(id);
        const pageTitle = `Album - ${title}`;

        state.currentAlbum = id;
        m.route.set(`/album/${parsed.id}`, undefined, {
          title: pageTitle,
        });
      });
    },
    view(vnode) {
      return m("body", [
        m(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : undefined },
          [
            m(Header, state),
            m("div.app-container", [
              m(Sidebar, { visible: state.sidebarVisible }),
              m(AlbumsPage, {
                albums: readAlbums(state.data),
              }),
            ]),
          ],
        ),
      ]);
    },
  };
}

/* */
export function AlbumApp(): m.Component<AppAttrs> {
  return {
    oninit() {
      const id = m.route.param("id");
      state.currentAlbum = `urn:ró:album:${id}`;
    },
    view() {
      if (!state.currentAlbum) {
        return m("p", "No album selected");
      }
      const album = readAlbum(state.data, state.currentAlbum) as Album[];
      const photos = readAlbumPhotosByAlbumId(state.data, state.currentAlbum);
      const videos = readAlbumVideosByAlbumId(state.data, state.currentAlbum);

      if (!album) {
        return m("p", "Album not found");
      }

      const { subjects, locations } = readThingsByAlbumId(
        state.data,
        state.currentAlbum,
      );

      return m("body", [
        m(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : undefined },
          [
            m(Header, state),
            m("div.app-container", [
              m(Sidebar, { visible: state.sidebarVisible }),
              m(AlbumPage, {
                ...album,
                subjects,
                locations,
                photos,
                videos,
              }),
            ]),
          ],
        ),
      ]);
    },
  };
}

/* */
export function AboutApp(): m.Component<AppAttrs> {
  return {
    view() {
      return m("body", [
        m(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : undefined },
          [
            m(Header, state),
            m("div.app-container", [
              m(Sidebar, { visible: state.sidebarVisible }),
              m(AboutPage),
            ]),
          ],
        ),
      ]);
    },
  };
}

/* */
export function VideosApp(): m.Component<AppAttrs> {
  return {
    view() {
      return m("body", [
        m(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : undefined },
          [
            m(Header, state),
            m("div.app-container", [
              m(Sidebar, { visible: state.sidebarVisible }),
              m(VideosPage, {
                videos: readVideos(state.data),
              }),
            ]),
          ],
        ),
      ]);
    },
  };
}

/* */
export function PhotosApp(): m.Component<AppAttrs> {
  return {
    view() {
      return m("body", [
        m(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : undefined },
          [
            m(Header, state),
            m("div.app-container", [
              m(Sidebar, { visible: state.sidebarVisible }),
              m(PhotosPage, {
                photos: readPhotos(state.data),
              }),
            ]),
          ],
        ),
      ]);
    },
  };
}

/* */
export function ThingApp(): m.Component<AppAttrs> {
  return {
    view() {
      return m("body", [
        m(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : undefined },
          [
            m(Header, state),
            m("div.app-container", [
              m(Sidebar, { visible: state.sidebarVisible }),
            ]),
          ],
        ),
      ]);
    },
  };
}

/* */
export function PhotoApp(): m.Component<AppAttrs> {
  return {
    oninit() {
      const id = m.route.param("id");
      state.currentPhoto = `urn:ró:photo:${id}`;
    },
    view() {
      if (!state.currentPhoto) {
        return m("p", "No photo selected");
      }
      const photo = readPhotoById(state.data, state.currentPhoto);

      if (!photo) {
        return m("p", "Photo not found");
      }

      return m("body", [
        m(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : undefined },
          [
            m(Header, state),
            m("div.app-container", [
              m(Sidebar, { visible: state.sidebarVisible }),
              m(PhotoPage, { photo, services: state.services }),
            ]),
          ],
        ),
      ]);
    },
  };
}

/* */
export function ListingApp(): m.Component<AppAttrs> {
  return {
    oninit() {
      const type = m.route.param("type");
      state.currentType = type;
    },

    view() {
      if (!state.currentType) {
        return m("p", "No type selected");
      }

      const things = readNamedTypeThings(state.data, state.currentType);

      return m("body", [
        m(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : undefined },
          [
            m(Header, state),
            m("div.app-container", [
              m(Sidebar, { visible: state.sidebarVisible }),
              m(ListingPage, {
                type: state.currentType,
                things,
              }),
            ]),
          ],
        ),
      ]);
    },
  };
}

listen("navigate", (event: Event) => {
  const { route } = (event as CustomEvent).detail;

  m.route.set(route);
});

listen("switch_theme", () => {
  state.darkMode = !state.darkMode;
});
