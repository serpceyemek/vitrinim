// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ListingDetail from "./pages/ListingDetail";

function NotFound() {
  return (
    <main style={{ padding: "1rem" }}>
      <style>{`
        .nf-wrap { max-width: 900px; margin: 0 auto; }
        .nf-card {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 28px;
          background: #fff;
          box-shadow: 0 1px 2px rgba(0,0,0,.04);
          text-align: center;
        }
        .nf-title { margin: 0 0 8px; font-size: 1.4rem; color: #111827; }
        .nf-text { color: #4b5563; margin-bottom: 16px; }
        .nf-actions { display: flex; gap: 10px; justify-content: center; }
        .nf-btn {
          padding: 10px 14px; border-radius: 10px; border: 1px solid #e5e7eb;
          background: #f9fafb; cursor: pointer; text-decoration: none; color: #111827;
        }
        .nf-btn:hover { background: #f3f4f6; }
        .nf-primary { background:#f97316; color:#fff; border-color:#f97316; }
        .nf-primary:hover { filter: brightness(.96); }
      `}</style>

      <div className="nf-wrap">
        <div className="nf-card" role="region" aria-label="Sayfa bulunamadı">
          <h2 className="nf-title">Sayfa Bulunamadı</h2>
          <p className="nf-text">
            Aradığın sayfayı bulamadık. Bağlantı hatalı ya da içerik kaldırılmış
            olabilir.
          </p>
          <div className="nf-actions">
            <Link to="/" className="nf-btn nf-primary">
              Anasayfa
            </Link>
            <a href="mailto:support@vitrinim.app" className="nf-btn">
              Destek
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
