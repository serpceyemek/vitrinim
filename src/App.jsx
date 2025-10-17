import React from "react";
import { Routes, Route } from "react-router-dom";
import NewListingStep from "./pages/NewListingStep";
import NewListingFormPlaceholder from "./pages/NewListingFormPlaceholder";
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
      <main className="pb-[88px] safe-bottom">
        <Routes>
          <Route path="/kategori/:name" element={<CategoryPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/Kategoriler" element={<Kategoriler />} />
          <Route path="/ilan-ver" element={<NewListing />} />
          <Route path="/ilan-ver/:slug1" element={<NewListingStep />} />
<Route path="/ilan-ver/:slug1/:slug2" element={<NewListingStep />} />
<Route path="/ilan-ver/:slug1/:slug2/:slug3" element={<NewListingStep />} />
<Route path="/ilan-ver/form" element={<NewListingFormPlaceholder />} />
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
