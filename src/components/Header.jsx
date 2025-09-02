import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header
    style={{
      padding: "12px 16px",
      background: "#1976d2",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    {/* Sol: Logo + isim (tıklanabilir) */}
    <Link
      to="/"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <img
        src="/logo.png" // public/logo.png dosyan
        alt="Vitrinim"
        width="28"
        height="28"
        style={{ display: "block" }}
      />
      <strong>Vitrinim</strong>
    </Link>

    {/* Sağ: basit menü örneği (istersen kalır) */}
    <nav>
      <Link to="/" style={{ marginLeft: 16, color: "#fff" }}>
        Anasayfa
      </Link>
      <Link to="/listing/1" style={{ marginLeft: 12, color: "#fff" }}>
        İlan Detayı (örnek)
      </Link>
    </nav>
  </header>
);

export default Header;
