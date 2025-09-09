// src/pages/Home.jsx
import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import { useListingPool } from "../data/listings";
import { topLevelCategories } from "../data/categories";

export default function Home() {
  // Arama & sıralama (kontrollü)
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("priceAsc"); // priceAsc | priceDesc | newest

  // URL'den kategori (?cat=ID)
  const [params] = useSearchParams();
  const catParam = params.get("cat");
  const catId = catParam ? Number(catParam) : null;

  // Tüm ilanlar (seed + localStorage), her durumda dizi
  const basePool = useListingPool();
  const pool = Array.isArray(basePool) ? basePool : [];

  // Listeyi hesapla (filtre + arama + sıralama)
  const filtered = useMemo(() => {
    let arr = pool;

    // kategori filtresi
    if (catId) {
      arr = arr.filter((l) => {
        const path = Array.isArray(l?.categoryPath)
          ? l.categoryPath
          : l?.categoryId
          ? [l.categoryId]
          : [];
        return path.map(Number).includes(catId);
      });
    }

    // arama
    const s = q.trim().toLowerCase();
    if (s) {
      arr = arr.filter((l) => String(l?.title ?? "").toLowerCase().includes(s));
    }

    // sıralama
    if (sort === "priceAsc") {
      arr = [...arr].sort((a, b) => (a?.price ?? 0) - (b?.price ?? 0));
    } else if (sort === "priceDesc") {
      arr = [...arr].sort((a, b) => (b?.price ?? 0) - (a?.price ?? 0));
    } else if (sort === "newest") {
      arr = [...arr].sort(
        (a, b) =>
          new Date(b?.postedAt || 0).getTime() -
          new Date(a?.postedAt || 0).getTime()
      );
    }

    return arr;
  }, [pool, catId, q, sort]);

  // Chip stilleri
  const chipBase = {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: 12,
    border: "1px solid #ddd",
    textDecoration: "none",
    color: "#222",
    lineHeight: 1.1,
  };
  const chipActive = { background: "#111", color: "#fff", borderColor: "#111" };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ marginBottom: 12 }}>Öne Çıkan İlanlar</h1>

      {/* Arama + Sıralama */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input
          type="search"
          placeholder="Ara..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
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
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        >
          <option value="priceAsc">Fiyat (Artan)</option>
          <option value="priceDesc">Fiyat (Azalan)</option>
          <option value="newest">En Yeni</option>
        </select>
      </div>

      {/* Kategori çipleri */}
      <div style={{ display: "flex", gap: 12, margin: "16px 0 24px", flexWrap: "wrap" }}>
        <Link
          to="/"
          style={{ ...chipBase, ...(catId == null ? chipActive : null) }}
        >
          Tümü
        </Link>
        {topLevelCategories().map((c) => (
          <Link
            key={c.id}
            to={`/?cat=${c.id}`}
            style={{ ...chipBase, ...(catId === c.id ? chipActive : null) }}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Liste */}
      {filtered.length === 0 ? (
        <p style={{ marginTop: 12, color: "#666" }}>
          Gösterilecek ilan bulunamadı.
        </p>
      ) : null}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 16,
          marginTop: 16,
        }}
      >
        {filtered.slice(0, 30).map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}
