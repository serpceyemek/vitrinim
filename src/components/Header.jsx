import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  const wrap = {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "#f97316", // turuncu taç rengi
    color: "white",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  };

  const bar = {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: "12px 16px",
  };

  const brand = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    color: "white",
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 1,
  };

  const nav = {
    display: "flex",
    alignItems: "center",
    gap: 16,
  };

  const link = (active) => ({
  padding: "6px 12px",
  textDecoration: "none",
  color: "#fff",
  borderBottom: active ? "2px solid #fff" : "2px solid transparent",
  marginRight: 16,
});

  return (
    <header style={wrap}>
      <div style={bar}>
        {/* LOGO + MARKA (tamamı tıklanır) */}
        <Link to="/" style={brand} aria-label="Vitrinim - Anasayfa">
          {/* Turuncu taç/mini vitrin: inline SVG */}
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="2" y="4" width="20" height="16" rx="3" fill="white" />
            <path
              d="M5 10h14v8H5z"
              fill="#f97316"
              opacity="0.12"
            />
            <path
              d="M7 7h10M7 12h5"
              stroke="#f97316"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Vitrinim</span>
        </Link>

        <nav style={nav} aria-label="Ana gezinme">
  <Link to="/" style={link(pathname === "/")}>Anasayfa</Link>
  <Link to="/c" style={link(pathname.startsWith("/c"))}>Kategoriler</Link>
  <Link to="/new" style={link(pathname === "/new")}>İlan Yayınla</Link>
</nav>

      </div>
    </header>
  );
}
