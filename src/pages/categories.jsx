// src/pages/categories.jsx
import React from "react";
import { Link } from "react-router-dom";
import { categories, topLevelCategories } from "../data/categories.js";

export default function Categories() {
  const tops = topLevelCategories();

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 16 }}>
      <h2>Kategoriler</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 12,
          marginTop: 16,
        }}
      >
        {tops.map((c) => (
          <Link
            key={c.id}
            to={`/?cat=${c.id}`}   // ← Ana sayfaya filtreli geçiş
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 14,
              textDecoration: "none",
              color: "inherit",
              background: "#fff",
            }}
          >
            <div style={{ fontWeight: 600 }}>{c.name}</div>
          </Link>
        ))}
      </div>

      <h3 style={{ marginTop: 24 }}>Tüm kategoriler</h3>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
        {categories.map((c) => (
          <Link
            key={`chip-${c.id}`}
            to={`/?cat=${c.id}`}   // ← chip’ler de filtreli açar
            style={{
              padding: "6px 10px",
              border: "1px solid #e5e7eb",
              borderRadius: 999,
              textDecoration: "none",
              color: "inherit",
              background: "#fff",
              fontSize: 13,
            }}
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
