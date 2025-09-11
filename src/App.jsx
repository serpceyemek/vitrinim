// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Category from "./pages/Category";
import ListingDetail from "./pages/ListingDetail";
import NewListing from "./pages/NewListing";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kategori/:path" element={<Category />} />
          <Route path="/ilan/:id" element={<ListingDetail />} />
          <Route path="/yeni" element={<NewListing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
