import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./components/toast/ToastContext";
import App from "./App";
import "./index.css";

// React uygulamasını root’a bağla
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

// Service Worker (isteğe bağlı)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js?v=28")
      .then((reg) => console.log("✅ Service Worker yüklendi:", reg.scope))
      .catch((err) => console.warn("❌ Service Worker hatası:", err));
  });
}
