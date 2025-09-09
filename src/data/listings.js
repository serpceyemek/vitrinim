// src/components/ListingCard.jsx
import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  if (!listing) return null;

  return (
    <Link
      to={`/ilan/${listing.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          border: "1px solid #eee",
          borderRadius: 12,
          padding: 16,
          background: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            height: 160,
            background: "#f3f3f3",
            borderRadius: 8,
            marginBottom: 12,
          }}
        />
        <div style={{ fontWeight: 600, marginBottom: 6 }}>
          {listing.title}
        </div>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>
          ₺{Number(listing.price).toLocaleString("tr-TR")}
        </div>
        <div style={{ color: "#666", fontSize: 13 }}>
          {listing.location} ·{" "}
          {new Date(listing.postedAt).toLocaleDateString("tr-TR")}
        </div>
      </div>
    </Link>
  );
}
