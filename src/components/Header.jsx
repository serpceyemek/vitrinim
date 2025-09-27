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
    <header style={{ borderBottom: "1px solid #eee" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Sol: Logo + marka */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: "#000",
            fontWeight: 700,
          }}
        >
          <img
            src="/logo192.png" // public klasöründeki CRA logosu; kendi logon varsa yolunu koy
            alt="Vitrinim"
            style={{ width: 24, height: 24, borderRadius: 4 }}
          />
          <span>Vitrinim</span>
        </Link>

        {/* Sağ: menü */}
        <nav style={{ marginLeft: "auto", display: "flex", gap: 20 }}>
          <Link to="/" style={linkStyle("/")}>
            Anasayfa
          </Link>
          <Link to="/kategori" style={linkStyle("/kategori")}>
            Kategoriler
          </Link>
          <Link to="/yeni" style={linkStyle("/yeni")}>
            İlan Yayınla
          </Link>
        </nav>
      </div>
    </header>
  );
}
