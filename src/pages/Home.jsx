// src/pages/Home.jsx
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import ListingCard from "../components/ListingCard.jsx";
import { categories as CATEGORIES, topLevelCategories } from "../data/categories.js";
import { listings as LISTINGS_RAW } from "../data/listings.js";

// Veriyi güvenle normalize et
const LISTINGS = (Array.isArray(LISTINGS_RAW) ? LISTINGS_RAW : []).map((it, idx) => ({
  id: it?.id ?? idx,
  title: String(it?.title ?? "İsimsiz İlan"),
  price: Number.isFinite(Number(it?.price)) ? Number(it.price) : 0,
  image: it?.image ?? null,
  location: it?.location ?? "",
  categoryId: it?.categoryId ?? null,
  ...it,
}));

export default function Home() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("price-asc");
  const location = useLocation();

  // URL: /?cat=<id>
  const params = new URLSearchParams(location.search);
  const activeCat = params.get("cat"); // string | null

  // Filtreleme
  const q = (query || "").trim().toLowerCase();
  let results = LISTINGS.filter((it) =>
    String(it.title).toLowerCase().includes(q)
  );

  if (activeCat) {
    results = results.filter(
      (it) => String(it.categoryId) === String(activeCat)
    );
  }

  // Sıralama
  const [key, dir] = String(sort || "price-asc").split("-");
  const factor = dir === "desc" ? -1 : 1;

  results.sort((a, b) => {
    if (key === "title") {
      return String(a.title).localeCompare(String(b.title)) * factor;
    }
    return (Number(a.price) - Number(b.price)) * factor;
  });

  // Ana sayfada göstereceğimiz üst seviye chip'ler
  const TOPS = topLevelCategories();

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 16 }}>
      <h2>Öne Çıkan İlanlar</h2>

      {/* Aktif kategori etiketi */}
      {activeCat && (
        <div style={{ margin: "8px 0", color: "#6b7280", fontSize: 14 }}>
          Aktif kategori:{" "}
          {CATEGORIES.find((c) => String(c.id) === String(activeCat))?.name ||
            activeCat}
        </div>
      )}

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

      {/* Kategori chip'leri (Home'da) */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "8px 0 16px" }}>
        {TOPS.map((c) => (
          <Link
            key={`chip-${c.id}`}
            to={`/?cat=${c.id}`}
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
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
