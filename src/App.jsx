import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Category from "./pages/Category";
import ListingDetail from "./pages/ListingDetail";
import NewListing from "./pages/NewListing";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kategori" element={<Category />} />        {/* liste */}
          <Route path="/kategori/:path" element={<Category />} />  {/* alt yol */}
          <Route path="/ilan/:id" element={<ListingDetail />} />
          <Route path="/yeni" element={<NewListing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
