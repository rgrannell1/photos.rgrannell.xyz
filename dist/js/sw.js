var s = new BroadcastChannel("sw");
s.postMessage("\u2699\uFE0F service-worker loaded");
var i = "sw-cache",
  r = [
    "/icons/android-chrome-192x192.png",
    "/icons/android-chrome-512x512.png",
    "/icons/apple-touch-icon.png",
    "/icons/favicon-16x16.png",
    "/icons/favicon-32x32.png",
    "/favicon.ico",
  ],
  o = ["/manifest/metdata.json"];
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(i).then(function (n) {
      return Promise.all(r.map((c) => n.add(c)));
    }),
  );
});
function u(e, n) {
  return !!(e.includes("_thumbnail") || e.includes("/t/") ||
    e.includes(".woff2") || e.includes("/manifest/albums") ||
    e.includes("/manifest/images") || e.includes("/manifest/videos"));
}
self.addEventListener("fetch", function (e) {
  let n = e.request.url;
  for (let c of o) {
    if (n.includes(c)) {
      s.postMessage(`\u2699\uFE0F rejecting ${n} from cache`);
      return;
    }
  }
  e.respondWith(
    caches.match(e.request).then(function (c) {
      return c ||
        (s.postMessage(`\u2699\uFE0F service-worker cache miss for ${n}`),
          fetch(e.request).then(function (t) {
            return s.postMessage(`\u2699\uFE0F cannot cache ${n} ${t?.status}`),
              u(n, t.status)
                ? caches.open(i).then(function (a) {
                  return s.postMessage(`\u2699\uFE0F caching ${n} ${t.status}`),
                    a.put(e.request, t.clone()),
                    t;
                })
                : (s.postMessage(`\u2699\uFE0F cannot cache ${n}`), t);
          }).catch((t) => {
            s.postMessage(
              `\u2699\uFE0F service-worker fetch failed for ${n}: ${t}`,
            );
          }));
    }),
  );
});
//# sourceMappingURL=sw.js.map
