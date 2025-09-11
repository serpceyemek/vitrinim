import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Categories from "./pages/categories";
import Category from "./pages/Category";
import ListingDetail from "./pages/ListingDetail";
import NewListing from "./pages/NewListing";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "16px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:path" element={<Category />} />
          <Route path="/ilan/:id" element={<ListingDetail />} />
          <Route path="/new" element={<NewListing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
