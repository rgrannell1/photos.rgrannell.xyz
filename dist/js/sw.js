var t = new BroadcastChannel("sw");
t.postMessage("\u2699\uFE0F service-worker loaded");
var i = "sw-cache",
  r = [
    "/icons/android-chrome-192x192.png",
    "/icons/android-chrome-512x512.png",
    "/icons/apple-touch-icon.png",
    "/icons/favicon-16x16.png",
    "/icons/favicon-32x32.png",
    "/favicon.ico",
    "/favicon-32x32.png",
  ],
  a = [];
self.addEventListener("install", function (n) {
  n.waitUntil(
    caches.open(i).then(function (e) {
      return Promise.all(r.map((c) => e.add(c)));
    }),
  );
});
function f(n) {
  if (n.includes(".woff2")) return !0;
  let e = ["albums", "images", "videos", "exif", "semantic", "triples"];
  for (let c of e) if (n.includes(`/manifest/${c}`)) return !0;
  return !1;
}
self.addEventListener("fetch", function (n) {
  let e = n.request.url;
  for (let c of a) {
    if (e.includes(c)) {
      t.postMessage(`\u2699\uFE0F rejecting ${e} from cache`);
      return;
    }
  }
  n.respondWith(
    caches.match(n.request).then(function (c) {
      return c ||
        (t.postMessage(`\u2699\uFE0F service-worker cache miss for ${e}`),
          fetch(n.request).then(function (s) {
            return t.postMessage(`\u2699\uFE0F cannot cache ${e} ${s?.status}`),
              f(e)
                ? caches.open(i).then(function (o) {
                  return t.postMessage(`\u2699\uFE0F caching ${e} ${s.status}`),
                    o.put(n.request, s.clone()),
                    s;
                })
                : (t.postMessage(`\u2699\uFE0F cannot cache ${e}`), s);
          }).catch((s) => {
            t.postMessage(
              `\u2699\uFE0F service-worker fetch failed for ${e}: ${s}`,
            );
          }));
    }),
  );
});
//# sourceMappingURL=sw.js.map
