import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import CATS from "../data/categories";
import SEED_LISTINGS from "../data/listings";
import ListingCard from "../components/ListingCard";
import { readLocalListings } from "../services/localListings";

// Yardımcılar
const formatPrice = (n) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" });

// Statik + Yerel birleşik havuz (aynı id varsa yerel kazanır)
function useListingPool() {
  const local = readLocalListings();

  // Aynı id çakışmasında yerel kayıt öne geçsin
  const map = new Map();
  // önce statikler
  for (const it of SEED_LISTINGS) map.set(it.id, it);
  // sonra yerel ekler (aynı id'yi override eder)
  for (const it of local) map.set(it.id, it);

  return Array.from(map.values());
}

export default function Category() {
  const { slug } = useParams();           // /category/:slug
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState("price");
  const [dir, setDir] = useState("asc");  // asc | desc

  const pool = useListingPool();

  const cat = useMemo(
    () => CATS.find((c) => c.slug === slug) || { name: "Kategori", slug },
    [slug]
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();

    let arr = pool.filter((l) => l.category === cat.name || l.categorySlug === slug);

    if (needle) {
      arr = arr.filter((l) => {
        const hay = [
          l.title,
          l.price?.toString(),
          l.location,
          l.category,
          l.description,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(needle);
      });
    }

    // sıralama
    arr.sort((a, b) => {
      const A = sortKey === "price" ? Number(a.price || 0) : new Date(a.postedAt || 0).getTime();
      const B = sortKey === "price" ? Number(b.price || 0) : new Date(b.postedAt || 0).getTime();
      return dir === "asc" ? A - B : B - A;
    });

    return arr;
  }, [pool, cat.name, slug, q, sortKey, dir]);

  return (
    <div className="container" style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
      <nav style={{ marginBottom: 12 }}>
        <Link to="/">Ana sayfa</Link> <span style={{ opacity: 0.6 }}>/</span> <strong>{cat.name}</strong>
      </nav>

      <header style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>{cat.name}</h2>
        <span style={{ opacity: 0.6 }}>|</span>
        <input
          placeholder="Ara: başlık, konum, fiyat…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ flex: 1, minWidth: 240, padding: "10px 12px", border: "1px solid #ddd", borderRadius: 8 }}
        />
        <button onClick={() => setQ("")} style={{ padding: "10px 12px" }}>
          Temizle
        </button>

        <label style={{ marginLeft: "auto" }}>
          Sırala:
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            style={{ marginLeft: 6, padding: "8px 10px" }}
          >
            <option value="price">Fiyat</option>
            <option value="date">Tarih</option>
          </select>
        </label>
        <select value={dir} onChange={(e) => setDir(e.target.value)} style={{ padding: "8px 10px" }}>
          <option value="asc">Artan</option>
          <option value="desc">Azalan</option>
        </select>
      </header>

      <p style={{ marginTop: -8, marginBottom: 18, opacity: 0.7 }}>
        Bulunan ilan: <strong>{filtered.length}</strong>
      </p>

      {filtered.length === 0 ? (
        <div style={{ padding: 24, border: "1px dashed #ccc", borderRadius: 12 }}>
          Bu kategoride sonuç bulunamadı. Arama terimini değiştirmeyi deneyebilirsin.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {filtered.map((l) => (
            <ListingCard
              key={l.id}
              id={l.id}
              title={l.title}
              image={l.image}
              priceLabel={formatPrice(Number(l.price || 0))}
              location={l.location}
              dateLabel={formatDate(l.postedAt || new Date().toISOString())}
              isFeatured={Boolean(l.isFeatured)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
