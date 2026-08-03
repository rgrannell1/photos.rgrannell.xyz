const CACHE_NAME = "sw-cache-3c098cd996-1062daee";
const CACHEABLE_RESOURCES = [
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
  "/icons/apple-touch-icon.png",
  "/icons/favicon-16x16.png",
  "/icons/favicon-32x32.png",
  "/favicon.ico",
  "/dist/js/app.3c098cd996-1062daee.js",
  // the two page-hero banners, from ts/constants/banners.ts
  "https://photos-cdn.rgrannell.xyz/d6cf0f7cc7.webp",
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
            .then(function (response) {
              if (!isStorable(response)) {
                console.error(
                  `skipping pre-cache of ${resource}: status ${response.status}`,
                );
                return;
              }
              return cache.put(request, response);
            })
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
/*
 * Store a response copy without ever affecting the served response: cache
 * write failures (quota, private browsing, partial responses) only log.
 * The write runs under waitUntil so the worker is not torn down mid-put.
 */
function storeInCache(event, cacheKey, copy) {
  const write = caches.open(CACHE_NAME)
    .then(function (cache) {
      return cache.put(cacheKey, copy);
    })
    .catch(function (err) {
      console.error(`failed to cache ${event.request.url}`, err);
    });
  event.waitUntil(write);
}

/*
 * Network-first navigation: online loads stay fresh (build id, inlined
 * stats), and the last good copy boots the app offline. The copy's baked
 * asset references match the cache: install pre-caches this build's assets,
 * and old caches are only deleted when a new worker activates online.
 */
function serveNavigation(event) {
  return fetch(event.request)
    .then(function (networkResponse) {
      if (networkResponse.ok) {
        storeInCache(event, INDEX_CACHE_KEY, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(function () {
      return caches.match(INDEX_CACHE_KEY)
        .catch(function () {
          return undefined;
        })
        .then(function (cached) {
          return cached ?? Response.error();
        });
    });
}

/*
 * A response worth caching: ok, or opaque (status 0) from a no-cors CDN
 * fetch. Error responses (e.g a 404 during a deploy) must not poison the
 * cache for the whole build.
 */
function isStorable(networkResponse) {
  return networkResponse.ok || networkResponse.type === "opaque";
}

/*
 * Cache-first assets. Cache trouble must never block serving: a failed
 * cache read falls through to the network, and a failed cache write still
 * returns the fetched response.
 */
function serveAsset(event) {
  return caches.match(event.request)
    .catch(function () {
      return undefined;
    })
    .then(function (cached) {
      if (cached) {
        return cached;
      }

      return fetch(event.request).then(function (networkResponse) {
        if (isCacheable(event.request.url) && isStorable(networkResponse)) {
          storeInCache(event, event.request, networkResponse.clone());
        }
        return networkResponse;
      });
    });
}

self.addEventListener("fetch", function (event) {
  if (event.request.mode === "navigate") {
    event.respondWith(serveNavigation(event));
    return;
  }

  event.respondWith(serveAsset(event));
});
