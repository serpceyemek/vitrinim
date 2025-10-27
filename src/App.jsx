import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Magaza from "./pages/Magaza";
import Onizleme from "./pages/Onizleme";
import NewListing from "./pages/NewListing";
import BottomTabs from "./components/BottomTabs";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/magaza" element={<Magaza />} />
          <Route path="/ilan-ver" element={<NewListing />} />
          <Route path="/onizleme" element={<Onizleme />} />
        </Routes>

        <Toaster position="bottom-center" />
        <BottomTabs />
      </div>
    </Router>
  );
}
