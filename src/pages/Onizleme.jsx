import React from "react";
import { useNavigate } from "react-router-dom";

export default function Onizleme() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("previewListing"));

  if (!data) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 mb-4">Görüntülenecek ilan bulunamadı.</p>
        <button
          onClick={() => navigate("/ilan-ver")}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Yeni İlan Ver
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-1">{data.title}</h2>
      <p className="text-lg text-gray-800 mb-3">
        Fiyat: <span className="font-semibold">{data.price} ₺</span>
      </p>
      <p className="text-gray-600 mb-2">{data.description}</p>
      <p className="text-gray-500 mb-4">Konum: {data.location}</p>

      <div className="grid grid-cols-3 gap-2">
        {data.images?.map((img, i) => (
          <img key={i} src={img.url} alt={`img-${i}`} className="w-full h-24 object-cover rounded-xl" />
        ))}
      </div>

      <button
        onClick={() => navigate("/magaza")}
        className="mt-6 w-full bg-orange-500 text-white py-2 rounded-xl font-medium hover:bg-orange-600"
      >
        Mağazaya Dön
      </button>
    </div>
  );
}
