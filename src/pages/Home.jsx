// src/pages/Home.jsx
import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { categories } from "../data/categories";
import { useListingPool } from "../data/listings";
import ListingCard from "../components/ListingCard";

export default function Home() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCat = params.get("cat"); // /?cat=5 gibi

  const [q, setQ] = useState("");
  const [sort, setSort] = useState("price-asc"); // price-asc | price-desc | newest

  // ---- GÜVENLİ HAVUZ (beyaz ekran/sabitlenme koruması)
  const pool = useListingPool() || [];
  const safePool = Array.isArray(pool) ? pool : [];

  // ---- Filtre + Sıralama (güvenli)
  const filtered = useMemo(() => {
    let arr = safePool.slice();

    // Kategori filtresi (categoryPath veya categoryId üzerinden)
    if (selectedCat) {
      const cid = Number(selectedCat);
      arr = arr.filter((l) =>
        Array.isArray(l?.categoryPath)
          ? l.categoryPath.includes(cid)
          : String(l?.categoryId) === String(cid)
      );
    }

    // Arama
    if (q.trim()) {
      const s = q.toLowerCase();
      arr = arr.filter((l) => String(l?.title ?? "").toLowerCase().includes(s));
    }

    // Sıralama
    if (sort === "price-asc") {
      arr.sort((a, b) => (a?.price ?? 0) - (b?.price ?? 0));
    } else if (sort === "price-desc") {
      arr.sort((a, b) => (b?.price ?? 0) - (a?.price ?? 0));
    } else if (sort === "newest") {
      arr.sort(
        (a, b) =>
          new Date(b?.postedAt || 0).getTime() -
          new Date(a?.postedAt || 0).getTime()
      );
    }

    return arr;
  }, [safePool, selectedCat, q, sort]);

  // İsteğe bağlı: 6 öğeyle sınırla (özel istek vardı)
  const toShow = filtered.slice(0, 6);

  return (
    <div style={{ padding: "32px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 16 }}>Öne Çıkan İlanlar</h2>

      {/* Arama + Sıralama */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ara..."
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
        >
          <option value="price-asc">Fiyat (Artan)</option>
          <option value="price-desc">Fiyat (Azalan)</option>
          <option value="newest">En Yeni</option>
        </select>
      </div>

      {/* Üst seviye kategori çipleri */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {categories
          .filter((c) => !c.parentId)
          .map((c) => {
            const active = String(selectedCat) === String(c.id);
            return (
              <Link
                key={c.id}
                to={active ? "/" : `/?cat=${c.id}`}
                style={{
                  padding: "8px 12px",
                  borderRadius: 12,
                  border: "1px solid #ddd",
                  background: active ? "#f0f0f0" : "white",
                  textDecoration: "none",
                  color: "#222",
                  fontSize: 14,
                }}
              >
                {c.name}
              </Link>
            );
          })}
      </div>

      {/* Kartlar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 16,
        }}
      >
        {toShow.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}
