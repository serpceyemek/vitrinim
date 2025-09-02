// src/pages/Home.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import listings from "../data/listings";

export default function Home() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(""); // "", priceAsc, priceDesc, titleAsc

  // Türkçe’ye duyarlı normalize
  const norm = (s) => (s ?? "").toString().toLocaleLowerCase("tr");
  const q = norm(query);

  // Görsel URL’sindeki ?text=... değerini güvenle al
  const getImageText = (url) => {
    try {
      const u = new URL(url);
      const raw = u.searchParams.get("text") || "";
      return norm(decodeURIComponent(raw));
    } catch {
      return "";
    }
  };

  // Filtre: başlık + görsel yazısı + fiyat; "ilan" yazılırsa tüm sonuçlar
  const filtered = useMemo(() => {
    const qNum = query.replace(/[^\d]/g, ""); // 85.000 -> 85000
    const isGeneric = q.includes("ilan");
    if (isGeneric) return listings;

    return listings.filter((l) => {
      const title = norm(l.title);
      const imgText = getImageText(l.image);
      const priceMatch = qNum && String(l.price).includes(qNum);
      return title.includes(q) || imgText.includes(q) || priceMatch;
    });
  }, [q, query]);

  // Sıralama
  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortKey) {
      case "priceAsc":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        arr.sort((a, b) => b.price - a.price);
        break;
      case "titleAsc":
        arr.sort((a, b) => norm(a.title).localeCompare(norm(b.title), "tr"));
        break;
      default:
        // dokunma
        break;
    }
    return arr;
  }, [filtered, sortKey]);

  return (
    <main style={{ padding: "1rem" }}>
      <h2>Öne Çıkan İlanlar</h2>

      {/* Arama + Temizle + Sırala */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 8,
          alignItems: "center",
          margin: "12px 0",
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            placeholder="Ara: başlık veya fiyat…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, padding: 8, minWidth: 220 }}
          />
          <button
            type="button"
            onClick={() => setQuery("")}
            style={{ padding: "8px 12px", cursor: "pointer" }}
          >
            Temizle
          </button>
        </div>

        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          style={{ padding: 8 }}
          aria-label="Sırala"
        >
          <option value="">Sırala: Varsayılan</option>
          <option value="priceAsc">Fiyat (Artan)</option>
          <option value="priceDesc">Fiyat (Azalan)</option>
          <option value="titleAsc">Başlık (A→Z)</option>
        </select>
      </div>

      {/* Sonuç sayacı */}
      <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 10 }}>
        {q ? (
          <>
            “{query}” için <strong>{sorted.length}</strong> sonuç
          </>
        ) : (
          <>
            Toplam <strong>{sorted.length}</strong> ilan
          </>
        )}
      </div>

      {sorted.length === 0 ? (
        <p>Aramana uygun sonuç bulunamadı.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
            marginTop: "12px",
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
                  style={{ width: "100%", borderRadius: 6, display: "block" }}
                />
                <h3 style={{ margin: "12px 0 6px" }}>{l.title}</h3>
                <div>{l.price.toLocaleString("tr-TR")} ₺</div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
