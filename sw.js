const resources = [
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
  "/icons/apple-touch-icon.png",
  "/icons/favicon-16x16.png",
  "/icons/favicon-32x32.png",
  "/favicon.ico",
  "/manifest.json"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("sw-cache").then(function (cache) {
      return Promise.all(resources.map((resource) => cache.add(resource)));
    }),
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // special handling; we want to use the cached result for the manifest.json,
      // but also update where possible. Ideally we'll refresh the page in a future
      // version...
      if (response?.url?.endsWith('manifest.json')) {
        fetch(event.request);

        return response;
      }

      return response || fetch(event.request);
    }),
  );
});
