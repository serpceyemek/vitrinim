// src/pages/NewListingFormPlaceholder.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function NewListingFormPlaceholder() {
  const q = new URLSearchParams(useLocation().search);
  const path = q.get("path") || "";

  return (
    <section className="mx-auto max-w-screen-md px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">İlan Formu (Placeholder)</h1>
      <p className="text-gray-600 mb-6">
        Seçilen kategori yolu: <span className="font-semibold">{path}</span>
      </p>

      <div className="rounded-xl border p-4 bg-white shadow-sm">
        Buraya gerçek form gelecek (başlık, açıklama, fotoğraf, fiyat, konum, vs.).
      </div>

      <div className="mt-6">
        <Link to="/ilan-ver" className="text-orange-600 font-medium">Başa dön</Link>
      </div>
    </section>
  );
}
