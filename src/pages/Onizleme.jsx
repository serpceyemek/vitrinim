import { useNavigate } from "react-router-dom";
import { getPreviewListing } from "../services/localListings";

export default function Onizleme() {
  const navigate = useNavigate();
  const listing = getPreviewListing();

  if (!listing) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-semibold mb-2">İlan Önizlemesi</h1>
        <p className="text-gray-600 mb-6">Ön izleme verisi bulunamadı.</p>
        <button
          onClick={() => navigate("/ilan-ver")}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          İlan Ver Sayfasına Dön
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">İlan Önizlemesi</h1>

      <div className="bg-white shadow-md rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-1">{listing.title}</h2>
        <p className="text-gray-600 mb-1">{listing.description}</p>
        <p className="text-black font-semibold mb-1">
          Fiyat: {listing.price} ₺
        </p>
        <p className="text-gray-500 mb-4">Konum: {listing.location}</p>

        {listing.images && listing.images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {listing.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`görsel-${i}`}
                className="w-full h-32 object-cover rounded-md border"
              />
            ))}
          </div>
        )}

                <div className="flex justify-between mt-6 pb-24">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
          >
            Geri Dön
          </button>

          <button
            onClick={() => navigate("/magaza")}
            className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
          >
            Yayına Al
          </button>
        </div>
      </div>
    </div>
  );
}
