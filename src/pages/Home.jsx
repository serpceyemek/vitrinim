import React, { useEffect, useState } from "react";

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const loadListings = () => {
      const saved = JSON.parse(localStorage.getItem("publishedListings") || "[]");
      setListings(saved);
    };

    loadListings();

    window.addEventListener("storage", loadListings);
    return () => window.removeEventListener("storage", loadListings);
  }, []);

  return (
    <div className="max-w-screen-md mx-auto p-5">
      <h1 className="text-2xl font-semibold mb-4">Yayınlanan İlanlar</h1>

      {listings.length === 0 ? (
        <p className="text-gray-500">Henüz yayınlanmış ilan bulunmuyor.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {listings.map((item, i) => (
            <div
              key={i}
              className="border rounded-xl p-2 bg-white shadow-sm hover:shadow-md transition"
            >
              {item.images?.[0] && (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="rounded-lg w-full h-32 object-cover mb-2"
                />
              )}
              <h2 className="font-medium truncate">{item.title}</h2>
              <p className="text-sm text-gray-500">{item.price} ₺</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
