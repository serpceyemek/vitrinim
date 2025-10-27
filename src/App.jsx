import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";               // Mağaza
import Kategoriler from "./pages/categories";
import NewListing from "./pages/NewListing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import BanaOzel from "./pages/BanaOzel";
import Arama from "./pages/Arama";
import CategoryPage from "./pages/CategoryPage";
import Onizleme from "./pages/Onizleme";
import ListingDetail from "./pages/ListingDetail"; // ← yeni

import BottomTabs from "./components/BottomTabs";

export default function App() {
  return (
    <>
      <Routes>
        {/* AÇILIŞ: Arama sayfası */}
        <Route path="/" element={<Arama />} />

        {/* Mağaza */}
        <Route path="/magaza" element={<Home />} />

        {/* Diğer sayfalar */}
        <Route path="/kategoriler" element={<Kategoriler />} />
        <Route path="/ilan-ver" element={<NewListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/banaozel" element={<BanaOzel />} />
        <Route path="/arama" element={<Arama />} />
        <Route path="/kategori/:id" element={<CategoryPage />} />
        <Route path="/onizleme" element={<Onizleme />} />

        {/* İLAN DETAY */}
        <Route path="/ilan/:id" element={<ListingDetail />} />

        {/* Eski link toparlama (opsiyonel) */}
        <Route path="/home" element={<Navigate to="/magaza" replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <BottomTabs />
    </>
  );
}
