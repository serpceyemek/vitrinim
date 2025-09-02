import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header style={{ padding: "1rem", background: "#007bff", color: "#fff" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <img
        src="/logo.png"
        alt="Vitrinim"
        width={28}
        height={28}
        style={{ display: "block" }}
      />
      <h1 style={{ margin: 0, fontSize: "1.25rem" }}>Vitrinim</h1>
    </div>

    <nav style={{ marginTop: 8 }}>
      <Link to="/" style={{ margin: "0 1rem", color: "white" }}>
        Anasayfa
      </Link>
      <Link to="/ilan/1" style={{ margin: "0 1rem", color: "white" }}>
        İlan Detayı
      </Link>
    </nav>
  </header>
);

export default Header;
