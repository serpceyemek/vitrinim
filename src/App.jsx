import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import ListingDetail from "./pages/ListingDetail.jsx";

function NotFound() {
  return (
    <main style={{ padding: 16 }}>
      <h2>Sayfa Bulunamadı</h2>
      <p>
        Aradığın sayfayı bulamadık. <Link to="/">Anasayfa</Link>'ya dönebilirsin.
      </p>
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
