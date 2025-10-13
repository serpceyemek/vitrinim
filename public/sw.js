// @ts-nocheck
// SW v27 (temiz ASCII, noktalı virgüller tam)

const CACHE = "vitrinim-v27";
const ASSETS = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest-v25.json",
  "/logo-192.png",
  "/logo-512.png",
  "/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() =>
        caches.match(e.request).then((c) => c || caches.match("/offline.html"))
      )
  );
});
