// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Arama from "./pages/Arama";
import CategoryPage from "./pages/CategoryPage";
import Magaza from "./pages/Magaza";
import BanaOzel from "./pages/BanaOzel";
import IlanVer from "./pages/NewListing";
import Profil from "./pages/Profilim";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ana sayfa */}
        <Route path="/" element={<Arama />} />

        {/* Kategori sayfası */}
        <Route path="/kategori/:slug" element={<CategoryPage />} />

        {/* Diğer sayfalar */}
        <Route path="/magaza" element={<Magaza />} />
        <Route path="/ilan-ver" element={<IlanVer />} />
        <Route path="/bana-ozel" element={<BanaOzel />} />
        <Route path="/giris" element={<Profil />} />
      </Routes>
    </Router>
  );
}
