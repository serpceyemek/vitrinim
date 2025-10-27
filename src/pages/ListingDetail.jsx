// src/pages/ListingDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingById } from "../data/listings";

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const listing = getListingById(id);

  if (!listing) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-semibold mb-2">İlan bulunamadı</h1>
        <p className="text-gray-600 mb-6">
          Bu kimliğe ait bir ilan görünmüyor.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 pb-28 max-w-screen-md mx-auto">
      {/* Başlık ve fiyat */}
      <div className="mb-3">
        <h1 className="text-2xl font-semibold">{listing.title || "İlan"}</h1>
        <div className="text-gray-600">
          {listing.location ? listing.location : ""}
          {listing.postedAt ? ` • ${new Date(listing.postedAt).toLocaleDateString()}` : ""}
        </div>
        {typeof listing.price === "number" && (
          <div className="mt-2 text-xl font-semibold">
            ₺{Number(listing.price).toLocaleString("tr-TR")}
          </div>
        )}
      </div>

      {/* Görseller */}
      {Array.isArray(listing.images) && listing.images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {listing.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`görsel-${i}`}
              className="w-full h-52 object-cover rounded-xl border"
              loading="lazy"
            />
          ))}
        </div>
      )}

      {/* Açıklama */}
      {listing.description && (
        <div className="bg-white rounded-xl border p-4">
          <h2 className="text-lg font-medium mb-2">Açıklama</h2>
          <p className="text-gray-700 leading-relaxed">{listing.description}</p>
        </div>
      )}

      {/* Alt butonlar */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-full max-w-xs px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium transition"
        >
          Geri Dön
        </button>
        <button
          onClick={() => navigate("/magaza")}
          className="w-full max-w-xs px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition"
        >
          Mağazaya Git
        </button>
      </div>
    </div>
  );
}
