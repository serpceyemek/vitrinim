import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Onizleme() {
  const navigate = useNavigate();
  const draft = localStorage.getItem("draftListing");

  if (!draft) {
    return (
      <div className="max-w-screen-md mx-auto p-6 text-center">
        <h1 className="text-2xl font-semibold mb-3">İlan Önizlemesi</h1>
        <p className="text-gray-500">Ön izleme verisi bulunamadı.</p>
      </div>
    );
  }

  const listing = JSON.parse(draft);

  const handleEdit = () => {
    navigate("/ilan-ver");
    toast("Düzenleme moduna dönüldü", { icon: "✏️" });
  };

  const handlePublish = () => {
  import("../data/listings").then(({ savePublishedListing }) => {
    savePublishedListing(listing);
    toast.success("İlan başarıyla yayına alındı!");
    localStorage.removeItem("draftListing");
    setTimeout(() => navigate("/"), 2000);
  });
};



  return (
    <div className="max-w-screen-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">{listing.title}</h1>
      <p className="text-gray-700 mb-2">{listing.description}</p>
      <p className="text-gray-800 mb-2 font-medium">
        Fiyat: {listing.price} ₺
      </p>
      <p className="text-gray-800 mb-6">Konum: {listing.location}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {listing.images?.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`İlan görseli ${i + 1}`}
            className="rounded-xl w-full object-cover"
          />
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleEdit}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl px-5 py-2 transition"
        >
          Düzenle
        </button>
        <button
          onClick={handlePublish}
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl px-5 py-2 transition"
        >
          Yayına Al
        </button>
      </div>
    </div>
  );
}
