// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Magaza from "./pages/Magaza";
import Onizleme from "./pages/Onizleme";
import NewListing from "./pages/NewListing";
import Arama from "./pages/Arama";
import BottomTabs from "./components/BottomTabs";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Ana yönlendirme */}
        <Route path="/" element={<Arama />} />
        <Route path="/arama" element={<Arama />} />
        <Route path="/magaza" element={<Magaza />} />
        <Route path="/ilan-ver" element={<NewListing />} />
        <Route path="/onizleme" element={<Onizleme />} />
      </Routes>

      <Toaster position="bottom-center" />
      <BottomTabs />
    </div>
  );
}
