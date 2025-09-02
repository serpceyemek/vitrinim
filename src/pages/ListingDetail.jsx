// src/pages/ListingDetail.jsx
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import listings from "../data/listings";

export default function ListingDetail() {
  const { id } = useParams();
  const { state } = useLocation();

  // 1) Route state ile geldiysek onu kullan
  // 2) Doğrudan URL ile gelindiyse data/listings'ten bul (yenilemeye dayanıklı)
  const item =
    (state && state.id && state) ||
    listings.find((l) => String(l.id) === String(id));

  if (!item) {
    return (
      <main style={{ padding: "1rem" }}>
        <h2>İlan bulunamadı</h2>
        <p>İstediğiniz ilan yok ya da kaldırıldı.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h2>
        {item.title} #{item.id}
      </h2>

      <img
        src={item.image}
        alt={item.title}
        style={{
          width: "100%",
          maxWidth: 640,
          display: "block",
          borderRadius: 6,
        }}
      />

      <p style={{ marginTop: 12 }}>
        <strong>Fiyat:</strong> {item.price.toLocaleString("tr-TR")} ₺
      </p>

      <p>
        Burada ilanla ilgili detaylı açıklamalar, özellikler ve fiyat bilgisi
        yer alacak.
      </p>
    </main>
  );
}
