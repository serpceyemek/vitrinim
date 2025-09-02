import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ListingDetail from "./pages/ListingDetail";

// Tek dosyalık 404: Ayrı dosya oluşturmadan burada tanımlıyoruz
function NotFound() {
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Sayfa Bulunamadı</h2>
      <p>
        Aradığın sayfayı bulamadık. <Link to="/">Anasayfa</Link>’ya
        dönebilirsin.
      </p>
    </main>
  );
}

export default function App() {
  return (
    <>
      <header
        style={{ background: "#1976d2", color: "#fff", padding: "12px 16px" }}
      >
        <h1 style={{ margin: 0 }}>Vitrinim</h1>
        <nav style={{ marginTop: 8 }}>
          <Link
            to="/"
            style={{ color: "#fff", marginRight: 12, textDecoration: "none" }}
          >
            Anasayfa
          </Link>
          <Link
            to="/listing/1"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            İlan Detayı (örnek)
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer
        style={{
          marginTop: 24,
          padding: "16px",
          textAlign: "center",
          background: "#f6f7f9",
        }}
      >
        © 2025 Vitrinim. Tüm hakları saklıdır.
      </footer>
    </>
  );
}
