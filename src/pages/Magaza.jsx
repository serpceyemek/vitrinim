import React, { useEffect, useState } from "react";
import { getLocalListings } from "../services/localListings";

export default function Magaza() {
  const [listings, setListings] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("publishedListings");
      const published = raw ? JSON.parse(raw) : [];
      const base = typeof getLocalListings === "function" ? getLocalListings() : [];

      const merged = [...published, ...base].map((x) => ({
        ...x,
        // Güvenli alanlar
        price: typeof x.price === "number" ? x.price : Number(x.price) || 0,
        date: x.date || x.publishedAt || new Date().toISOString(),
      }));

      // Varsayılan: Yeni → Eski
      const sorted = [...merged].sort((a, b) => new Date(b.date) - new Date(a.date));
      setListings(sorted);

      // Mağaza canlı güncelleme (başka sayfadan dispatch edildiğinde)
      const onRefresh = () => {
        const raw2 = localStorage.getItem("publishedListings");
        const published2 = raw2 ? JSON.parse(raw2) : [];
        const merged2 = [...published2, ...base];
        const sorted2 = [...merged2].sort((a, b) => new Date(b.date) - new Date(a.date));
        setListings(sorted2);
      };
      window.addEventListener("publishedListingsUpdated", onRefresh);
      return () => window.removeEventListener("publishedListingsUpdated", onRefresh);
    } catch (e) {
      console.error("Mağaza verileri okunamadı:", e);
      setListings([]);
    }
  }, []);

  const sortedListings = [...listings].sort((a, b) => {
    switch (sortOption) {
      case "priceAsc":
        return (a.price || 0) - (b.price || 0);
      case "priceDesc":
        return (b.price || 0) - (a.price || 0);
      default:
        return new Date(b.date) - new Date(a.date); // newest
    }
  });

  if (!sortedListings.length) {
    return (
      <div className="p-6 text-center text-gray-600">
        Henüz ilanınız yok.
        <br />
        <a href="/ilan-ver" className="text-orange-500 underline">
          Yeni ilan ekle →
        </a>
      </div>
    );
  }

  // "Yeni" etiketi—son 72 saat içinde yayınlanmışsa göster
  const isNewListing = (item) => {
    const ts = item.publishedAt || item.date || Date.now();
    const t = typeof ts === "number" ? ts : new Date(ts).getTime();
    const THREE_DAYS = 72 * 60 * 60 * 1000;
    return Date.now() - t < THREE_DAYS;
  };

  const formatPrice = (n) =>
    (Number(n) || 0).toLocaleString("tr-TR", { maximumFractionDigits: 0 });

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Mağaza</h1>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded-lg px-2 py-1 text-sm"
        >
          <option value="newest">Yeni → Eski</option>
          <option value="priceAsc">Fiyat (Düşük → Yüksek)</option>
          <option value="priceDesc">Fiyat (Yüksek → Düşük)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedListings.map((item) => (
          <div
            key={item.id || `${item.title}-${item.date}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border relative"
          >
            {isNewListing(item) && (
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                Yeni
              </div>
            )}

            <img
              src={
                item.images?.[0]?.url ||
                item.image ||
                "https://picsum.photos/seed/default/800/480"
              }
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h2 className="text-lg font-medium">{item.title}</h2>
              <p className="text-gray-700 font-semibold">
                {formatPrice(item.price)} ₺
              </p>
              <p className="text-sm text-gray-500">{item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
