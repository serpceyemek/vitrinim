// src/pages/Home.jsx
import React, { useState } from "react";
import ListingCard from "../components/ListingCard.jsx";

// 🔧 Named import: data dosyalarında default yoksa bu doğru kullanım
import { categories as CATEGORIES } from "../data/categories.js";
import { listings as LISTINGS_RAW } from "../data/listings.js";

const LISTINGS = (Array.isArray(LISTINGS_RAW) ? LISTINGS_RAW : []).map((it, idx) => ({
  id: it?.id ?? idx,
  title: String(it?.title ?? "İsimsiz İlan"),
  price: Number.isFinite(Number(it?.price)) ? Number(it.price) : 0,
  image: it?.image ?? null,
  ...it,
}));

export default function Home() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("price-asc"); // price-asc | price-desc | title-asc | title-desc

  const q = (query || "").trim().toLowerCase();
  let results = LISTINGS.filter((it) =>
    String(it.title).toLowerCase().includes(q)
  );

  const [key, dir] = String(sort || "price-asc").split("-");
  const factor = dir === "desc" ? -1 : 1;

  results.sort((a, b) => {
    if (key === "title") {
      return String(a.title).localeCompare(String(b.title)) * factor;
    }
    const pa = Number(a.price);
    const pb = Number(b.price);
    return (pa - pb) * factor;
  });

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 16 }}>
      <h2>Öne Çıkan İlanlar</h2>

      <div style={{ display: "flex", gap: 12, margin: "16px 0" }}>
        <input
          placeholder="Ara..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
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
      </div>

      {Array.isArray(CATEGORIES) && CATEGORIES.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {CATEGORIES.map((c, i) => (
            <span key={c?.id || c?.slug || i} style={{ padding: "6px 10px", border: "1px solid #ddd", borderRadius: 8 }}>
              {c?.name || String(c)}
            </span>
          ))}
        </div>
      )}

      {results.length === 0 ? (
        <p>Aramana uygun sonuç bulunamadı.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {results.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
