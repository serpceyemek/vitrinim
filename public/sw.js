// public/sw.js
const CACHE_NAME = 'vitrinim-v3'; // <- bunu her önemli değişimde arttır
const PRECACHE = [
  '/',            // shell
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  // ikonlar
  '/logo-192.png',
  '/logo-512.png',
  '/logo-192-maskable.png',
  '/logo-512-maskable.png',
];

// Kurulum: gerekli dosyaları önbelleğe at
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// Aktivasyon: eski cache'leri sil
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

// İstekler: cache-first, sonra network; başarısız olursa cache'ten dön
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((cache) => {
            // uzantı istekleri vs. hariç tut
            if (!req.url.startsWith('chrome-extension://')) {
              cache.put(req, copy);
            }
          });
          return resp;
        })
        .catch(() => caches.match('/index.html')); // offline fallback
    })
  );
});
