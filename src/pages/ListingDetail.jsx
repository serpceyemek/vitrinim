// src/pages/ListingDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { getListingById } from "../data/listings";

export default function ListingDetail() {
  const { id } = useParams();
  const listing = getListingById(id);

  // Koruma: veri yoksa beyaz ekran yerine kibar mesaj
  if (!listing) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        <p>İlan bulunamadı.</p>
        <Link to="/">Ana sayfaya dön</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      {/* Görsel alanı (şimdilik boş placeholder) */}
      <div
        style={{
          width: "100%",
          height: 360,
          background: "#f3f3f3",
          border: "1px solid #eee",
          borderRadius: 12,
          marginBottom: 16,
        }}
      />

      <h2 style={{ margin: "0 0 8px" }}>{listing.title}</h2>
      <div style={{ color: "#666", marginBottom: 8 }}>
        ₺{Number(listing.price || 0).toLocaleString("tr-TR")} &nbsp;•&nbsp;{" "}
        {listing.location || "—"} &nbsp;•&nbsp;{" "}
        {(listing.postedAt || "").slice(0, 10)}
      </div>

      <p>
        Bu sayfa örnek detay şablonudur. İçerikleri daha sonra
        zenginleştireceğiz.
      </p>

      <p style={{ marginTop: 16 }}>
        <Link to="/">← Ana sayfaya dön</Link>
      </p>
    </div>
  );
}
