import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        background: "#f97316", // turuncu
        color: "#fff",
        padding: "10px 16px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Logo + metin: tek link */}
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", textDecoration: "none" }}
        >
          <img
            src="/logo.png"
            alt="Vitrinim"
            style={{ width: 28, height: 28, objectFit: "contain" }}
          />
          <strong style={{ fontSize: 18 }}>Vitrinim</strong>
        </Link>

        {/* Basit menü */}
        <nav style={{ display: "flex", gap: 16 }}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Anasayfa</Link>
          <Link to="/listing/1" style={{ color: "#fff", textDecoration: "none" }}>İlan Detayı</Link>
        </nav>
      </div>
    </header>
  );
}
