var i = "sw-cache",
  o = [
    "/icons/android-chrome-192x192.png",
    "/icons/android-chrome-512x512.png",
    "/icons/apple-touch-icon.png",
    "/icons/favicon-16x16.png",
    "/icons/favicon-32x32.png",
    "/favicon.ico",
    "/favicon-32x32.png",
  ],
  s = [];
self.addEventListener("install", function (n) {
  n.waitUntil(
    caches.open(i).then(function (e) {
      return Promise.all(o.map((c) => e.add(c)));
    }),
  );
});
function u(n) {
  if (n.includes(".woff2")) return !0;
  let e = ["albums", "images", "videos", "exif", "semantic", "triples"];
  for (let c of e) if (n.includes(`/manifest/${c}`)) return !0;
  return !1;
}
self.addEventListener("fetch", function (n) {
  let e = n.request.url;
  for (let c of s) if (e.includes(c)) return;
  n.respondWith(
    caches.match(n.request).then(function (c) {
      return c || fetch(n.request).then(function (t) {
        return u(e)
          ? caches.open(i).then(function (r) {
            return r.put(n.request, t.clone()), t;
          })
          : t;
      }).catch((t) => {
        console.error(t);
      });
    }),
  );
});
//# sourceMappingURL=sw.js.map
