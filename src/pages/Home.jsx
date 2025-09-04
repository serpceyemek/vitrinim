import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useListingPool } from "../data/listings";

const formatPrice = (n) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
const formatDate = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

export default function Home() {
  const { pool, localCount } = useListingPool();

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("price"); // price | title | date
  const [sortDir, setSortDir] = useState("asc");
  const toggleDir = () => setSortDir((d) => (d === "asc" ? "desc" : "asc"));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = [...pool];
    if (q) list = list.filter((it) => [it.title, it.location, it.category].some((v) => String(v).toLowerCase().includes(q)));
    list.sort((a, b) => {
      if (sortKey === "price") return sortDir === "asc" ? a.price - b.price : b.price - a.price;
      if (sortKey === "title") return sortDir === "asc" ? a.title.localeCompare(b.title, "tr") : b.title.localeCompare(a.title, "tr");
      if (sortKey === "date")  { const da = +new Date(a.postedAt), db = +new Date(b.postedAt); return sortDir === "asc" ? da - db : db - da; }
      return 0;
    });
    return list;
  }, [pool, query, sortKey, sortDir]);

  const featured = useMemo(() => filtered.filter((l) => l.isFeatured).slice(0, 12), [filtered]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      {localCount > 0 && (
        <div className="mb-4 rounded-2xl border bg-white/70 p-3 text-sm text-gray-700">
          Tarayıcıda kayıtlı <strong>{localCount}</strong> ilan bulundu ve listeye eklendi.
        </div>
      )}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-xl items-center gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ara: başlık, konum, kategori…"
            className="w-full rounded-2xl border border-gray-300 bg-white/70 px-4 py-2 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200" />
          {query && <button onClick={() => setQuery("")} className="rounded-2xl border px-3 py-2 text-sm hover:bg-gray-50">Temizle</button>}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sırala:</label>
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} className="rounded-2xl border px-3 py-2 text-sm">
            <option value="price">Fiyat</option><option value="title">Başlık</option><option value="date">Tarih</option>
          </select>
          <button onClick={toggleDir} className="rounded-2xl border px-3 py-2 text-sm hover:bg-gray-50">{sortDir === "asc" ? "Artan" : "Azalan"}</button>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Öne Çıkan İlanlar</h2>
        <div className="mt-3 flex gap-4 overflow-x-auto pb-2">
          {featured.length === 0 ? <div className="text-sm text-gray-500">Öne çıkan ilan yok.</div> : featured.map((item) => (
            <Link key={item.id} to={`/listing/${item.id}`} className="min-w-[260px] max-w-[260px] rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-t-2xl">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-3">
                <div className="truncate text-sm text-gray-500">{item.location}</div>
                <div className="mt-0.5 line-clamp-2 font-medium">{item.title}</div>
                <div className="mt-1 text-base font-semibold">{formatPrice(item.price)}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Sonuçlar</h2>
          <div className="text-sm text-gray-500">{filtered.length} ilan</div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border bg-white p-6 text-center text-gray-600">Aramana uygun sonuç bulunamadı.</div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <li key={item.id}>
                <Link to={`/listing/${item.id}`} className="group block overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-gray-500">{item.location}</span>
                      <span className="text-xs text-gray-400">{formatDate(item.postedAt)}</span>
                    </div>
                    <h3 className="mt-1 line-clamp-2 text-base font-semibold">{item.title}</h3>
                    <div className="mt-1 text-lg font-bold">{formatPrice(item.price)}</div>
                    <div className="mt-2 text-xs text-gray-500">Kategori: {item.category}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
