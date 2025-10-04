// Service Worker kaydı (build id ile) + "yeni sürüm hazır" bildirimi
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const res = await fetch('/sw-build-id.txt', { cache: 'no-store' });
      const id = (await res.text()).trim() || Date.now().toString();
      const reg = await navigator.serviceWorker.register(`/sw.js?v=${id}`, { scope: '/' });
      console.log('SW registered with id:', id);

      // Eğer sayfa açıldığında zaten bekleyen yeni bir SW varsa, hemen sor
      if (reg.waiting && navigator.serviceWorker.controller) {
        if (window.confirm('Yeni sürüm hazır. Uygulamayı şimdi güncelleyelim mi?')) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      }

      // Yeni bir SW indirilmeye başlarsa (updatefound)
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', () => {
          // "installed" + controller varsa: bu bir GÜNCELLEME (ilk kurulum değil)
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            if (window.confirm('Yeni sürüm hazır. Uygulamayı şimdi güncelleyelim mi?')) {
              reg.waiting?.postMessage({ type: 'SKIP_WAITING' });
            }
          }
        });
      });

      // SKIP_WAITING sonrası kontrolcü değişince sayfayı otomatik yenile
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    } catch (e) {
      console.error('SW register failed', e);
    }
  });
}
