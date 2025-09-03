// src/pages/NewListing.jsx
import React, { useState } from "react";
import { categories } from "../data/categories";

export default function NewListing() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");   // <-- YENİ
  const [msg, setMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setMsg("");
    if (!title.trim()) return setMsg("Başlık gerekli.");
    if (!price || isNaN(Number(price))) return setMsg("Geçerli bir fiyat gir.");
    if (!categoryId) return setMsg("Kategori seç.");

    const draft = {
      title: title.trim(),
      price: Number(price),
      categoryId,
      desc: desc.trim(),
      image: imageUrl.trim(),  // <-- YENİ
    };
    localStorage.setItem("new_listing_draft", JSON.stringify(draft));
    setMsg("Taslak kaydedildi (localStorage).");
  };

  const loadDraft = () => {
    const raw = localStorage.getItem("new_listing_draft");
    if (!raw) return setMsg("Yüklenecek taslak bulunamadı.");
    try {
      const d = JSON.parse(raw);
      setTitle(d.title ?? "");
      setPrice(d.price ?? "");
      setCategoryId(d.categoryId ?? "");
      setDesc(d.desc ?? "");
      setImageUrl(d.image ?? ""); // <-- YENİ
      setMsg("Taslak yüklendi.");
    } catch {
      setMsg("Taslak okunamadı.");
    }
  };

  const clearAll = () => {
    setTitle(""); setPrice(""); setCategoryId(""); setDesc(""); setImageUrl(""); setMsg(""); // <-- YENİ
    localStorage.removeItem("new_listing_draft");
  };

  const opts = categories.map((c) => ({ id: c.id, label: c.name }));

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>İlan Yayınla</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Başlık *</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Örn: Temiz kullanılmış otomobil"
            style={{ padding: 10, border: "1px solid #e5e7eb", borderRadius: 8 }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Fiyat (₺) *</span>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputMode="numeric"
            placeholder="Örn: 85000"
            style={{ padding: 10, border: "1px solid #e5e7eb", borderRadius: 8 }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Kategori *</span>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            style={{ padding: 10, border: "1px solid #e5e7eb", borderRadius: 8, background: "#fff" }}
          >
            <option value="">Seçiniz…</option>
            {opts.map((o) => (
              <option key={o.id} value={o.id}>{o.label}</option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Açıklama</span>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            placeholder="Kısa açıklama…"
            style={{ padding: 10, border: "1px solid #e5e7eb", borderRadius: 8 }}
          />
        </label>

        {/* YENİ: Görsel URL alanı */}
        <label style={{ display: "grid", gap: 6 }}>
          <span>Görsel URL (opsiyonel)</span>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Örn: https://placehold.co/640x400?text=İlan"
            style={{ padding: 10, border: "1px solid #e5e7eb", borderRadius: 8 }}
          />
        </label>

        {/* YENİ: Canlı önizleme */}
        {imageUrl ? (
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 10 }}>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>Önizleme</div>
            <img
              src={imageUrl}
              alt="Önizleme"
              style={{ width: "100%", maxHeight: 260, objectFit: "cover", borderRadius: 6 }}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        ) : null}

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="submit" style={{ padding: "10px 14px", borderRadius: 8, background: "#f97316", color: "#fff", border: "none", cursor: "pointer" }}>
            Taslağı Kaydet
          </button>
          <button type="button" onClick={loadDraft} style={{ padding: "10px 14px", borderRadius: 8, background: "#eef2ff", border: "1px solid #c7d2fe", cursor: "pointer" }}>
            Taslağı Yükle
          </button>
          <button type="button" onClick={clearAll} style={{ padding: "10px 14px", borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb", cursor: "pointer" }}>
            Temizle
          </button>
        </div>

        {msg && (
          <div style={{ color: "#065f46", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: 10, borderRadius: 8 }}>
            {msg}
          </div>
        )}
      </form>
    </main>
  );
}
