import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Kategoriler from "./pages/categories";
import NewListing from "./pages/NewListing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import BanaOzel from "./pages/BanaOzel";
import Arama from "./pages/Arama";
import CategoryPage from "./pages/CategoryPage";


import BottomTabs from "./components/BottomTabs";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <main className="flex-1 min-h-[calc(100vh-88px)] overflow-y-auto bg-white">

        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/kategori/:name" element={<CategoryPage />} />
  <Route path="/Kategoriler" element={<Kategoriler />} />

  {/* 🟠 Tek “İlan Ver” rotası */}
  <Route path="/ilan-ver/*" element={<NewListing />} />

  <Route path="/giris" element={<Login />} />
  <Route path="/bana-ozel" element={<BanaOzel />} />
  <Route path="/arama" element={<Arama />} />
  <Route path="*" element={<NotFound />} />
</Routes>

      </main>

      {/* Alt sekme çubuğu her sayfada görünsün */}
      <BottomTabs />
    </div>
  );
}
