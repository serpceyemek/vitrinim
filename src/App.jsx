import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import BottomTabs from "./components/BottomTabs";

// CSS'leri merkezi yerden bir kere import edelim
import "./components/header.css";
import "./components/tabs.css";

// Sayfa bileşenleri – isim/kasa KESİN eşleşmeli
import Home from "./pages/Home";
import Categories from "./pages/categories";
import NewListing from "./pages/NewListing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Header />

      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kategori" element={<Categories />} />
          <Route path="/yeni" element={<NewListing />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <BottomTabs />
    </>
  );
}
