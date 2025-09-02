// src/pages/Home.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import listings from "../data/listings";

export default function Home() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("price-asc"); // price-asc | price-desc | title-asc | title-desc

  const norm = (s) => (s ?? "").toString().toLocaleLowerCase("tr");
  const q = norm(query);

  const getImageText = (url) => {
    try {
      const u = new URL(url);
      const raw = u.searchParams.get("text") || "";
      return norm(decodeURIComponent(raw));
    } catch {
      return "";
    }
  };

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const title = norm(l.title);
      const imgText = getImageText(l.image);
      const priceMatch = String(l.price).includes(query.trim());
      return title.includes(q) || imgText.includes(q) || priceMatch;
    });
  }, [q, query]);

  const sorted = useMemo(() => {
    const arr = filtered.slice();
    arr.sort((a, b) => {
      if (sort.startsWith("price")) {
        const av = Number(a.price) || 0;
        const bv = Number(b.price) || 0;
        return sort === "price-asc" ? av - bv : bv - av;
      } else {
        // title-asc / title-desc
        const cmp = a.title.toLocaleCompare(b.title, "tr", {
          sensitivity: "base",
        });
        return sort === "title-asc" ? cmp : -cmp;
      }
    });
    return arr;
  }, [filtered, sort]);

  return (
    <main style={{ padding: "1rem" }}>
      <h2>Öne Çıkan İlanlar</h2>

      {/* Arama + Sıralama */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
          margin: "12px 0",
        }}
      >
        <input
          placeholder="Ara: başlık ya da fiyat…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: "1 1 280px", padding: 8 }}
        />
        <button
          type="button"
          onClick={() => setQuery("")}
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          Temizle
        </button>

        <label style={{ marginLeft: "auto" }}>
          <span style={{ marginRight: 8, fontWeight: 600 }}>Sırala:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{ padding: 8 }}
          >
            <option value="price-asc">Fiyat (Artan)</option>
            <option value="price-desc">Fiyat (Azalan)</option>
            <option value="title-asc">Başlık (A→Z)</option>
            <option value="title-desc">Başlık (Z→A)</option>
          </select>
        </label>
      </div>

      {sorted.length === 0 ? (
        <p>Aramana uygun sonuç bulunamadı.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
            marginTop: 12,
          }}
        >
          {sorted.map((l) => (
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
                  style={{
                    width: "100%",
                    height: 160,
                    objectFit: "cover",
                    borderRadius: 6,
                    display: "block",
                  }}
                />
                <h3 style={{ margin: "12px 0 6px" }}>{l.title}</h3>
                <div>{Number(l.price).toLocaleString("tr-TR")} ₺</div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
