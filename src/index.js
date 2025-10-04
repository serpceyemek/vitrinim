import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
// Service Worker kaydı (otomatik build ID ile)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const res = await fetch('/sw-build-id.txt', { cache: 'no-store' });
      const id = (await res.text()).trim() || Date.now().toString();
      await navigator.serviceWorker.register(`/sw.js?v=${id}`, { scope: '/' });
      console.log('SW registered with id:', id);
    } catch (e) {
      console.error('SW register failed', e);
    }
  });
}
