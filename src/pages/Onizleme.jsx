// src/pages/Onizleme.jsx
import { useNavigate } from "react-router-dom";
import {
  getPreviewListing,
  publishListing,
  clearDraftListing,
  clearPreviewListing,
} from "../services/localListings";
import { toast } from "react-hot-toast";

export default function Onizleme() {
  const navigate = useNavigate();
  const listing = getPreviewListing();

  // Önizleme verisi yoksa: bilgilendir + ilan-ver'e dön
  if (!listing) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-semibold mb-2">İlan Önizlemesi</h1>
        <p className="text-gray-600 mb-6">Ön izleme verisi bulunamadı.</p>
        <button
          onClick={() => navigate("/magaza")}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          İlan Ver Sayfasına Dön
        </button>
      </div>
    );
  }

  // Tek yayınla handler’ı: yayınla → toast → verileri temizle → /ilan-ver (reset'li)
  const handlePublish = () => {
    try {
      publishListing(listing); // yerel listeye ekler
      toast.success("İlan yayınlandı!");
    } catch (e) {
      console.error(e);
      toast.error("Yayınlanırken bir sorun oluştu.");
    } finally {
      // taslak ve önizleme kalıntı bırakmasın
      clearPreviewListing();
      clearDraftListing();
      // ilan formu tertemiz açılsın
      navigate("/magaza", { replace: true });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">İlan Önizlemesi</h1>

      <div className="bg-white shadow-md rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-1">{listing.title}</h2>
        <p className="text-gray-600 mb-1">{listing.description}</p>
        <p className="text-black font-semibold mb-1">Fiyat: {listing.price} ₺</p>
        <p className="text-gray-500 mb-4">Konum: {listing.location}</p>

        {Array.isArray(listing.images) && listing.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {listing.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`görsel-${i}`}
                className="w-full h-40 object-cover rounded-md border"
                loading="lazy"
              />
            ))}
          </div>
        )}

        {/* alt kısım: butonlar (alt barda kapanmaması için extra alt boşluk) */}
        <div className="mt-6 pb-28 flex flex-col items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full max-w-xs px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium transition"
          >
            Geri Dön
          </button>

          <button
            onClick={handlePublish}
            className="w-full max-w-xs px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition"
          >
            Yayına Al
          </button>
        </div>
      </div>
    </div>
  );
}
