// Minimal SW: ağ isteklerine karışma; kur ve kontrolü al
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k))); // tüm eski cache'leri sil
    await self.clients.claim();
  })());
});
// fetch handler YOK
// public/sw.js
const CACHE = "vitrinim-static-v1";
const OFFLINE_URL = "/offline.html";
const CORE = [
  "/",
  "/offline.html",
  "/manifest.json",
  "/logo-192.png",
  "/logo-512.png",
  "/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll(CORE);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(names.filter((n) => n !== CACHE).map((n) => caches.delete(n)));
      await self.clients.claim();
    })()
  );
});

// Navigasyon istekleri online başarısız olursa offline.html ver
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Sadece gezinti (document) istekleri
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preload = await event.preloadResponse;
          if (preload) return preload;

          const network = await fetch(request);
          return network;
        } catch (err) {
          const cache = await caches.open(CACHE);
          const offline = await cache.match(OFFLINE_URL);
          return offline;
        }
      })()
    );
  }
});
