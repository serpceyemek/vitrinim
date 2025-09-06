
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/categories.jsx"; // küçük c ✅
import ListingDetail from "./pages/ListingDetail";
import NotFound from "./pages/NotFound.jsx";


export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/c/:slug" element={<Category />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/new" element={<NewListing />} />
        <Route path="*" element={<div className="container" style={{ padding: "24px 0" }}>Sayfa bulunamadı.</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}
