import React from "react";
import { useLocation, useParams } from "react-router-dom";

// Örnek veri (direct URL ile gelinirse fallback için)
const listings = [
  {
    id: 1,
    title: "Eviniz Burada!",
    price: 120000,
    image: "https://placehold.co/640x400?text=Emlak",
  },
  {
    id: 2,
    title: "Otomobil Fırsatı",
    price: 85000,
    image: "https://placehold.co/640x400?text=Otomobil",
  },
];

export default function ListingDetail() {
  const { id } = useParams();
  const { state } = useLocation(); // ← Link ile gelen veri (varsa)

  // 1) Öncelik: Link state'inden gelen öğe
  // 2) Fallback: sayfa direkt URL ile açılırsa local "listings" içinden ID ile bul
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
