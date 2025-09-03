// src/pages/Category.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import listings from "../data/listings";
import {
  topLevelCategories,
  findCategoryByPath,
  getChildren,
  getBreadcrumbByPath,
  categories,
} from "../data/categories";

function useCategoryPath() {
  const location = useLocation();
  return location.pathname.replace(/^\/c\/?/, "");
}

export default function CategoryPage() {
  const navigate = useNavigate();
  const path = useCategoryPath();

  // Kök: üst kategoriler
  if (!path) {
    return (
      <main style={{ padding: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Kategoriler</h1>
        <CategoryGrid items={topLevelCategories} />
      </main>
    );
  }

  const cat = findCategoryByPath(path);
  if (!cat) {
    return (
      <main style={{ padding: 24 }}>
        <div style={{ marginBottom: 12, fontSize: 14 }}>
          <Link to="/" style={{ color: "#2563eb", textDecoration: "none" }}>Ana sayfa</Link> / <span>Bilinmeyen kategori</span>
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Kategori bulunamadı</h1>
        <p style={{ color: "#555", marginBottom: 16 }}>
          Aradığınız kategori mevcut değil veya taşınmış olabilir.
        </p>
        <button
          onClick={() => navigate(-1)}
          style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: 6, background: "#fff", cursor: "pointer" }}
        >
          Geri dön
        </button>
      </main>
    );
  }

  const crumbs = getBreadcrumbByPath(cat.path);
  const children = getChildren(cat.id);

  // Bu kategori + alt dalları
  function getDescendantIds(rootId) {
    const ids = [rootId];
    const q = [rootId];
    while (q.length) {
      const cur = q.shift();
      for (const c of categories) {
        if (c.parentId === cur) { ids.push(c.id); q.push(c.id); }
      }
    }
    return ids;
  }
  const allowed = new Set(getDescendantIds(cat.id));
  const filtered = listings.filter((l) => allowed.has(l.categoryId));

  return (
    <main style={{ padding: 24 }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: 12, fontSize: 14 }}>
        <Link to="/" style={{ color: "#2563eb", textDecoration: "none" }}>Ana sayfa</Link>
        <span> / </span>
        <Link to="/c" style={{ color: "#2563eb", textDecoration: "none" }}>Kategoriler</Link>
        {crumbs.map((c, i) => (
          <span key={c.id}>
            <span> / </span>
            {i === crumbs.length - 1 ? (
              <span style={{ fontWeight: 600 }}>{c.name}</span>
            ) : (
              <Link to={`/c/${c.path}`} style={{ color: "#2563eb", textDecoration: "none" }}>{c.name}</Link>
            )}
          </span>
        ))}
      </nav>

      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>{cat.name}</h1>

      {/* Alt kategoriler */}
      {children.length > 0 ? (
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Alt Kategoriler</h2>
          <CategoryGrid items={children} />
        </section>
      ) : (
        <div style={{ border: "1px solid #eee", padding: 16, borderRadius: 8, background: "#fff", marginBottom: 24 }}>
          <p style={{ color: "#555" }}>Bu kategorinin alt kategorisi bulunmuyor.</p>
        </div>
      )}

      {/* İlanlar */}
      <section style={{ border: "1px solid #eee", padding: 16, borderRadius: 8, background: "#fff" }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>İlanlar</h2>
        {filtered.length === 0 ? (
          <p style={{ color: "#555" }}>Bu kategoride ilan bulunamadı.</p>
        ) : (
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
            {filtered.map((item) => (
              <Link
                key={item.id}
                to={`/listing/${item.id}`}
                style={{ display: "block", border: "1px solid #eee", padding: 16, borderRadius: 8, background: "#fff", textDecoration: "none", color: "inherit" }}
              >
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#555" }}>
                  {Number(item.price).toLocaleString("tr-TR")} ₺
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function CategoryGrid({ items }) {
  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
      {items.map((c) => (
        <Link
          key={c.id}
          to={`/c/${c.path}`}
          style={{
            display: "block",
            border: "1px solid #eee",
            padding: 16,
            borderRadius: 8,
            background: "#fff",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div style={{ fontSize: 12, color: "#999" }}>{c.path}</div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{c.name}</div>
        </Link>
      ))}
    </div>
  );
}
