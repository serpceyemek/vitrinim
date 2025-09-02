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
      {/* Sayfa içi stil (hover) */}
      <style>{`
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-top: 12px; }
        .card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; 
                box-shadow: 0 1px 2px rgba(0,0,0,0.04); background:#fff;
                transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
        .card:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(0,0,0,0.10); border-color:#d1d5db; }
        .card img { width: 100%; height: 180px; object-fit: cover; border-radius: 8px; display:block; transition: transform .25s ease; }
        .card:hover img { transform: scale(1.02); }
        .title { margin: 12px 0 6px; font-weight: 700; font-size: 1.05rem; color:#111827; }
        .price { color:#374151; font-weight:600; }
        .controls { display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin:12px 0; }
        .search { flex: 1 1 280px; padding: 8px; border:1px solid #e5e7eb; border-radius:8px; }
        .btn { padding:8px 12px; cursor:pointer; border:none; border-radius:8px; background:#f3f4f6; }
        .btn:hover { background:#e5e7eb; }
        .label { margin-left:auto; font-weight:600; display:flex; align-items:center; gap:8px; }
        select { padding:8px; border:1px solid #e5e7eb; border-radius:8px; background:#fff; }
      `}</style>

      <h2>Öne Çıkan İlanlar</h2>

      {/* Arama + Sıralama */}
      <div className="controls">
        <input
          className="search"
          placeholder="Ara: başlık ya da fiyat…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="button" className="btn" onClick={() => setQuery("")}>
          Temizle
        </button>

        <label className="label">
          Sırala:
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
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
        <div className="grid">
          {sorted.map((l) => (
            <Link
              key={l.id}
              to={`/listing/${l.id}`}
              state={l}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article className="card" role="group" aria-label={l.title}>
                <img src={l.image} alt={l.title} />
                <h3 className="title">{l.title}</h3>
                <div className="price">
                  {Number(l.price).toLocaleString("tr-TR")} ₺
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
