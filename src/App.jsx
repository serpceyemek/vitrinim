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
import './components/tabs.css';


export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <Splash onDone={() => setShowSplash(false)} />}

      <Header />

      <div className="app-page">
  <Routes>
    {/* rotalar */}
  </Routes>
</div>


      <BottomTabs />
    </>
  );
}
