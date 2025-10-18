// src/pages/NewListing.jsx — Sade & optimize edilmiş “İlan Ver” sayfası
// Not: Bu sürüm, minimum bağımlılık ve basit DOM elemanları kullanır.
// Icon/lucide gibi ağır importlar yok. Kategoriler rootCategories'den select ile gelir.
// İsteğe göre alanları genişletmek kolaydır; temel doğrulamalar dahildir.

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { rootCategories } from "../data/categories"; // [{ title, slug, ... } bekler

export default function NewListing() {
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Kategori seçeneklerini hafifçe ön‑işle
  const categoryOptions = useMemo(() => {
    if (!Array.isArray(rootCategories)) return [];
    return rootCategories.map((c) => ({ label: c.title || c.name || c.slug, value: c.slug }));
  }, []);

  function validate() {
    const e = {};
    if (!title.trim()) e.title = "Başlık zorunlu";
    if (!price || Number(price) <= 0) e.price = "Fiyat 0'dan büyük olmalı";
    if (!category) e.category = "Kategori seçin";
    if (!description.trim()) e.description = "Açıklama zorunlu";
    if (!location.trim()) e.location = "Konum zorunlu";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      // Basit mock: Burada gerçek API çağrısı yapılmalı.
      // Örn: await api.post('/listings', formData)
      await new Promise((r) => setTimeout(r, 800));

      // Başarılıysa: ilan detayına ya da listeye yönlendir
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu. Daha sonra tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-4">İlan Ver</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Başlık */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">Başlık</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Örn: Temiz ikinci el masa"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Fiyat */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="price">Fiyat (₺)</label>
          <input
            id="price"
            type="number"
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Örn: 2500"
            min={0}
            step="0.01"
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="category">Kategori</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Seçiniz…</option>
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        {/* Açıklama */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">Açıklama</label>
          <textarea
            id="description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Ürün durumu, ölçüler, teslimat vb."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Konum */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="location">Konum</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="İl / İlçe"
          />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
        </div>

        {/* Görsel (tek dosya, basit) */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="image">Görsel (isteğe bağlı)</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="block w-full text-sm"
          />
          {imageFile && (
            <p className="mt-1 text-xs text-gray-600">Seçili dosya: {imageFile.name}</p>
          )}
        </div>

        {/* Gönder */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl bg-orange-500 px-4 py-3 text-white font-semibold shadow-sm hover:bg-orange-600 disabled:opacity-60"
          >
            {submitting ? "Gönderiliyor…" : "İlanı Yayınla"}
          </button>
        </div>
      </form>

      {/* Küçük ipucu kutusu */}
      <div className="mt-6 rounded-xl border border-gray-200 p-3 text-sm text-gray-700 bg-gray-50">
        <p>
          Bu sayfa performans için sadeleştirildi. İleride çoklu görsel yükleme, harita/otomatik konum,
          alt kategori ve etiketler gibi gelişmiş alanları eklenecek şekilde kurgulandı.
        </p>
      </div>
    </div>
  );
}
