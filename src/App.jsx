import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Magaza from "./pages/Magaza";
import StepForm from "./components/StepForm";
import Onizleme from "./pages/Onizleme";
import BottomTabs from "./components/BottomTabs";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/magaza" element={<Magaza />} />
          <Route path="/ilan-ver" element={<StepForm />} />
          <Route path="/onizleme" element={<Onizleme />} />
        </Routes>
        <BottomTabs />
      </div>
      <Toaster position="bottom-center" toastOptions={{ duration: 1500 }} />
    </Router>
  );
}
