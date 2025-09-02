// src/pages/Home.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import listings from "../data/listings";

export default function Home() {
  const [query, setQuery] = useState("");

  // Türkçe’ye duyarlı normalize
  const norm = (s) => (s ?? "").toString().toLocaleLowerCase("tr");
  const q = norm(query);

  // Görsel URL’sindeki ?text=... değerini güvenle al
  const getImageText = (url) => {
    try {
      const u = new URL(url);
      const raw = u.searchParams.get("text") || "";
      return norm(decodeURIComponent(raw));
    } catch {
      return "";
    }
  };

  // Başlık + görsel yazısı + fiyat üzerinde arama (fiyat için yalnızca rakamları kıyasla)
  const filtered = useMemo(() => {
    const qNum = query.replace(/[^\d]/g, ""); // 85.000 -> 85000
    return listings.filter((l) => {
      const title = norm(l.title);
      const imgText = getImageText(l.image);
      const priceMatch = qNum && String(l.price).includes(qNum);
      return title.includes(q) || imgText.includes(q) || priceMatch;
    });
  }, [query]);

  return (
    <main style={{ padding: "1rem" }}>
      <h2>Öne Çıkan İlanlar</h2>

      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          margin: "12px 0",
        }}
      >
        <input
          placeholder="Ara: başlık veya fiyat…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button
          type="button"
          onClick={() => setQuery("")}
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          Temizle
        </button>
      </div>

      {filtered.length === 0 ? (
        <p>Aramana uygun sonuç bulunamadı.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
            marginTop: "12px",
          }}
        >
          {filtered.map((l) => (
            <Link
              key={l.id}
              to={`/listing/${l.id}`}
              state={l}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: 16,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                <img
                  src={l.image}
                  alt={l.title}
                  style={{ width: "100%", borderRadius: 6, display: "block" }}
                />
                <h3 style={{ margin: "12px 0 6px" }}>{l.title}</h3>
                <div>{l.price.toLocaleString("tr-TR")} ₺</div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
