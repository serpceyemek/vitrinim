import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Sayfalar
import Home from "./pages/Home";
import ListingDetail from "./pages/ListingDetail";

// Basit 404 (ayrı dosya istemedik, burada tanımlı)
function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="mt-2 text-gray-600">Aradığınız sayfa bulunamadı.</p>
      <a href="/" className="mt-4 inline-block rounded-2xl border px-4 py-2 hover:bg-gray-50">Ana sayfa</a>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        {/* Kategori sayfasını ekleyeceksek daha sonra: <Route path="/category/:slug" element={<Category />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
