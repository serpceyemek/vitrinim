// src/pages/ListingDetail.jsx
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import listings from "../data/listings";

export default function ListingDetail() {
  const { state } = useLocation();
  const { id } = useParams();

  // URL'den açılınca da çalışsın: state yoksa id ile listeden bul
  const item =
    state && state.id ? state : listings.find((l) => String(l.id) === String(id));

  if (!item) {
    return (
      <main style={{ padding: "1rem" }}>
        <style>{styles}</style>
        <div className="wrap">
          <Link to="/" className="back">← İlanlara Dön</Link>
          <div className="empty">
            <h2>İlan bulunamadı</h2>
            <p>Aradığın ilan kaldırılmış olabilir veya bağlantı hatalı.</p>
            <Link to="/" className="btn">Anasayfa</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: "1rem" }}>
      <style>{styles}</style>

      <div className="wrap">
        <Link to="/" className="back">← İlanlara Dön</Link>

        <div className="grid">
          <div className="media">
            <img src={item.image} alt={item.title} />
          </div>

          <aside className="panel">
            <h1 className="title">{item.title}</h1>
            <div className="price">
              {Number(item.price).toLocaleString("tr-TR")} ₺
            </div>

            <ul className="meta">
              <li><strong>İlan No:</strong> {item.id}</li>
              <li><strong>Durum:</strong> Yayında</li>
            </ul>

            <div className="actions">
              <button className="btn primary">İletişime Geç</button>
              <button className="btn">Favorilere Ekle</button>
            </div>

            <section className="desc">
              <h2>İlan Açıklaması</h2>
              <p>
                Bu sayfa demo amaçlıdır. Gerçek veriler eklendiğinde; başlık, fiyat,
                fotoğraflar ve ayrıntılar burada zenginleşecek.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

const styles = `
  .wrap { max-width: 1100px; margin: 0 auto; }
  .back { display:inline-block; margin: 6px 0 14px; text-decoration:none; color:#2563eb; }
  .grid { display:grid; grid-template-columns: 1.2fr 1fr; gap:20px; }
  .media img { width:100%; height:420px; object-fit:cover; border-radius:12px; display:block; }
  .panel { border:1px solid #e5e7eb; border-radius:12px; padding:16px; background:#fff; box-shadow:0 1px 2px rgba(0,0,0,.04); }
  .title { margin: 0 0 8px; font-size:1.4rem; color:#111827; }
  .price { font-size:1.25rem; font-weight:700; color:#111827; margin-bottom:10px; }
  .meta { list-style:none; padding:0; margin:10px 0 16px; color:#374151; }
  .meta li { margin: 4px 0; }
  .actions { display:flex; gap:10px; margin-bottom:16px; }
  .btn { padding:10px 14px; border-radius:10px; border:1px solid #e5e7eb; background:#f9fafb; cursor:pointer
