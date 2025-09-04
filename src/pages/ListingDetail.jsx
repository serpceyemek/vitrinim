import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useListingPool } from "../data/listings.js";

const formatPrice = (n) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" });

export default function ListingDetail() {
  const { id } = useParams();
  const { pool } = useListingPool();
  const item = useMemo(() => pool.find((l) => l.id === id), [pool, id]);

  if (!item) {
    return (
      <div style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 24, textAlign: "center", background: "#fff" }}>
          <h1 style={{ fontSize: 18, fontWeight: 600 }}>Aradığınız ilan yayında değil ya da kaldırıldı.</h1>
          <p style={{ marginTop: 8, color: "#666" }}>Ana sayfaya dönerek güncel ilanlara bakabilirsiniz.</p>
          <Link to="/" style={{ display: "inline-block", marginTop: 16, padding: "8px 14px", border: "1px solid #ddd", borderRadius: 12 }}>
            Ana sayfa
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1024, margin: "0 auto", padding: 16 }}>
      {/* breadcrumb */}
      <nav style={{ fontSize: 14, color: "#666", marginBottom: 12 }}>
        <Link to="/" style={{ textDecoration: "underline" }}>Ana sayfa</Link>
        <span style={{ margin: "0 6px" }}>/</span>
        <span>İlan Detayı</span>
      </nav>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
        {/* Görsel + içerik */}
        <div style={{ border: "1px solid #eee", borderRadius: 12, background: "#fff", overflow: "hidden" }}>
          {/* Görsel kutusu: max-high ve cover */}
          <div style={{ width: "100%", maxHeight: 420, overflow: "hidden" }}>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          <div style={{ padding: 20 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>{item.title}</h1>
            <div style={{ marginTop: 6, color: "#555" }}>{item.location}</div>
            <div style={{ marginTop: 4, fontSize: 12, color: "#888" }}>İlan tarihi: {formatDate(item.postedAt)}</div>

            <div style={{ marginTop: 14, fontSize: 22, fontWeight: 800 }}>{formatPrice(item.price)}</div>

            <div
              style={{
                marginTop: 10,
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid #eee",
                borderRadius: 999,
                padding: "6px 10px",
                fontSize: 12,
                color: "#555",
                gap: 6,
              }}
            >
              <span>Kategori:</span> <span style={{ fontWeight: 700 }}>{item.category}</span>
            </div>

            {item.description && (
              <p style={{ marginTop: 16, lineHeight: 1.6, color: "#444" }}>{item.description}</p>
            )}
          </div>
        </div>

        {/* Yan kutular */}
        <div style={{ display: "grid", gap: 16 }}>
          <div style={{ border: "1px solid #eee", borderRadius: 12, background: "#fff", padding: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Satıcı Bilgisi</h2>
            <div style={{ marginTop: 8, fontSize: 14, color: "#555" }}>Doğrulanmış Satıcı (Demo)</div>
            <button style={{ marginTop: 12, width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid #ddd", background: "#fafafa" }}>
              Mesaj Gönder
            </button>
            <button style={{ marginTop: 8, width: "100%", padding: "10px 14px", borderRadius: 12, border: 0, background: "#000", color: "#fff" }}>
              Telefonu Göster
            </button>
          </div>

          <div style={{ border: "1px solid #eee", borderRadius: 12, background: "#fff", padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Güvenlik İpuçları</h3>
            <ul style={{ marginTop: 10, paddingLeft: 18, color: "#555", fontSize: 14 }}>
              <li>Görmeden ödeme yapmayın.</li>
              <li>Yüz yüze ve güvenli noktalarda buluşun.</li>
              <li>Şüpheli içerikleri moderasyona bildirin.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
