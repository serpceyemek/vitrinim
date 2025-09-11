// src/pages/ListingDetail.jsx
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getListingById, useListingPool } from "../data/listings";
import ListingCard from "../components/ListingCard";

export default function ListingDetail() {
  const { id } = useParams();

  // İlanı getir (tekil)
  const listing = getListingById(id);

  // Guard: yanlış URL / silinmiş ilan / geç yükleme
  if (!listing) {
    return (
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        <p>İlan bulunamadı.</p>
        <Link to="/" style={{ color: "#06c" }}>Ana sayfaya dön</Link>
      </div>
    );
  }

  // Tüm havuz (seed + local) — benzerleri bunun içinden seçeceğiz
  const pool = useListingPool();

  // Aynı kategoriden benzer ilanlar (kendisi hariç), en fazla 6
  const similar = useMemo(() => {
    const catId = listing.categoryId;
    if (!catId) return [];
    const arr = pool.filter((l) => {
      if (String(l.id) === String(listing.id)) return false; // kendisi değil
      const path = Array.isArray(l.categoryPath) ? l.categoryPath : (l.categoryId ? [l.categoryId] : []);
      return path.includes(catId);
    });
    // En yeniler öne
    arr.sort((a, b) => new Date(b.postedAt || 0) - new Date(a.postedAt || 0));
    return arr.slice(0, 6);
  }, [pool, listing]);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
      {/* Kırıntı gezinti gibi basit geri linki */}
      <div style={{ marginBottom: 12 }}>
        <Link to="/" style={{ color: "#06c" }}>← Ana sayfa</Link>
      </div>

      {/* Üst blok: görsel + başlık + fiyat + meta */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, alignItems: "start" }}>
        <div>
          <div
            style={{
              width: "100%",
              aspectRatio: "16 / 9",
              background: "#f3f3f3",
              borderRadius: 12,
              marginBottom: 12,
            }}
          >
            {listing.image ? (
              <img
                src={listing.image}
                alt={listing.title || "İlan görseli"}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }}
              />
            ) : null}
          </div>

          <h1 style={{ margin: "8px 0 6px" }}>{listing.title || "Başlıksız ilan"}</h1>

          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            ₺{Number(listing.price || 0).toLocaleString("tr-TR")}
          </div>

          <div style={{ color: "#666", fontSize: 14 }}>
            {listing.location || "—"} ·{" "}
            {listing.postedAt ? new Date(listing.postedAt).toLocaleDateString("tr-TR") : ""}
          </div>
        </div>

        {/* Basit açıklama/özet alanı (yoksa placeholder) */}
        <div
          style={{
            border: "1px solid #eee",
            borderRadius: 12,
            padding: 16,
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Açıklama</h3>
          <p style={{ marginTop: 8, color: "#444", lineHeight: 1.6 }}>
            {listing.description || "Satıcı bu ilan için açıklama girmemiş."}
          </p>
        </div>
      </div>

      {/* Benzer ilanlar */}
      <div style={{ marginTop: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Benzer ilanlar</h2>
        {similar.length === 0 ? (
          <p style={{ color: "#666" }}>Bu kategoriye benzer başka ilan yok.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {similar.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
