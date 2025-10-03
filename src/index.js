// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Otomatik Service Worker kaydı (elle ?v= artırma yok)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const res = await fetch('/sw-build-id.txt', { cache: 'no-store' });
      const id = (await res.text()).trim();
      if (!id) return; // ID yoksa kaydetme
      const reg = await navigator.serviceWorker.register(`/sw.js?v=${id}`, { scope: '/' });
      console.log('SW registered with id:', id, reg);
    } catch (e) {
      console.error('SW register failed', e);
    }
  });
}
