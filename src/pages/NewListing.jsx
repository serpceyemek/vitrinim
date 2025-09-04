// src/pages/NewListing.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/categories";
console.log("[addLocalListing] run");
import { addLocalListing } from "../services/localListings";

export default function NewListing() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  function saveDraft(e) {
    e.preventDefault();
    const draft = {
      title: title.trim(),
      price: price ? Number(price) : "",
      categoryId,
      desc: desc.trim(),
      image: imageUrl.trim(),
    };
    localStorage.setItem("new_listing_draft", JSON.stringify(draft));
    setMsg("Taslak kaydedildi (localStorage).");
  }

  function loadDraft() {
    const raw = localStorage.getItem("new_listing_draft");
    try {
      const d = raw ? JSON.parse(raw) : null;
      if (!d) return setMsg("Yüklenecek taslak yok.");
      setTitle(d.title ?? "");
      setPrice(d.price ?? "");
      setCategoryId(d.categoryId ?? (categories[0]?.id || ""));
      setDesc(d.desc ?? "");
      setImageUrl(d.image ?? "");
      setMsg("Taslak yüklendi.");
    } catch {
      setMsg("Taslak okunamadı.");
    }
  }

  function clearAll() {
    setTitle("");
    setPrice("");
    setCategoryId(categories[0]?.id || "");
    setDesc("");
    setImageUrl("");
    setMsg("");
    localStorage.removeItem("new_listing_draft");
  }
console.log("[handleSubmit] fired");

  handleSubmit

  const opts = (categories || []).map((c) => ({ id: c.id, label: c.name }));

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>İlan Yayınla</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
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
            {opts.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
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

        <label style={{ display: "grid", gap: 6 }}>
          <span>Görsel URL (opsiyonel)</span>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://placehold.co/640x400?text=İlan"
            style={{ padding: 10, border: "1px solid #e5e7eb", borderRadius: 8 }}
          />
        </label>

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
          <button
            type="button"
            onClick={saveDraft}
            style={{ padding: "10px 14px", borderRadius: 8, background: "#f97316", color: "#fff", border: "none", cursor: "pointer" }}
          >
            Taslağı Kaydet
          </button>

          <button
            type="button"
            onClick={loadDraft}
            style={{ padding: "10px 14px", borderRadius: 8, background: "#eef2ff", border: "1px solid #c7d2fe", cursor: "pointer" }}
          >
            Taslağı Yükle
          </button>

          <button
            type="button"
            onClick={clearAll}
            style={{ padding: "10px 14px", borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb", cursor: "pointer" }}
          >
            Temizle
          </button>

          <button
  type="button"
  onClick={handleSubmit}
  style={{ padding: "10px 14px", borderRadius: 8, background: "#16a34a", color: "#fff", border: "none", cursor: "pointer" }}
>
  Yayınla (yerel)
</button>

        </div>

        {msg && (
          <div style={{ marginTop: 12, padding: 10, border: "1px solid #d1fae5", background: "#ecfdf5", color: "#065f46", borderRadius: 8 }}>
            {msg}
          </div>
        )}
      </form>
    </main>
  );
}
