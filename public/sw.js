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
