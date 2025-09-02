// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#1976d2",
        color: "#fff",
        padding: "12px 16px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        {/* Sol taraf: Logo + isim (tamamı tıklanabilir) */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <img
            src="/logo.png"
            alt="Vitrinim"
            width={28}
            height={28}
            style={{ display: "block" }}
          />
          <strong>Vitrinim</strong>
        </Link>

        {/* Sağ taraf: basit menü */}
        <nav style={{ display: "flex", gap: 16 }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Anasayfa
          </Link>
          <Link
            to="/listing/1"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            İlan Detayı
          </Link>
        </nav>
      </div>
    </header>
  );
}
