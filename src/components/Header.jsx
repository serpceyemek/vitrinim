import React from "react";
import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  color: isActive ? "#f97316" : "inherit",
});

// src/Header.jsx

export default function Header() {
  return (
    <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px" }}>
      <img src="/logo-192.png" alt="Vitrinim" width={24} height={24} />
      <strong>Vitrinim</strong>
    </header>
  );
}

      <nav style={{ marginLeft: "auto", display: "flex", gap: 16 }}>
        <NavLink to="/" style={linkStyle}>Anasayfa</NavLink>
        <NavLink to="/kategori" style={linkStyle}>Kategoriler</NavLink>
        <NavLink to="/login" style={linkStyle}>Giriş</NavLink>{/* sadece bu */}
        <NavLink to="/yeni" style={linkStyle}>İlan Yayınla</NavLink>
      </nav>
    </header>
  );
}
