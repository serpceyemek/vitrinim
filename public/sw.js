// public/sw.js
// v11
const VERSION = 'v11';
const STATIC_CACHE = `static-${VERSION}`;

const APP_SHELL = [
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo-192.png',
  '/logo-512.png',
  '/logo-192-maskable.png',
  '/logo-512-maskable.png',
  '/sw-build-id.txt',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(STATIC_CACHE).then((c) => c.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => (k.startsWith('static-') && k !== STATIC_CACHE ? caches.delete(k) : undefined))
      )
    )
  );
  self.clients.claim();
});

// Network-first, cache fallback + SPA navigation
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // SPA: tüm yönlendirmelerde index.html'i ver
  if (req.mode === 'navigate') {
    event.respondWith(caches.match('/index.html'));
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);

      try {
        const resp = await fetch(req);
        if (req.method === 'GET' && resp && resp.status === 200) {
          cache.put(req, resp.clone());
        }
        return resp;
      } catch (err) {
        // Aramada ?v=... gibi query'ler olsa da önbellekten bul
        const cached = await cache.match(req, { ignoreSearch: true });
        if (cached) return cached;

        // Görsele basit boş yanıt (kırık ikon olmasın)
        if (req.destination === 'image') return new Response('', { status: 204 });
        return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
      }
    })()
  );
});
// İstemciden gelen "hemen güncelle" mesajını yakala
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

