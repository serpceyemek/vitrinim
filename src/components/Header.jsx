import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const isActive = (p) => pathname === p;

  const linkStyle = (p) => ({
    textDecoration: "none",
    color: isActive(p) ? "#f97316" : "#000",
  });

  return (
    <header>
      <div>
        <nav style={{ marginLeft: "auto", display: "flex", gap: 16 }}>
          <Link to="/" style={linkStyle("/")}>Anasayfa</Link>
          <Link to="/kategori" style={linkStyle("/kategori")}>Kategoriler</Link>
          <Link to="/yeni" style={linkStyle("/yeni")}>İlan Yayınla</Link>
        </nav>
      </div>
    </header>
  );
}
