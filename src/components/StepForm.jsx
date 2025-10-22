import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./toast/ToastContext";

export default function StepForm({ category, subCategory, onBack }) {
  const navigate = useNavigate();

  // Temel state'ler
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]); // [{file, url}]
  const [submitting, setSubmitting] = useState(false);
  const [removing, setRemoving] = useState(null);
// 🔸 Taslak yükleme kontrolü için
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  const MAX_FILES = 8;
  const MAX_MB = 5;

  // 🔸 Görselleri filtreleyip kaydeder
  function handleImageChange(e) {
    const incoming = Array.from(e.target.files);
    const bytesLimit = MAX_MB * 1024 * 1024;

    const validFiles = incoming.filter(
      (f) => f.type.startsWith("image/") && f.size <= bytesLimit
    );

    incoming.forEach((f) => {
      if (f.size > bytesLimit) {
        toast.push({
          variant: "error",
          title: "Dosya boyutu büyük ❌",
          description: `${f.name} ${MAX_MB} MB sınırını aşıyor.`,
          duration: 5000,
        });
      }
    });

    setImages((prev) => [
      ...prev,
      ...validFiles.map((f) => ({ file: f, url: URL.createObjectURL(f) })),
    ]);
  }

  function removeImage(index) {
  setRemoving(index);

  setTimeout(() => {
    setImages((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });

    toast.push({
      variant: "success",
      title: "Görsel kaldırıldı",
      description: `#${index + 1} görsel listeden silindi.`,
      duration: 2800,
    });

    setRemoving(null);
  }, 250);
}


  // 🔹 Basit doğrulama
  function validate() {
    if (!title.trim() || !price.trim()) {
      alert("Başlık ve fiyat alanları zorunludur.");
      return false;
    }
    return true;
  }

  // 🔹 Taslak olarak kaydet
function handleSaveDraft() {
  const draftData = {
    title,
    price,
    description,
    location,
    images,
  };
  localStorage.setItem("draftListing", JSON.stringify(draftData));
  setIsDraftSaved(true);

  // 🔹 Form gönderimi
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const previewData = {
  title,
  price,
  description,
  location,
  images: images.map((img) => ({
    file: img.file,
    url: img.url
  })),
};
 sessionStorage.setItem("previewData", JSON.stringify(previewData));
      navigate("/onizleme");
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu. Tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  }


  // 2 saniye sonra uyarıyı sıfırla
  setTimeout(() => setIsDraftSaved(false), 2000);
}


      

     

  const catLabel = useMemo(
    () =>
      [category?.title || category?.name, subCategory?.title || subCategory?.name]
        .filter(Boolean)
        .join(" / "),
    [category, subCategory]
  );

  // 🔸 Arayüz
  return (
    <div className="max-w-screen-md mx-auto px-4 py-6 pb-24">
      {/* Üst başlık */}
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

      <h1 className="text-2xl font-semibold mb-4">İlan Ver</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Başlık</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Örn: Temiz ikinci el masa"
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fiyat (₺)</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))} // sadece rakamları alır
            placeholder="Örn: 2500"
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Açıklama</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ürün durumu, ölçüler, teslimat vb."
            className="w-full border rounded-xl px-3 py-2 h-24 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Konum</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="İl / İlçe"
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        {/* Görseller */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="images">
            Görseller (birden fazla seçebilirsiniz)
            <p className="text-xs text-gray-500 mt-1">
              Her görsel en fazla {MAX_MB} MB olabilir.
            </p>
          </label>

          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm"
          />

          {/* Sayaç */}
          <p className="text-xs text-gray-500 mt-2">
            {images.length}/{MAX_FILES} görsel yüklendi
          </p>

          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={[
                    "relative group rounded-xl overflow-hidden border transition",
                    removing === i
                      ? "opacity-0 scale-95 duration-200"
                      : "opacity-100 duration-200",
                  ].join(" ")}
                >
                  <img
                    src={img.url}
                    alt={`preview-${i}`}
                    className="w-full aspect-square object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-white/90 text-gray-700 border shadow hover:bg-white"
                    aria-label="Görseli kaldır"
                    title="Görseli kaldır"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

                {/* Gönder butonu */}
        <div className="mt-6">
          <button
  type="button"
  onClick={handleSaveDraft}
  className="w-full bg-gray-200 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-300 transition"
>
  💾 Taslak olarak kaydet
</button>

{isDraftSaved && (
  <p className="text-green-600 text-sm text-center mt-1">
    Taslak kaydedildi!
  </p>
)}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-orange-500 text-white py-2 rounded-xl font-medium hover:bg-orange-600 transition"
          >
            

            {submitting ? "Gönderiliyor..." : "İlanı Yayınla"}
          </button>
        </div>
      </form>
    </div>
  );
}
