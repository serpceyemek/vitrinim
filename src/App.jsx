// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Kategoriler from "./pages/categories";
import NewListing from "./pages/NewListing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import BanaOzel from "./pages/BanaOzel";

import BottomTabs from "./components/BottomTabs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Kategoriler" element={<Kategoriler />} />
        <Route path="/ilan-ver" element={<NewListing />} />
        <Route path="/giris" element={<Login />} />
        <Route path="/bana-ozel" element={<BanaOzel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Alt sekme çubuğu her sayfada görünsün */}
      <BottomTabs />
    </BrowserRouter>
  );
}
