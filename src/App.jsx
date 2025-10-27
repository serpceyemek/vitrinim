import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Kategoriler from "./pages/categories";
import NewListing from "./pages/NewListing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import BanaOzel from "./pages/BanaOzel";
import Arama from "./pages/Arama";
import CategoryPage from "./pages/CategoryPage";
import PreviewListing from "./pages/PreviewListing";
import BottomTabs from "./components/BottomTabs";
import Onizleme from "./pages/Onizleme";
import ListingDetail from "./pages/ListingDetail";

export default function App() {
  return (
    <>
      <Routes>
        {/* 🔸 Uygulama açılışında arama */}
        <Route path="/" element={<Arama />} />

        {/* 🔸 Mağaza sekmesi — yayınlanan ilanları gösterir */}
        <Route path="/magaza" element={<Home />} />

        <Route path="/kategoriler" element={<Kategoriler />} />
        <Route path="/ilan-ver" element={<NewListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/banaozel" element={<BanaOzel />} />
        <Route path="/arama" element={<Arama />} />
        <Route path="/kategori/:id" element={<CategoryPage />} />
        <Route path="/ilan/:id" element={<ListingDetail />} />
        <Route path="/onizleme" element={<Onizleme />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <BottomTabs />
    </>
  );
}
