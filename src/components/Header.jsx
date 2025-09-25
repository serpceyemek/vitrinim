// src/components/Header.jsx
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const isActive = (p) => pathname === p;

  return (
    <header style={{ borderBottom: "1px solid #eee", background: "#fff" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}
        >
          <img src="/logo.png" alt="Vitrinim" width="28" height="28" />
          <strong style={{ color: "#f97316" }}>Vitrinim</strong>
        </Link>

        <nav style={{ marginLeft: "auto", display: "flex", gap: 16 }}>
          <Link to="/" style={{ textDecoration: "none", color: isActive("/") ? "#f97316" : "#111" }}>
            Anasayfa
          </Link>
          <Link
            to="/categories"
            style={{ textDecoration: "none", color: isActive("/categories") ? "#f97316" : "#111" }}
          >
            Kategoriler
          </Link>
          <Link
            to="/new"
            style={{ textDecoration: "none", color: isActive("/new") ? "#f97316" : "#111" }}
          >
            İlan Yayınla
          </Link>
        </nav>
      </div>
    </header>
  );
}
