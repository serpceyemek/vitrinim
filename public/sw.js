/* public/sw.js */
const CACHE = "vitrinim-cache-v5";
const APP_STATIC = [
  "/offline.html",
  "/manifest.json",
  "/logo-192.png",
  "/logo-512.png",
  "/apple-touch-icon.png",
  "/favicon.ico"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(APP_STATIC)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
    await self.clients.claim(); // açık sekmeleri de sahiplen
  })());
});

/* HTML GEZİNTİ ALGILAMA:
   - mode === 'navigate' (modern)
   - veya Accept: text/html (bazı durumlar) */
function isNavigation(req) {
  return req.mode === "navigate" ||
         (req.method === "GET" && req.headers.get("accept")?.includes("text/html"));
}

self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (isNavigation(req)) {
    event.respondWith((async () => {
      try {
        const preload = await event.preloadResponse;
        if (preload) return preload;
        const net = await fetch(req);
        return net;
      } catch {
        const cache = await caches.open(CACHE);
        return (await cache.match("/offline.html")) ||
               new Response("Offline", { status: 503 });
      }
    })());
    return;
  }

  // Diğer istekler: cache-first
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const res = await fetch(req);
      caches.open(CACHE).then(c => c.put(req, res.clone()));
      return res;
    } catch {
      return new Response("", { status: 504, statusText: "Offline" });
    }
  })());
});
