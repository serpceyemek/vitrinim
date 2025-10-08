/* public/sw.js – sade ve sağlam PWA SW
   Strateji:
   - Navigasyon (sayfa geçişleri): network-first, sonra cache, en son /offline.html
   - Statik dosyalar (ikonlar, manifest, css/js): cache-first
*/

const CACHE_VERSION = 'v19';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;

const CORE_ASSETS = [
  '/',                 // CRA'de kök route
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/logo-192.png',
  '/logo-512.png',
  '/apple-touch-icon.png',
  '/apple-touch-icon-120x120.png',
  '/apple-touch-icon-152x152.png',
  '/apple-touch-icon-167x167.png',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(CORE_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((k) => ![STATIC_CACHE, DYNAMIC_CACHE].includes(k))
        .map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Sadece GET isteklerini ele al
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // 1) Sayfa navigasyonları: network-first
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const networkRes = await fetch(req);
        // Cache'e koyarken mutlaka KLON kullan
        const dyn = await caches.open(DYNAMIC_CACHE);
        dyn.put(req, networkRes.clone());
        return networkRes;
      } catch (err) {
        // Önce cache, o da yoksa offline sayfası
        const cached = await caches.match(req);
        return cached || caches.match('/offline.html');
      }
    })());
    return;
  }

  // 2) Aynı origin statikler: cache-first
  if (sameOrigin) {
    event.respondWith((async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      try {
        const networkRes = await fetch(req);
        const dyn = await caches.open(DYNAMIC_CACHE);
        dyn.put(req, networkRes.clone());
        return networkRes;
      } catch (err) {
        // Statik istekte de bir şey bulamazsak offline sayfası
        return caches.match('/offline.html');
      }
    })());
    return;
  }

  // 3) Cross-origin istekler: network-first, sonra cache
  event.respondWith((async () => {
    try {
      const networkRes = await fetch(req);
      const dyn = await caches.open(DYNAMIC_CACHE);
      dyn.put(req, networkRes.clone());
      return networkRes;
    } catch (err) {
      const cached = await caches.match(req);
      if (cached) return cached;
      return new Response('', { status: 408, statusText: 'Offline' });
    }
  })());
});
