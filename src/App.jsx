import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BottomTabs from "./components/BottomTabs";
import Splash from "./components/Splash";

import Home from "./pages/Home";
import Categories from "./pages/categories";
import NewListing from "./pages/NewListing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import BanaOzel from "./pages/BanaOzel";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <Splash onDone={() => setShowSplash(false)} />}

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kategori" element={<Categories />} />
        <Route path="/yeni" element={<NewListing />} />
        <Route path="/bana-ozel" element={<BanaOzel />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <BottomTabs />
    </>
  );
}
