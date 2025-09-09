// src/pages/Category.jsx
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import {
  findCategoryByPath,
  getBreadcrumbByPath,
} from "../data/categories";
import { useListingPool } from "../data/listings";

export default function Category() {
  const { path } = useParams();
  const pool = useListingPool();

  const cat = findCategoryByPath(path);
  const breadcrumb = getBreadcrumbByPath(path);

  const items = useMemo(() => {
    if (!cat) return [];
    return pool.filter(
      (l) =>
        l.categoryId === cat.id ||
        (Array.isArray(l.categoryPath) && l.categoryPath.includes(cat.id))
    );
  }, [pool, cat]);

  if (!cat) {
    return (
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        <h2>Kategori bulunamadı</h2>
        <Link to="/">Ana sayfaya dön</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: 12, fontSize: 14 }}>
        <Link to="/" style={{ color: "#06c" }}>
          Ana Sayfa
        </Link>{" "}
        /{" "}
        {breadcrumb.map((b, i) => (
          <span key={b.id}>
            {i > 0 && " / "}
            <Link to={`/kategori/${b.path}`} style={{ color: "#06c" }}>
              {b.name}
            </Link>
          </span>
        ))}
      </div>

      <h1 style={{ marginBottom: 8 }}>{cat.name}</h1>
      <div style={{ color: "#666", marginBottom: 16 }}>
        {items.length} ilan listeleniyor
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        {items.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>

      {items.length === 0 && (
        <div style={{ marginTop: 24, color: "#666" }}>
          Gösterilecek ilan bulunamadı.
        </div>
      )}
    </div>
  );
}
