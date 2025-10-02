// public/sw.js
const VERSION = 'v4';
const STATIC_CACHE = `static-${VERSION}`;

const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo-192.png',
  '/logo-512.png',
  '/logo-192-maskable.png',
  '/logo-512-maskable.png'
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
      Promise.all(keys.map((k) => (k !== STATIC_CACHE ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

function isNavigationRequest(req) {
  return (
    req.mode === 'navigate' ||
    (req.method === 'GET' && req.headers.get('accept')?.includes('text/html'))
  );
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1) NAVİGASYON: /yeni gibi sayfa isteklerinde index.html'i döndür (SPA fallback)
  if (url.origin === location.origin && isNavigationRequest(req)) {
    event.respondWith(
      caches.match('/index.html').then((cached) => cached || fetch('/index.html'))
    );
    return;
  }

  // 2) AYNI KÖKEN STATİK DOSYALAR: cache-first + ağdan gelirse cache’e koy
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req)
          .then((res) => {
            const clone = res.clone();
            caches.open(STATIC_CACHE).then((c) => c.put(req, clone));
            return res;
          })
          .catch(() => caches.match('/index.html'));
      })
    );
  }
});
