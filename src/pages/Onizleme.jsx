import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Onizleme() {
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("draftListing");
    if (saved) {
      setListing(JSON.parse(saved));
    }
  }, []);

  const handlePublish = () => {
    import("../data/listings").then(({ savePublishedListing }) => {
      savePublishedListing(listing);
      toast.success("İlan başarıyla yayına alındı!");
      localStorage.removeItem("draftListing");
      setTimeout(() => navigate("/"), 2000);
    });
  };

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h1 className="text-2xl font-semibold mb-2">İlan Önizlemesi</h1>
        <p className="text-gray-500 mb-4">Ön izleme verisi bulunamadı.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto p-5">
      <h1 className="text-2xl font-semibold mb-4">İlan Önizlemesi</h1>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-medium mb-2">{listing.title}</h2>
        <p className="text-gray-600 mb-2">{listing.description}</p>
        <p className="font-semibold mb-2">Fiyat: {listing.price} ₺</p>
        <p className="text-sm text-gray-500 mb-4">Konum: {listing.location}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {listing.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`görsel-${idx}`}
              className="rounded-lg w-full h-32 object-cover"
            />
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/ilan-ver")}
            className="px-5 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition"
          >
            Düzenlemeye Dön
          </button>
          <button
            onClick={handlePublish}
            className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
          >
            Yayına Al
          </button>
        </div>
      </div>
    </div>
  );
}
