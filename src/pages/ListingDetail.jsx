import React from "react";
import { useLocation, useParams } from "react-router-dom";

// Direkt URL ile gelinirse fallback için örnek veri
const listings = [
  {
    id: 1,
    title: "Eviniz Burada!",
    price: 120000,
    image: "https://placehold.co/640x400",
  },
  {
    id: 2,
    title: "Otomobil Fırsatı",
    price: 85000,
    image: "https://placehold.co/640x400",
  },
];

export default function ListingDetail() {
  const { id } = useParams();
  const { state } = useLocation();

  // Öncelik: Link state'inden gelen veri; yoksa ID ile local listeden bul
  const item = state ?? listings.find((l) => l.id === Number(id));

  if (!item) {
    return (
      <main style={{ padding: "1rem" }}>
        <h2>İlan Bulunamadı</h2>
        <p>Geçersiz ID: {id}</p>
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
          maxWidth: "640px",
          borderRadius: 6,
          display: "block",
        }}
      />
      <p style={{ marginTop: 12 }}>
        Fiyat: <strong>{item.price.toLocaleString("tr-TR")} ₺</strong>
      </p>
      <p>
        Burada ilanla ilgili detaylı açıklamalar, özellikler ve fiyat bilgisi
        yer alacak.
      </p>
    </main>
  );
}
