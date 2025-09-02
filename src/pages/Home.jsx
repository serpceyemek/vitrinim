import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import listings from "../data/listings";

export default function Home() {
  const [q, setQ] = useState("");

  // Arama: başlık veya fiyat içerisinde geçenleri bul
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return listings;
    return listings.filter(
      (l) =>
        String(l.title).toLowerCase().includes(s) ||
        String(l.price).includes(s)
    );
  }, [q]);

  return (
    <main style={{ padding: "1rem" }}>
      <h2>Öne Çıkan İlanlar</h2>

      <div style={{ margin: "12px 0 20px" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ara: başlık veya fiyat…"
          style={{
            width: "100%",
            maxWidth: 420,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #cfd8dc",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
