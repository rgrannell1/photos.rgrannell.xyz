const CACHE_NAME = "sw-cache";
const CACHEABLE_RESOURCES = [
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
  "/icons/apple-touch-icon.png",
  "/icons/favicon-16x16.png",
  "/icons/favicon-32x32.png",
  "/favicon.ico",
  "/favicon-32x32.png",
  "/dist/css/photo-album.6570efc0eb.css",
  "/dist/css/style.6570efc0eb.css",
  "/dist/js/app.6570efc0eb.js",
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
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(
        CACHEABLE_RESOURCES.map((resource) => cache.add(resource)),
      );
    }),
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

  if (url.includes("js/app") || url.includes("js/sw")) {
    return true;
  }

  /*
   * We can cache CSS files, since they also have build-IDs
   */
  if (url.includes("css/style")) {
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
   * We should cache homepage thumbnails
   */
  for (const entry of HOMEPAGE_THUMBNAILS) {
    if (url.includes(entry)) {
      return true;
    }
  }

  return false;
}

self.addEventListener("fetch", function (event) {
  const url = event.request.url;

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
        });
    }),
  );
});
