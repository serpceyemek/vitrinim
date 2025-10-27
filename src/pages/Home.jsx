  // src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useListingPool } from "../data/listings";

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const load = () => setListings(useListingPool());
    load();
    // publishedListings güncellenince listeyi yenile
    const handler = () => load();
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <div className="max-w-screen-md mx-auto p-5">
      <h1 className="text-2xl font-semibold mb-4">Yayınlanan İlanlar</h1>

      {listings.length === 0 ? (
        <p className="text-gray-500">Henüz yayınlanmış ilan bulunmuyor.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {listings.map((item) => (
            <Link
              key={item.id}
              to={`/ilan/${item.id}`}
              className="border rounded-xl p-2 bg-white shadow-sm hover:shadow-md transition"
            >
              {item.images?.[0] && (
                <img
                  src={item.images[0]}
                  alt={item.title || "ilan görseli"}
                  className="rounded-lg w-full h-32 object-cover mb-2"
                  loading="lazy"
                />
              )}
              <h2 className="font-medium truncate">{item.title}</h2>
              {typeof item.price === "number" && (
                <p className="text-sm text-gray-600">
                  ₺{Number(item.price).toLocaleString("tr-TR")}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
