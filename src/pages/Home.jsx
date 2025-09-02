import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import listings from "../data/listings";

export default function Home() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return listings;
    return listings.filter(
      (l) =>
        String(l.title).toLowerCase().includes(s) ||
        String(l.price).includes(s),
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
          gap: "16px",
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
              <h3 style={{ margin: "12px 6px 4px" }}>{l.title}</h3>
              <div style={{ margin: "0 6px", color: "#374151" }}>
                {l.price.toLocaleString("tr-TR")} ₺
              </div>
            </article>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p style={{ opacity: 0.7 }}>Aramana uygun sonuç bulunamadı.</p>
        )}
      </div>
    </main>
  );
}
