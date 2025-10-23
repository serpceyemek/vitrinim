import React, { useEffect, useState, useRef } from "react";

export default function StepForm({ category, subCategory, onBack, onSubmit }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_IMAGES = 8;
  const MAX_MB = 5;

  const catLabel =
    subCategory?.title ||
    subCategory?.name ||
    category?.title ||
    category?.name ||
    "";

  // Taslak yükleme
  useEffect(() => {
    try {
      const draft = localStorage.getItem("draftListing");
      if (draft) {
        const data = JSON.parse(draft);
        setTitle(data.title || "");
        setPrice(data.price || "");
        setDescription(data.description || "");
        setLocation(data.location || "");
      }
    } catch (err) {
      console.warn("Taslak okunamadı:", err);
    }
  }, []);

  // Görsel seçme
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter(
      (f) => f.size / 1024 / 1024 <= MAX_MB
    );

    if (validFiles.length + images.length > MAX_IMAGES) {
      alert(`En fazla ${MAX_IMAGES} görsel yükleyebilirsiniz.`);
      return;
    }

    const newImages = validFiles.map((file) => ({
      id: `${Date.now()}_${file.name}`,
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    fileInputRef.current.value = "";
  };

  // Görsel silme
  const handleRemoveImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Taslak kaydetme
  const handleSaveDraft = () => {
    const payload = {
      title,
      price,
      description,
      location,
      category: category?.name,
      subCategory: subCategory?.name,
    };
    localStorage.setItem("draftListing", JSON.stringify(payload));
    alert("Taslak olarak kaydedildi.");
  };

  // Form gönderme
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price) return alert("Başlık ve fiyat zorunludur.");
    setSubmitting(true);

    try {
      const payload = {
        title,
        price,
        description,
        location,
        images,
        category,
        subCategory,
      };
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        console.log("İlan gönderildi:", payload);
      }
      localStorage.removeItem("draftListing");
      alert("İlan başarıyla yayınlandı.");
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto px-4 py-6 pb-24">
      {/* Üst Başlık */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
        >
          ← Geri
        </button>
        <div className="text-sm text-gray-600">
          {catLabel ? `Seçim: ${catLabel}` : "Kategori seçimi"}
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full border rounded-xl px-3 py-4 space-y-4 bg-white"
      >
        {/* Başlık */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Başlık</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 outline-none"
            placeholder="İlan başlığı"
          />
        </div>

        {/* Fiyat */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Fiyat (₺)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 outline-none"
            placeholder="0"
          />
        </div>

        {/* Açıklama */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Açıklama</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 outline-none resize-y"
            placeholder="İlan hakkında detaylar"
          />
        </div>

        {/* Konum */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Konum</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 outline-none"
            placeholder="İl / İlçe"
          />
        </div>

        {/* Görseller */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">
            Görseller (birden fazla seçebilirsiniz)
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Her görsel en fazla {MAX_MB} MB olabilir.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="block mb-2"
          />
          <span className="text-sm text-gray-600">
            {images.length}/{MAX_IMAGES} görsel yüklendi
          </span>

          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-3">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative w-full aspect-square rounded-xl overflow-hidden border"
                >
                  <img
                    src={img.url}
                    alt={img.file?.name || "görsel"}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(img.id)}
                    className="absolute -top-2 -right-2 bg-white border rounded-full w-8 h-8 text-lg leading-8 text-gray-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Butonlar */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-200"
          >
            Taslak olarak kaydet
          </button>

          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 py-2 rounded-xl font-medium text-white ${
              submitting
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {submitting ? "Gönderiliyor..." : "İlanı Yayınla"}
          </button>
        </div>
      </form>
    </div>
  );
}
