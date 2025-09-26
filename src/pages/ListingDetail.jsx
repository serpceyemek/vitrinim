import { SEED_LISTINGS as seedListings } from "../data/listings";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { getLocalListings } from "../services/localListings";
import NotFound from "./NotFound";

export default function ListingDetail() {
  // Hook'lar koşulsuz, en üst seviyede:
  const { id } = useParams();

  // Havuzu (pool) tek yerde toparla: seed + localStorage
  const pool = useMemo(() => {
    const base = Array.isArray(seedListings) ? seedListings : [];
    let local = [];
    try {
      local = typeof getLocalListings === "function" ? getLocalListings() : [];
    } catch {
      local = [];
    }
    const byId = new Map();
    [...base, ...local].forEach((x) => {
      if (x && x.id !== undefined && x.id !== null) {
        byId.set(String(x.id), x);
      }
    });
    return Array.from(byId.values());
  }, []);

  // Aradığımız ilan
  const listing = useMemo(
    () => pool.find((x) => String(x.id) === String(id)),
    [pool, id]
  );

  // Bulunamazsa NotFound
  if (!listing) return <NotFound />;

  // Basit detay görünümü (alanlar yoksa sorun çıkarmasın)
  return (
    <main style={{ padding: 16 }}>
      <h1 style={{ margin: 0 }}>{listing.title || "İlan"}</h1>
      <p style={{ opacity: 0.7 }}>
        {listing.location ? `${listing.location}` : ""}
        {listing.date ? ` • ${listing.date}` : ""}
      </p>

      {listing.price !== undefined && (
        <p>
          <b>Fiyat:</b> ₺{listing.price}
        </p>
      )}

      {listing.description && (
        <p>
          <b>Açıklama:</b> {listing.description}
        </p>
      )}
    </main>
  );
}
