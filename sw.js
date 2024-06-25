const CACHE_NAME = "sw-cache";
const THUMBNAIL_SUFFIX = "_thumbnail.webp";
const CACHEABLE_RESOURCES = [
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
  "/icons/apple-touch-icon.png",
  "/icons/favicon-16x16.png",
  "/icons/favicon-32x32.png",
  "/favicon.ico",
  "/js/library/lit.js",
  "/js/library/leaflet.js",
];

const UNCACHEABLE_RESOURCES = [
  "/manifest/metdata.json",
  "/manifest/images.json",
  "/manifest/albums.json",
];

self.addEventListener("install", function (event) {
  // on install, cache every cacheable resource explicity listed.

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(
        CACHEABLE_RESOURCES.map((resource) => cache.add(resource)),
      );
    }),
  );
});


self.addEventListener("fetch", function (event) {
  for (const resource of UNCACHEABLE_RESOURCES) {
    if (event.request.url.includes(resource)) {
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }

      return fetch(event.request).then(function (networkResponse) {
        const isThumbnail = event.request.url.includes(THUMBNAIL_SUFFIX);

        // just return the result directly
        if (!isThumbnail) {
          return networkResponse;
        }

        // cache image thumbnail
        return caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }),
  );
});
