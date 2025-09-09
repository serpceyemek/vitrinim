// src/pages/Home.jsx
import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import { useListingPool } from "../data/listings";
import { topLevelCategories } from "../data/categories";

export default function Home() {
  // kontrollü input/select
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("priceAsc");

  // kategori (?cat=ID)
  const [params] = useSearchParams();
  const catParam = params.get("cat");
  const catId = catParam ? Number(catParam) : null;

  // >>> burası kritik: her durumda dizi olsun
  const basePool = useListingPool();
  const pool = Array.isArray(basePool) ? basePool : [];

  const filtered = useMemo(() => {
    let arr = pool;

    if (catId) {
      arr = arr.filter((l) => {
        const path = Array.isArray(l.categoryPath)
          ? l.categoryPath
          : l.categoryId
          ? [l.categoryId]
          : [];
        return path.map(Number).includes(catId);
      });
    }

    const qNorm = q.trim().toLowerCase();
    if (qNorm) {
      arr = arr.filter((l) => (l.title || "").toLowerCase().includes(qNorm));
    }

    if (sort === "priceAsc") {
      arr = [...arr].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort === "priceDesc") {
      arr = [...arr].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sort === "newest") {
      arr = [...arr].sort(
        (a, b) => new Date(b.postedAt) - new Date(a.postedAt)
      );
    }

    return arr;
  }, [pool, catId, q, sort]);

  const chips = topLevelCategories();

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ marginBottom: 12 }}>Öne Çıkan İlanlar</h1>

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

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
        {chips.map((c) => (
          <Link
            key={c.id}
            to={`/?cat=${c.id}`}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: 999,
              textDecoration: "none",
              color: "#333",
              background: catId === c.id ? "#eef6ff" : "#fff",
            }}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* liste boşsa mesaj göster */}
      {filtered.length === 0 ? (
        <p style={{ marginTop: 24, color: "#666" }}>
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
        {filtered.slice(0, 12).map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}
