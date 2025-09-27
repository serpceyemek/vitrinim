import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Category from "./pages/Category";
import ListingDetail from "./pages/ListingDetail";
import NewListing from "./pages/NewListing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/kategori" element={<Category />} />
        <Route path="/kategori/:path" element={<Category />} />

        <Route path="/ilan/:id" element={<ListingDetail />} />
        <Route path="/yeni" element={<NewListing />} />

        {/* Ana giriş sayfası */}
        <Route path="/login" element={<Login />} />

        {/* Alias yönlendirmeler */}
        <Route path="/giris" element={<Navigate to="/login" replace />} />
        <Route path="/giriş" element={<Navigate to="/login" replace />} />
<Route path="/__ping" element={<h1 style={{padding:24}}>pong</h1>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
