const swChannel = new BroadcastChannel("sw");

swChannel.postMessage("⚙️ service-worker loaded");

const CACHE_NAME = "sw-cache";
const CACHEABLE_RESOURCES = [
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
  "/icons/apple-touch-icon.png",
  "/icons/favicon-16x16.png",
  "/icons/favicon-32x32.png",
  "/favicon.ico",
  "/favicon-32x32.png",
  // removed the font, it seemed to do something weird here
];

// -- let's not cache list of images / albums here. Our CDN will cache them for us,
// -- and we'll attach them to the window so they'll persist within a page load but not reloads.
const UNCACHEABLE_RESOURCES = [ ];

self.addEventListener("install", function (event) {
  // -- on install, cache every cacheable resource explicity listed.

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(
        CACHEABLE_RESOURCES.map((resource) => cache.add(resource)),
      );
    }),
  );
});

function isCacheable(url) {
  if (url.includes(".woff2")) {
    return true;
  }

  const manifestEntries = ['albums', 'images', 'videos', 'exif', 'semantic', 'triples']

  for (const entry of manifestEntries) {
    if (url.includes(`/manifest/${entry}`)) {
      return true;
    }
  }

  return false;
}

self.addEventListener("fetch", function (event) {
  const url = event.request.url;

  // -- do nothing for uncacheable resources
  for (const resource of UNCACHEABLE_RESOURCES) {
    if (url.includes(resource)) {
      swChannel.postMessage(`⚙️ rejecting ${url} from cache`);
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      swChannel.postMessage(`⚙️ service-worker cache miss for ${url}`);

      return fetch(event.request)
        .then(function (networkResponse) {
          swChannel.postMessage(
            `⚙️ cannot cache ${url} ${networkResponse?.status}`,
          );

          // -- just return the result directly
          if (!isCacheable(url)) {
            swChannel.postMessage(`⚙️ cannot cache ${url}`);

            return networkResponse;
          }

          // -- cache thumbnails and artifacts
          return caches.open(CACHE_NAME).then(function (cache) {
            swChannel.postMessage(
              `⚙️ caching ${url} ${networkResponse.status}`,
            );

            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }).catch((err) => {
          swChannel.postMessage(
            `⚙️ service-worker fetch failed for ${url}: ${err}`,
          );
        });
    }),
  );
});
