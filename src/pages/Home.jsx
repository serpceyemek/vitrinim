import React from "react";
import { getLocalListings } from "../services/localListings";

export default function Home() {
  const listings = getLocalListings() || [];
  return (
  <section className="mx-auto max-w-screen-xl px-4 pb-24 pt-4 sm:pt-6">
    {/* Başlık */}
    <header className="text-center mt-4 mb-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 mb-1">
        Mağaza
      </h1>
      <p className="text-gray-500 text-sm">
        Tüm kategorilerden öne çıkan ilanlar
      </p>
    </header>

    {/* Grid düzeni */}
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listings.map((listing, idx) => {
        const imgSrc =
          listing.image ||
          listing.img ||
          listing.photo ||
          listing.thumbnail ||
          "";

        return (
          <article
            key={listing.id ?? idx}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer"
          >
            {/* Görsel */}
            <div className="relative w-full aspect-[16/10] bg-gray-200">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                  backgroundImage: `url('${
                    imgSrc ||
                    "https://via.placeholder.com/800x480?text=Vitrinim"
                  }')`,
                }}
                role="img"
                aria-label={listing.title ?? "İlan görseli"}
              />
            </div>

            {/* Metin alanı */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {listing.title ?? "Başlık"}
              </h3>

              {listing.price ? (
                <p className="text-orange-600 font-semibold text-sm mt-1">
                  {listing.price}
                </p>
              ) : (
                <p className="text-gray-400 text-sm italic mt-1">
                  Fiyat belirtilmemiş
                </p>
              )}

              {listing.location && (
                <p className="text-gray-500 text-xs mt-2">
                  {listing.location}
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  </section>
)};