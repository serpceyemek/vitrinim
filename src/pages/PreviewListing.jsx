import React, { useEffect, useMemo } from "react";

/**
 * Önizleme sayfası:
 * - sessionStorage("previewData") içinden veriyi alır
 * - Görselleri normalize eder:
 *    - img.url varsa onu kullanır
 *    - img.file varsa URL.createObjectURL(img.file) üretir
 * - Ürettiği blob URL'lerini unmount'ta revoke eder (hafıza sızıntısı engellenir)
 */
export default function PreviewListing() {

  const data = useMemo(() => {
   try {
    const raw = sessionStorage.getItem("previewData");
     return raw ? JSON.parse(raw) : null;
   } catch {
     return null;
   }
 }, []);

  // img nesnesini tek tipe normalle: { url: string }
  const { images: safeImages, revokeList } = useMemo(() => {
    const list = [];
    const revokes = [];

    if (data?.images?.length) {
      for (const img of data.images) {
        // 1) url doğrudan verilmişse kullan
        if (img?.url) {
          list.push({ url: img.url });
          continue;
        }

        // 2) file varsa blob URL üret
        if (img?.file instanceof File) {
          const blobUrl = URL.createObjectURL(img.file);
          list.push({ url: blobUrl });
          revokes.push(blobUrl);
        }
      }
    }
    return { images: list, revokeList: revokes };
  }, [data]);

  // Üretilen blob URL'lerini sayfa kapanırken temizle
  useEffect(() => {
    return () => {
      revokeList.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [revokeList]);

  if (!data) {
    return (
      <div className="max-w-screen-lg mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">İlan Önizlemesi</h1>
        <p className="text-gray-600">Önizleme verisi bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">İlan Önizlemesi</h1>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">{data.title}</h2>

        {data.price ? (
          <div className="mt-2 text-orange-600 font-semibold">{data.price} ₺</div>
        ) : null}

        {data.description ? (
          <p className="mt-3 text-gray-700">{data.description}</p>
        ) : null}

        {data.location ? (
          <div className="mt-2 text-sm text-gray-500">Konum: {data.location}</div>
        ) : null}

        {/* Görseller */}
        {safeImages?.length > 0 && (
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {safeImages.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden border bg-gray-50">
                <img
                  src={img.url}
                  alt={`preview-${i}`}
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
