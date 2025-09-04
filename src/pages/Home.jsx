import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useListingPool } from "../data/listings.js";

const fmtPrice = (n) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
const fmtDate = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("tr-TR");
};

export default function Home() {
  const { pool, localCount } = useListingPool();

  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState("price"); // price | title | date
  const [sortDir, setSortDir] = useState("asc");

  const list = useMemo(() => {
    let arr = [...pool];
    const s = q.trim().toLowerCase();
    if (s) arr = arr.filter((it) => [it.title, it.location, it.category].some(v => String(v).toLowerCase().includes(s)));
    arr.sort((a, b) => {
      if (sortKey === "price") return sortDir === "asc" ? a.price - b.price : b.price - a.price;
      if (sortKey === "title") return sortDir === "asc" ? a.title.localeCompare(b.title, "tr") : b.title.localeCompare(a.title, "tr");
      if (sortKey === "date")  { const da = +new Date(a.postedAt), db = +new Date(b.postedAt); return sortDir === "asc" ? da - db : db - da; }
      return 0;
    });
    return arr;
  }, [pool, q, sortKey, sortDir]);

  // Basit stiller (Tailwind yoksa bile çalışsın)
  const styles = {
    page: { maxWidth: 1120, margin: "0 auto", padding: 16, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" },
    info: { marginBottom: 12, padding: "8px 12px", border: "1px solid #eee", borderRadius: 10, background: "#fff" },
    toolbar: { display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" },
    input: { flex: 1, minWidth: 260, padding: "8px 10px", border: "1px solid #ddd", borderRadius: 10 },
    select: { padding: "8px 10px", border: "1px solid #ddd", borderRadius: 10 },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, marginTop: 12 },
    card: { border: "1px solid #eee", borderRadius: 14, background: "#fff", overflow: "hidden", textDecoration: "none", color: "inherit" },
    imgBox: { width: "100%", maxHeight: 220, overflow: "hidden", background: "#f7f7f7" },
    img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
    cardBody: { padding: 12 },
    line1: { display: "flex", justifyContent: "space-between", fontSize: 12, color: "#777" },
    title: { marginTop: 4, fontWeight: 700, minHeight: 40, lineHeight: 1.2 },
    price: { marginTop: 6, fontSize: 18, fontWeight: 800 },
    sectionTitle: { fontSize: 20, fontWeight: 700, margin: "16px 0 8px" },
  };

  const featured = list.filter(l => l.isFeatured).slice(0, 8);

  return (
    <div style={styles.page}>
      {localCount > 0 && (
        <div style={styles.info}>
          Tarayıcıda kayıtlı <b>{localCount}</b> ilan bulundu ve listeye eklendi.
        </div>
      )}

      {/* Ara + Sırala */}
      <div style={styles.toolbar}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ara: başlık, konum, kategori"
          style={styles.input}
        />
        <div style={{ display: "flex", gap: 6 }}>
          <label style={{ fontSize: 14, color: "#555", alignSelf: "center" }}>Sırala:</label>
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} style={styles.select}>
            <option value="price">Fiyat</option>
            <option value="title">Başlık</option>
            <option value="date">Tarih</option>
          </select>
          <select value={sortDir} onChange={(e) => setSortDir(e.target.value)} style={styles.select}>
            <option value="asc">Artan</option>
            <option value="desc">Azalan</option>
          </select>
        </div>
      </div>

      {/* Öne çıkanlar */}
      <h2 style={styles.sectionTitle}>Öne Çıkan İlanlar</h2>
      <div style={styles.grid}>
        {featured.length === 0 ? (
          <div style={{ color: "#777", fontSize: 14 }}>Öne çıkan ilan yok.</div>
        ) : (
          featured.map((it) => (
            <Link key={it.id} to={`/listing/${it.id}`} style={styles.card}>
              <div style={styles.imgBox}><img src={it.image} alt={it.title} style={styles.img} /></div>
              <div style={styles.cardBody}>
                <div style={styles.line1}>
                  <span>{it.location}</span>
                  <span>{fmtDate(it.postedAt)}</span>
                </div>
                <div style={styles.title}>{it.title}</div>
                <div style={styles.price}>{fmtPrice(it.price)}</div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Tüm sonuçlar */}
      <h2 style={styles.sectionTitle}>Sonuçlar</h2>
      <div style={styles.grid}>
        {list.map((it) => (
          <Link key={it.id} to={`/listing/${it.id}`} style={styles.card}>
            <div style={styles.imgBox}><img src={it.image} alt={it.title} style={styles.img} /></div>
            <div style={styles.cardBody}>
              <div style={styles.line1}>
                <span>{it.location}</span>
                <span>{fmtDate(it.postedAt)}</span>
              </div>
              <div style={styles.title}>{it.title}</div>
              <div style={styles.price}>{fmtPrice(it.price)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
