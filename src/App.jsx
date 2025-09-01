import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ListingDetail from "./pages/ListingDetail";

export default function App() {
  return (
    <>
      <nav style={{ padding: "12px 16px", background: "#eef2ff" }}>
        <Link to="/" style={{ marginRight: 12 }}>
          Anasayfa
        </Link>
        <Link to="/listing/1">İlan Detayı</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
      </Routes>
    </>
  );
}
