import React from "react";
import { Link } from "react-router-dom";

const listings = [
  {
    id: 1,
    title: "Eviniz Burada!",
    price: 120000,
    image: "https://placehold.co/320x200?text=Emlak",
  },
  {
    id: 2,
    title: "Otomobil Fırsatı",
    price: 85000,
    image: "https://placehold.co/320x200?text=Otomobil",
  },
];

export default function Home() {
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Öne Çıkan İlanlar</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
          marginTop: "12px",
        }}
      >
        {listings.map((l) => (
          <Link
            key={l.id}
            to={`/listing/${l.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <article
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                padding: 16,
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <img
                src={l.image}
                alt={l.title}
                style={{ width: "100%", borderRadius: 6, display: "block" }}
              />
              <h3 style={{ margin: "12px 0 6px" }}>{l.title}</h3>
              <div>{l.price.toLocaleString("tr-TR")} ₺</div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
