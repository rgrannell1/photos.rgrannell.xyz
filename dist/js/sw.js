var c=new BroadcastChannel("sw");c.postMessage("\u2699\uFE0F service-worker loaded");var a="sw-cache",r=["/icons/android-chrome-192x192.png","/icons/android-chrome-512x512.png","/icons/apple-touch-icon.png","/icons/favicon-16x16.png","/icons/favicon-32x32.png","/favicon.ico"],o=["/manifest/metdata.json"];self.addEventListener("install",function(e){e.waitUntil(caches.open(a).then(function(n){return Promise.all(r.map(s=>n.add(s)))}))});function u(e,n){return!!(e.includes("_thumbnail")||e.includes("/t/")||e.includes(".woff2")||e.includes("/manifest/albums")||e.includes("/manifest/images"))}self.addEventListener("fetch",function(e){let n=e.request.url;for(let s of o)if(n.includes(s)){c.postMessage(`\u2699\uFE0F rejecting ${n} from cache`);return}e.respondWith(caches.match(e.request).then(function(s){return s||(c.postMessage(`\u2699\uFE0F service-worker cache miss for ${n}`),fetch(e.request).then(function(t){return c.postMessage(`\u2699\uFE0F cannot cache ${n} ${t?.status}`),u(n,t.status)?caches.open(a).then(function(i){return c.postMessage(`\u2699\uFE0F caching ${n} ${t.status}`),i.put(e.request,t.clone()),t}):(c.postMessage(`\u2699\uFE0F cannot cache ${n}`),t)}).catch(t=>{c.postMessage(`\u2699\uFE0F service-worker fetch failed for ${n}: ${t}`)}))}))});
//# sourceMappingURL=sw.js.map
