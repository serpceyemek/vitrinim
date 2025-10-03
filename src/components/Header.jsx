// src/components/Header.jsx
import { NavLink } from "react-router-dom";

const linkStyle = { padding: 16 };

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
      }}
    >
      <img src="/logo-192.png" alt="Vitrinim" width={24} height={24} />
      <strong>Vitrinim</strong>

      <nav style={{ marginLeft: "auto", display: "flex", gap: 16 }}>
        <NavLink to="/" style={linkStyle}>Anasayfa</NavLink>
        <NavLink to="/kategori" style={linkStyle}>Kategoriler</NavLink>
        <NavLink to="/login" style={linkStyle}>Giriş</NavLink>
        <NavLink to="/yeni" style={linkStyle}>İlan Yayınla</NavLink>
      </nav>
    </header>
  );
}
