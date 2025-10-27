import React, { useEffect, useState } from "react";
import { getLocalListings } from "../services/localListings";

export default function Magaza() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("publishedListings");
      const published = raw ? JSON.parse(raw) : [];
      const base = getLocalListings ? getLocalListings() : [];
      setListings([...published, ...base]);
    } catch (e) {
      console.error("Mağaza verileri okunamadı:", e);
      setListings([]);
    }
  }, []);

  if (!listings.length) {
    return (
      <div className="p-6 text-center text-gray-600">
        Henüz yayınlanmış ilan bulunmuyor.
      </div>
    );
  }

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-semibold mb-4">Mağaza</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border"
          >
            <img
              src={item.images?.[0]?.url || item.image || "https://picsum.photos/seed/default/800/480"}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h2 className="text-lg font-medium">{item.title}</h2>
              <p className="text-gray-700 font-semibold">{item.price}</p>
              <p className="text-sm text-gray-500">{item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
