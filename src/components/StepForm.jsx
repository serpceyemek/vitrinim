import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StepForm({ category, subCategory, onBack }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]); // çoklu görsellerin listesi

  const catLabel = useMemo(
    () =>
      [category?.title || category?.name, subCategory?.title || subCategory?.name]
        .filter(Boolean)
        .join(" / "),
    [category, subCategory]
  );
function handleImageChange(e) {
  const files = Array.from(e.target.files);
  const previews = files.map((file) => URL.createObjectURL(file));
  setImages(previews);
}

function removeImage(index) {
  setImages((prev) => prev.filter((_, i) => i !== index));
}

  function validate() {
    const e = {};
    if (!title.trim()) e.title = "Başlık zorunlu";
    if (!price || Number(price) <= 0) e.price = "Fiyat 0'dan büyük olmalı";
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
      // TODO: API entegrasyonu
      await new Promise((r) => setTimeout(r, 700));
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu. Tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={onBack}
          className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
        >
          ← Geri
        </button>
        <div className="text-sm text-gray-600">
          {catLabel ? `Seçim: ${catLabel}` : "Kategori seçimi"}
        </div>
      </div>

      <h1 className="text-2xl font-semibold tracking-tight mb-4">İlan Ver</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="mb-6">
  <label className="block text-sm font-medium mb-1" htmlFor="images">
    Görseller (birden fazla seçebilirsiniz)
  </label>
  <input
    id="images"
    type="file"
    multiple
    accept="image/*"
    onChange={handleImageChange}
    className="block w-full text-sm border border-gray-300 rounded-xl p-2"
  />

  {images.length > 0 && (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-3">
      {images.map((src, i) => (
        <div key={i} className="relative group">
          <img
            src={src}
            alt={`preview-${i}`}
            className="w-full h-24 object-cover rounded-lg border border-gray-200 shadow-sm"
          />
          <button
            type="button"
            onClick={() => removeImage(i)}
            className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            title="Kaldır"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )}
</div>


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
    </div>
  );
}
