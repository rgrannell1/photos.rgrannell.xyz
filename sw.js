const CACHE_NAME = "sw-cache-3c098cd996-cb1750db";
const CACHEABLE_RESOURCES = [
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
  "/icons/apple-touch-icon.png",
  "/icons/favicon-16x16.png",
  "/icons/favicon-32x32.png",
  "/favicon.ico",
  "/dist/css/style.3c098cd996-cb1750db.css",
  "/dist/js/app.3c098cd996-cb1750db.js",
  // /albums hero (photo:548d64a50a) — matches ts/components/pages/albums.ts.
  // update by hand if the photo is re-encoded
  "https://photos-cdn.rgrannell.xyz/d6cf0f7cc7.webp",
  // /about hero (photo:dd378e3a76) — matches ts/components/pages/about.ts
  "https://photos-cdn.rgrannell.xyz/6744c802d1.webp",
];

const HOMEPAGE_THUMBNAILS = new Set();

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "homepageThumbnails") {
    const thumbnails = event.data.thumbnails;

    thumbnails.forEach((url) => {
      HOMEPAGE_THUMBNAILS.add(url);
    });
  }
});

// -- on install, cache every cacheable resource explicity listed.
self.addEventListener("install", function (event) {
  // activate immediately; waiting would delay the old-cache cleanup
  self.skipWaiting();

  // no-cors: the CDN sends no CORS headers. The responses are opaque, so
  // cache.put is required — cache.add rejects opaque (status 0) responses.
  // Each entry is non-fatal: one missing resource must not fail the install.
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(
        CACHEABLE_RESOURCES.map(function (resource) {
          const request = new Request(resource, { mode: "no-cors" });
          return fetch(request)
            .then((response) => cache.put(request, response))
            .catch((err) => {
              console.error(`failed to pre-cache ${resource}`, err);
            });
        }),
      );
    }),
  );
});

// -- on activate, take over open tabs and delete caches from previous builds.
// Deletion is safe mid-session: fetches fall back to the network on a miss.
self.addEventListener("activate", function (event) {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(function (names) {
        return Promise.all(
          names
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name)),
        );
      }),
    ]),
  );
});

function isCacheable(url) {
  /*
   * We can cache fonts
   */
  if (url.includes(".woff2")) {
    return true;
  }

  /*
   * We can cache JS files, since build-IDs will bust the cache on change
   * and we don't cache index.html
   */

  if (url.includes("js/app")) {
    return true;
  }

  /*
   * We can cache CSS files, since they also have build-IDs
   */
  if (url.includes("css/style")) {
    return true;
  }

  /*
   * We can cache territory flag SVGs. They are tiny and effectively
   * immutable; a redesigned flag must ship under a new filename.
   */
  if (url.includes("/flags/")) {
    return true;
  }

  const manifestEntries = [
    "tribbles",
  ];

  /*
   * We can cache tribbles (main data source), as it has a publication ID to cache-bust between versions
   */
  for (const entry of manifestEntries) {
    if (url.includes(`/manifest/${entry}`)) {
      return true;
    }
  }

  /*
   * We cache static banner images hosted on the CDN
   */
  if (CACHEABLE_RESOURCES.some((resource) => url === resource)) {
    return true;
  }

  /*
   * We should cache homepage thumbnails
   */
  for (const entry of HOMEPAGE_THUMBNAILS) {
    if (url.includes(entry)) {
      return true;
    }
  }

  return false;
}

// every route serves index.html, so one cache entry covers all navigations
const INDEX_CACHE_KEY = "/";

/*
 * Network-first navigation: online loads stay fresh (build id, inlined
 * stats), and the last good copy boots the app offline. The copy's baked
 * asset references match the cache: install pre-caches this build's assets,
 * and old caches are only deleted when a new worker activates online.
 */
function serveNavigation(request) {
  return fetch(request)
    .then(function (networkResponse) {
      if (!networkResponse.ok) {
        return networkResponse;
      }

      const copy = networkResponse.clone();
      return caches.open(CACHE_NAME).then(function (cache) {
        return cache.put(INDEX_CACHE_KEY, copy);
      }).then(function () {
        return networkResponse;
      });
    })
    .catch(function () {
      return caches.match(INDEX_CACHE_KEY).then(function (cached) {
        return cached ?? Response.error();
      });
    });
}

self.addEventListener("fetch", function (event) {
  const url = event.request.url;

  if (event.request.mode === "navigate") {
    event.respondWith(serveNavigation(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then(function (networkResponse) {
          // -- just return the result directly
          if (!isCacheable(url)) {
            return networkResponse;
          }

          // -- cache thumbnails and artifacts
          return caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }).catch((err) => {
          console.error(err);
          return Response.error();
        });
    }),
  );
});
