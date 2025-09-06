// src/components/ListingCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ListingCard({ item }) {
  if (!item) return null;

  const priceNum = Number.isFinite(Number(item.price)) ? Number(item.price) : 0;
  const priceText = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(priceNum);

  const imgUrl =
    item.image && String(item.image).trim()
      ? item.image
      : "https://via.placeholder.com/400x240?text=Vitrinim";

  return (
    <Link
      to={`/ilan/${item.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div style={{ padding: 12 }}>
          <h3 style={{ margin: "0 0 6px", fontSize: 16, lineHeight: 1.3 }}>
            {item.title || "İsimsiz İlan"}
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: 600,
            }}
          >
            <span>{priceText}</span>
            {item.location ? (
              <span
                style={{ fontWeight: 400, color: "#6b7280", fontSize: 13 }}
              >
                {item.location}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
