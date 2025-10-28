import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// SAYFALAR
import Home from "./pages/Home";
import Arama from "./pages/Arama";
import Magaza from "./pages/Magaza";
import NewListing from "./pages/NewListing";
import Onizleme from "./pages/Onizleme";
import Profilim from "./pages/Profilim";
import BanaOzel from "./pages/BanaOzel";
import NotFound from "./pages/NotFound";

// BİLEŞENLER
import BottomTabs from "./components/BottomTabs";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arama" element={<Arama />} />
        <Route path="/magaza" element={<Magaza />} />
        <Route path="/ilan-ver" element={<NewListing />} />
        <Route path="/onizleme" element={<Onizleme />} />
        <Route path="/profilim" element={<Profilim />} />
        <Route path="/bana-ozel" element={<BanaOzel />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <BottomTabs />
      <Toaster position="bottom-center" />
    </div>
  );
}
