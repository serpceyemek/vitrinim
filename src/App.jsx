// src/App.jsx (örnek)
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Splash from "./components/Splash";
import BottomTabs from "./components/BottomTabs"; // 3. adım gelince aktif olacak

import Home from "./pages/Home";          // senin sayfaların
import Categories from "./pages/Categories";
import NewListing from "./pages/NewListing";
import Login from "./pages/Login";

export default function App() {
  const [showSplash, setShowSplash] = useState(
    !sessionStorage.getItem("splashShown")
  );

  return (
    <>
      {showSplash && <Splash onDone={() => setShowSplash(false)} />}

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kategori" element={<Categories />} />
        <Route path="/yeni" element={<NewListing />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {/* 3. adımda eklenecek:
      <BottomTabs />
      */}
    </>
  );
}
import BottomTabs from "./components/BottomTabs";
// ...
<BottomTabs />
