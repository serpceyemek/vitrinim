// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ListingDetail from "./pages/ListingDetail";
import CategoryPage from "./pages/Category";
import NewListing from "./pages/NewListing";

function NotFound() {
  return (
    <main style={{ padding: 24 }}>
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, background: "#fff", textAlign: "center" }}>
        <h2 style={{ margin: 0, fontSize: 20 }}>Sayfa Bulunamadı</h2>
        <p style={{ color: "#4b5563" }}>Bağlantı hatalı ya da içerik kaldırılmış olabilir.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <Link to="/" style={{ padding: "8px 12px", borderRadius: 8, background: "#f97316", color: "#fff", textDecoration: "none" }}>Anasayfa</Link>
          <Link to="/c" style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e5e7eb", textDecoration: "none", color: "#111827" }}>Kategoriler</Link>
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
        <Route path="/c/*" element={<CategoryPage />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/new" element={<NewListing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
