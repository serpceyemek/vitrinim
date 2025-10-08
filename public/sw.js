// public/sw.js
const CACHE_NAME = 'vitrinim-static-v1';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Sadece sayfa gezinmelerinde (navigate) ağ başarısız olursa offline ver
self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return;

  event.respondWith((async () => {
    try {
      const preload = await event.preloadResponse;
      if (preload) return preload;
      return await fetch(event.request);
    } catch (err) {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(OFFLINE_URL);
      return cached || Response.error();
    }
  })());
});
