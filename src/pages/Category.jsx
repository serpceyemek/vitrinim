import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { SEED_LISTINGS as seedListings } from "../data/listings";
import { categories } from "../data/categories";
import { getLocalListings } from "../services/localListings";
import NotFound from "./NotFound";

export default function Category() {
  const { path } = useParams();

  // İlan havuzu: seed + localStorage (ID'ye göre benzersizleştir)
  const pool = useMemo(() => {
    const base = Array.isArray(seedListings) ? seedListings : [];
    let local = [];
    try { local = typeof getLocalListings === "function" ? getLocalListings() : []; } catch {}
    const byId = new Map();
    [...base, ...local].forEach((x) => { if (x && x.id != null) byId.set(String(x.id), x); });
    return Array.from(byId.values());
  }, []);

  // 1) /kategori  → tüm kategorileri göster
  if (!path) {
    return (
      <main style={{ padding: 16 }}>
        <h1>Kategoriler</h1>
        <ul style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12, listStyle: "none", padding: 0
        }}>
          {categories.map((cat) => (
            <li key={cat.id} style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
              <Link to={`/kategori/${cat.path}`} style={{ textDecoration: "none" }}>
                <strong>{cat.title || cat.name}</strong>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    );
  }

  // 2) /kategori/:path → ilgili kategoriyi bul ve ilanları listele
  const category = categories.find((c) => String(c.path) === String(path));
  if (!category) {
    return (
      <main style={{ padding: 16 }}>
        <h1>Kategori bulunamadı</h1>
        <p><Link to="/">Ana sayfaya dön</Link></p>
      </main>
    );
  }

  const items = pool.filter(
    (x) => Array.isArray(x.categoryPath) && x.categoryPath.includes(category.id)
  );

  return (
    <main style={{ padding: 16 }}>
      <h1>{category.title || category.name}</h1>
      {items.length === 0 ? (
        <p>Bu kategoride ilan yok.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item) => (
            <li key={item.id} style={{ padding: "8px 0" }}>
              <Link to={`/ilan/${item.id}`}>
                {item.title || "İlan"} — ₺{item.price}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
