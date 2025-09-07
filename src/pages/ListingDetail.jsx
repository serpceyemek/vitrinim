// src/pages/ListingDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { getListingById, useListingPool } from "../data/listings.js";

export default function ListingDetail() {
  const { id } = useParams();
  const listing = getListingById(id);
  const pool = useListingPool();

  if (!listing) {
    return (
      <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
        <h2>İlan bulunamadı</h2>
        <p>Aradığınız ilan yayında değil ya da silinmiş olabilir.</p>
        <Link to="/" style={{ color: "#2563eb" }}>Ana sayfaya dön</Link>
      </div>
    );
  }

  const priceText = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(Number(listing.price) || 0);

  const imgUrl =
    listing.image && String(listing.image).trim()
      ? listing.image
      : "https://via.placeholder.com/1000x560?text=Vitrinim";

  // Benzerler: aynı kategoriId, kendisi hariç, ilk 6
  const similars = Array.isArray(pool)
    ? pool
        .filter(
          (x) =>
            String(x.id) !== String(listing.id) &&
            x.categoryId &&
            String(x.categoryId) === String(listing.categoryId)
        )
        .slice(0, 6)
    : [];

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <Link to="/" style={{ textDecoration: "none", color: "#2563eb" }}>
        ← Ana sayfa
      </Link>

      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 12,
          margin: "16px 0",
          border: "1px solid #e5e7eb",
        }}
      />

      <h2 style={{ margin: "0 0 8px" }}>{listing.title || "İlan"}</h2>

      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
        <strong style={{ fontSize: 20 }}>{priceText}</strong>
        {listing.location ? (
          <span style={{ color: "#6b7280" }}>{listing.location}</span>
        ) : null}
        {listing.postedAt ? (
          <span style={{ color: "#9ca3af" }}>
            {new Date(listing.postedAt).toLocaleDateString("tr-TR")}
          </span>
        ) : null}
      </div>

      <p style={{ color: "#4b5563" }}>
        Bu sayfa örnek detay şablonudur. İçerikleri daha sonra zenginleştireceğiz.
      </p>

      {similars.length > 0 && (
        <>
          <h3 style={{ marginTop: 24 }}>Benzer ilanlar</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            {similars.map((s) => (
              <Link
                key={`sim-${s.id}`}
                to={`/ilan/${s.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 12,
                    padding: 12,
                    background: "#fff",
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>
                    {s.title}
                  </div>
                  <div style={{ color: "#6b7280", fontSize: 13 }}>
                    {new Intl.NumberFormat("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                      maximumFractionDigits: 0,
                    }).format(Number(s.price) || 0)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
