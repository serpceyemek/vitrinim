// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Categories from "./pages/categories.jsx";   // ✅ default import, dosya adı küçük
import ListingDetail from "./pages/ListingDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kategori" element={<Categories />} />   {/* ✅ kullanıyoruz */}
        <Route path="/ilan/:id" element={<ListingDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
