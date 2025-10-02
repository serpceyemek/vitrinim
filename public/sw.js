// public/sw.js

const VERSION = 'v7';                   // <-- sürümü artır
const STATIC_CACHE = `static-${VERSION}`;

const APP_SHELL = [
  '/index.html',
  '/manifest.json',
  '/logo-192.png',
  '/logo-512.png',
  '/logo-192-maskable.png',
  '/logo-512-maskable.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) =>
          k.startsWith('static-') && k !== STATIC_CACHE ? caches.delete(k) : undefined
        )
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // SPA yönlendirmeleri için: /, /yeni, /kategori/... gibi tüm navigasyonlar
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html').then((cached) => cached || fetch(req))
    );
    return;
  }

  // Aynı origin'e GET istekleri: logo, manifest vs.
  if (req.method === 'GET' && new URL(req.url).origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req))
    );
  }
});
