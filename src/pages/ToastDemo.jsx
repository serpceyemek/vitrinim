import React from "react";
import { useToast } from "../components/toast/ToastContext";

export default function ToastDemo() {
  const toast = useToast();

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-8">
      <h1 className="text-2xl font-semibold mb-2">Toast Test Alanı</h1>
      <p className="text-gray-600 mb-6">
        Formu şişirmeden, mesaj akışını burada doğruluyoruz.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() =>
            toast.push({
              variant: "success",
              title: "Görsel kaldırıldı",
              description: "Seçtiğiniz görsel listeden çıkarıldı.",
              duration: 2800,
            })
          }
          className="rounded-xl py-2 px-3 bg-green-600 text-white hover:bg-green-700"
        >
          Başarılı
        </button>

        <button
          onClick={() =>
            toast.push({
              variant: "error",
              title: "Dosya boyutu büyük",
              description: "Maksimum 5 MB yükleyebilirsiniz.",
              duration: 3600,
            })
          }
          className="rounded-xl py-2 px-3 bg-red-600 text-white hover:bg-red-700"
        >
          Hata
        </button>

        <button
          onClick={() =>
            toast.push({
              variant: "info",
              title: "Önizleme kaydedildi",
              description: "Taslak önbelleğe yazıldı.",
              duration: 2400,
            })
          }
          className="rounded-xl py-2 px-3 bg-blue-600 text-white hover:bg-blue-700"
        >
          Bilgi
        </button>

        <button
          onClick={() =>
            toast.push({
              variant: "warning",
              title: "8/8 sınırına yaklaşıldı",
              description: "Yeni görsel eklerken eskilerini temizleyin.",
              duration: 3200,
            })
          }
          className="rounded-xl py-2 px-3 bg-amber-600 text-white hover:bg-amber-700"
        >
          Uyarı
        </button>
      </div>
    </div>
  );
}
