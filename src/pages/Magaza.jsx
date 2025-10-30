import React, { useState, useEffect } from "react";
import { getLocalListings } from "../services/localListings";

export default function Magaza() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("publishedListings");
      const published = raw ? JSON.parse(raw) : [];
      const base =
        typeof getLocalListings === "function" ? getLocalListings() : [];

      const merged = [...published, ...base].map((x) => ({
        ...x,
        price: typeof x.price === "number" ? x.price : Number(x.price) || 0,
        date: x.date || x.publishedAt || new Date().toISOString(),
      }));

      // Varsayılan sıralama: yeni → eski
      const sorted = [...merged].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setListings(sorted);

      const onRefresh = () => {
        const raw2 = localStorage.getItem("publishedListings");
        const published2 = raw2 ? JSON.parse(raw2) : [];
        const merged2 = [...published2, ...base];
        const sorted2 = [...merged2].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setListings(sorted2);
      };

      window.addEventListener("publishedListingsUpdated", onRefresh);
      return () =>
        window.removeEventListener("publishedListingsUpdated", onRefresh);
    } catch (e) {
      console.error("Mağaza verileri okunamadı:", e);
      setListings([]);
    }
  }, []);

  if (!listings.length) {
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

  // Yeni etiketi (son 72 saatte eklenenler)
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
      <h1 className="text-2xl font-semibold mb-4">Mağaza</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((item) => (
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
