// src/pages/Home.jsx
import React, { useMemo, useState } from "react";
import ListingCard from "../components/ListingCard.jsx";

// Güvenli import: default ya da named export fark etmez
import * as categoriesMod from "../data/categories.js";
import * as listingsMod from "../data/listings.js";

// Modülün içinden dizi olan alanı güvenle çek
const CATEGORIES =
  (Array.isArray(categoriesMod.default) && categoriesMod.default) ||
  (Array.isArray(categoriesMod.categories) && categoriesMod.categories) ||
  [];
const LISTINGS =
  (Array.isArray(listingsMod.default) && listingsMod.default) ||
  (Array.isArray(listingsMod.listings) && listingsMod.listings) ||
  [];

export default function Home() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("price-asc"); // "price-asc" | "price-desc" | "title-asc" | "title-desc"

  // Filtre + sıralama (güvenli)
  const results = useMemo(() => {
    const q = (query || "").trim().toLowerCase();

    // Çalışacağımız kopya
    let arr = Array.isArray(LISTINGS) ? [...LISTINGS] : [];

    if (q) {
      arr = arr.filter((it) =>
        String(it?.title || "").toLowerCase().includes(q)
      );
    }

    const [key, dir] = String(sort || "price-asc").split("-");
    const factor = dir === "desc" ? -1 : 1;

    arr.sort((a, b) => {
      if (key === "title") {
        return String(a?.title || "").localeCompare(String(b?.title || "")) * factor;
      }
      // varsayılan price
      const pa = Number(a?.price ?? Number.POSITIVE_INFINITY);
      const pb = Number(b?.price ?? Number.POSITIVE_INFINITY);
      return (pa - pb) * factor;
    });

    return arr;
  }, [query, sort]);

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 16 }}>
      <h2>Öne Çıkan İlanlar</h2>

      {/* Arama + Sıralama */}
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

      {/* Kategori çubuğu (varsa) */}
      {CATEGORIES.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {CATEGORIES.map((c) => (
            <span key={c?.id || c?.slug || c} style={{ padding: "6px 10px", border: "1px solid #ddd", borderRadius: 8 }}>
              {c?.name || String(c)}
            </span>
          ))}
        </div>
      )}

      {/* İlan listesi */}
      {results.length === 0 ? (
        <p>Aramana uygun sonuç bulunamadı.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {results.map((item) => (
            <ListingCard key={item?.id || item?.title} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
