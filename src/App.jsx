// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Categories from "./pages/categories.jsx";
import Category from "./pages/Category.jsx";
import ListingDetail from "./pages/ListingDetail.jsx";
import NewListing from "./pages/NewListing.jsx";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/c/:slug" element={<Category />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/new" element={<NewListing />} />
        <Route path="*" element={<div className="container" style={{ padding: "24px 0" }}>Sayfa bulunamadı.</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}
