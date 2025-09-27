// src/pages/Home.jsx
import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import { topLevelCategories } from "../data/categories";
import { useListingPool } from "../data/listings";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/categories";


export default function Home() {
   const navigate = useNavigate(); // ← bunu buraya ekle
   // Home bileşeninin içinde, return'dan önce:
const handleSearchEnter = (e) => {
  if (e.key !== "Enter") return;
  const q = e.currentTarget.value.trim().toLowerCase();
  if (!q) { navigate("/kategori"); return; }
  const cat = categories.find((c) =>
    (c.title || c.name).toLowerCase().includes(q)
  );
  navigate(cat ? `/kategori/${cat.path}` : "/kategori");
};

  const pool = useListingPool();


  // URL'deki ?cat parametresi
  const [sp, setSp] = useSearchParams();
  const catParam = sp.get("cat");
  const catId = catParam ? Number(catParam) : null;

  // Arama & sıralama
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("price_asc"); // price_asc | price_desc | newest

  const filtered = useMemo(() => {
    let arr = [...pool];

    // kategori filtre
    if (catId) {
      arr = arr.filter(
        (l) =>
          l.categoryId === catId ||
          (Array.isArray(l.categoryPath) && l.categoryPath.includes(catId))
      );
    }

    // arama
    const qq = q.trim().toLowerCase();
    if (qq) {
      arr = arr.filter(
        (l) =>
          String(l.title || "").toLowerCase().includes(qq) ||
          String(l.location || "").toLowerCase().includes(qq)
      );
    }

    // sıralama
    if (sort === "price_asc") {
      arr.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === "price_desc") {
      arr.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sort === "newest") {
      arr.sort(
        (a, b) =>
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
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
  onKeyDown={(e) => {
    if (e.key !== "Enter") return;
    const q = e.currentTarget.value.trim().toLowerCase();
    if (!q) { navigate("/kategori"); return; }
    const cat = categories.find((c) =>
      (c.title || c.name).toLowerCase().includes(q)
    );
    navigate(cat ? `/kategori/${cat.path}` : "/kategori");
  }}
/>

          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        /
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        >
          <option value="price_asc">Fiyat (Artan)</option>
          <option value="price_desc">Fiyat (Azalan)</option>
          <option value="newest">En Yeni</option>
        </select>
      </div>

      {/* Kategori çipleri */}
      <div style={{ display: "flex", gap: 10, margin: "14px 0 8px" }}>
        <button
          onClick={() => setSp((prev) => { prev.delete("cat"); return prev; })}
          style={{
            padding: "8px 12px",
            borderRadius: 999,
            border: "1px solid #ddd",
            background: catId ? "#fff" : "#111",
            color: catId ? "#111" : "#fff",
            cursor: "pointer",
          }}
        >
          Tümü
        </button>

        {chips.map((c) => (
          <button
            key={c.id}
            onClick={() => setSp((prev) => { prev.set("cat", String(c.id)); return prev; })}
            style={{
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid #ddd",
              background: catId === c.id ? "#111" : "#fff",
              color: catId === c.id ? "#fff" : "#111",
              cursor: "pointer",
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginTop: 12,
        }}
      >
        {filtered.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}
