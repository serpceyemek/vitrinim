// src/components/ListingCard.jsx
import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  if (!listing) return null;

  const price = Number(listing.price) || 0;
  const priceText = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(price);

  const dateText = listing.postedAt
    ? new Date(listing.postedAt).toLocaleDateString("tr-TR")
    : "";

  return (
    <Link
      to={`/ilan/${listing.id}`}
      className="card"
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: 10,
          background: "#f5f5f5",
          marginBottom: 12,
          overflow: "hidden",
        }}
      >
        {listing.image ? (
          <img
            src={listing.image}
            alt={listing.title || "İlan görseli"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : null}
      </div>

      <h3 style={{ fontSize: 16, margin: "0 0 6px 0" }}>
        {listing.title || "Başlıksız ilan"}
      </h3>

      <div style={{ fontWeight: 600, marginBottom: 6 }}>{priceText}</div>

      <div style={{ fontSize: 12, color: "#666" }}>
        {listing.location || "—"}
        {dateText ? ` · ${dateText}` : ""}
      </div>
    </Link>
  );
}
