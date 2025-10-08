import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Splash from "./components/Splash";
import BottomTabs from "./components/BottomTabs"; // ← sadece bu import olsun
import Home from "./pages/Home";
import Categories from "./pages/categories";
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

      <BottomTabs />
    </>
  );
}
import BottomTabs from "./components/BottomTabs";
import "./components/tabs.css";
import "./components/header.css";

export default function App(){
  return (
    <>
      <Header />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/kategori"  element={<Categories />} />
        <Route path="/yeni"      element={<NewListing />} />
        <Route path="/login"     element={<Login />} />
      </Routes>

      <BottomTabs />
    </>
  );
}
