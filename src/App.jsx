// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Categories from "./pages/categories.jsx";   // küçük c ✅
import ListingDetail from "./pages/ListingDetail.jsx";
import NotFound from "./pages/NotFound.jsx";       // yeni dosya ✅

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kategori" element={<Categories />} />
        <Route path="/ilan/:id" element={<ListingDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
