// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./components/toast/ToastContext.jsx";
import App from "./App.jsx";
import "./index.css";

// Root'u bağla
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToastProvider>
  </React.StrictMode>
);

// ───────────────────────────────────────────────────────────
// Service Worker: DEV'de kapalı, PROD'da açık
// - PROD kontrolü: NODE_ENV === "production" VE localhost/dosyadan açılmıyor
// - Yerel geliştirmede SW cache karışıklığını önler
// ───────────────────────────────────────────────────────────
const isProd =
  process.env.NODE_ENV === "production" &&
  !/^localhost$|^127\.0\.0\.1$|^\[::1\]$/.test(window.location.hostname);

if (isProd && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js?v=28")
      .then((reg) => console.log("✅ Service Worker yüklendi:", reg.scope))
      .catch((err) => console.warn("❌ Service Worker hatası:", err));
  });
} else {
  // Dev ortamında varsa kayıtlı SW’yi kaldır (önbellek/yenileme problemlerini önler)
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations?.().then((regs) => {
      regs.forEach((r) => r.unregister());
    });
  }
  console.log("ℹ️ Geliştirme: Service Worker devre dışı.");
}
