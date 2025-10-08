/* public/sw.js */
const CACHE = "vitrinim-cache-v4";
const APP_STATIC = [
  "/offline.html",
  "/manifest.json",
  "/logo-192.png",
  "/logo-512.png",
  "/apple-touch-icon.png",
  "/favicon.ico"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(APP_STATIC)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Sayfa gezintileri: çevrimdışı ise offline.html'e düş
  if (req.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const preload = await event.preloadResponse;
        if (preload) return preload;
        const network = await fetch(req);
        return network;
      } catch (err) {
        const cache = await caches.open(CACHE);
        const fallback = await cache.match("/offline.html");
        return fallback;
      }
    })());
    return;
  }

  // Diğer istekler: cache-first, yoksa ağdan al ve önbelleğe koy
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;

    try {
      const res = await fetch(req);
      caches.open(CACHE).then(c => c.put(req, res.clone()));
      return res;
    } catch (err) {
      // Dosya için özel yedek yoksa sessiz geç
      return new Response("", { status: 504, statusText: "Offline" });
    }
  })());
});
