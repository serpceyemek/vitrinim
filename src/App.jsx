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

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kategoriler" element={<Kategoriler />} />
        <Route path="/ilan-ver" element={<NewListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/banaozel" element={<BanaOzel />} />
        <Route path="/arama" element={<Arama />} />
        <Route path="/kategori/:id" element={<CategoryPage />} />
        <Route path="/onizleme" element={<PreviewListing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomTabs />
    </>
  );
}
