import React, { useEffect, useState } from "react";

export default function Onizleme() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("previewListing");
    if (stored) setData(JSON.parse(stored));
  }, []);

  if (!data) {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">İlan Önizlemesi</h2>
        <p>Önizleme verisi bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">{data.title}</h2>
      <p className="text-gray-600 mb-2">{data.description}</p>
      <p className="mb-4">Fiyat: {data.price} ₺</p>
      <p className="mb-4">Konum: {data.location}</p>

      {data.images?.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {data.images.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt="ilan görseli"
              className="w-full aspect-square object-cover rounded-xl border"
            />
          ))}
        </div>
      )}
    </div>
  );
}
