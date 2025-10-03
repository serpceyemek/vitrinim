// public/sw.js

// Sürümü artır (cache'i zorla yenilesin)
const VERSION = 'v11';
const STATIC_CACHE = `static-${VERSION}`;

// İlk kurulumda mutlaka cache'lenecek dosyalar (senin mevcut listen)
const APP_SHELL = [
  '/index.html',
  '/manifest.json',
  '/logo-192.png',
  '/logo-512.png',
  '/logo-192-maskable.png',
  '/logo-512-maskable.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(STATIC_CACHE);
    // 1) Kabuk dosyaları
    await cache.addAll(APP_SHELL);

    // 2) index.html içinden main.*.js ve main.*.css'i yakala ve cache'e ekle
    try {
      const resp = await fetch('/index.html', { cache: 'no-cache' });
      const html = await resp.text();
      const jsMatch  = html.match(/\/static\/js\/main\.[^"]+\.js/);
      const cssMatch = html.match(/\/static\/css\/main\.[^"]+\.css/);
      const extra = [];
      if (jsMatch)  extra.push(jsMatch[0]);
      if (cssMatch) extra.push(cssMatch[0]);
      if (extra.length) {
        await cache.addAll(extra);
      }
    } catch (_) {
      // Sessiz geç
    }
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== STATIC_CACHE ? caches.delete(k) : null)));
    await self.clients.claim();
  })());
});

// Navigation istekleri: online dene, düşerse index.html'e dön
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // SPA yönlendirmeleri
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(req);
      } catch (_) {
        const cache = await caches.open(STATIC_CACHE);
        return (await cache.match('/index.html')) || Response.error();
      }
    })());
    return;
  }

  // /static/* için cache-first
  if (url.origin === self.location.origin && url.pathname.startsWith('/static/')) {
    event.respondWith((async () => {
      const cache = await caches.open(STATIC_CACHE);
      const hit = await cache.match(req);
      if (hit) return hit;
      try {
        const resp = await fetch(req);
        cache.put(req, resp.clone());
        return resp;
      } catch (_) {
        return Response.error();
      }
    })());
    return;
  }
});
