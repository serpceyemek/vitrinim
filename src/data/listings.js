// src/data/listings.js
import { getLocalListings } from "../services/localListings";

export const SEED_LISTINGS = [
  {
    id: 1001,
    title: "Freelance Web Geliştirme Hizmeti",
    price: 15000,
    image: "", // var olan kart görsel alanı boşsa da sorun olmaz
    categoryId: 5,
    categoryPath: [5],
    postedAt: "2025-09-01",
    location: "Online",
    isFeatured: true,
  },
  {
    id: 1002,
    title: "Merkezde 2+1 Geniş Daire",
    price: 2750000,
    image: "",
    categoryId: 1,
    categoryPath: [1],
    postedAt: "2025-08-28",
    location: "Kadıköy, İstanbul",
    isFeatured: true,
  },
  {
    id: 1003,
    title: "Tertemiz iPhone 14 Pro 256GB",
    price: 38990,
    image: "",
    categoryId: 4,
    categoryPath: [3, 4], // üst: ikinci-el-alisveris, alt: elektronik
    postedAt: "2025-08-30",
    location: "Konak, İzmir",
    isFeatured: false,
  },
];

export function normalizeListing(l) {
  return {
    id: l.id,
    title: l.title || "",
    price: Number(l.price) || 0,
    image:
      l.image ||
      (Array.isArray(l.images) && typeof l.images[0] === "string" ? l.images[0] : ""),
    location: l.location || "",
    postedAt: l.postedAt || new Date().toISOString(),
    categoryId: l.categoryId ?? null,
    categoryPath: l.categoryPath ?? (l.categoryId ? [l.categoryId] : []),
    isFeatured: Boolean(l.isFeatured),
    isLocal: Boolean(l.isLocal),
  };
}

export function getListingById(id) {
  const all = [...SEED_LISTINGS, ...getLocalListings()];
  return all.find((l) => String(l.id) === String(id)) || null;
}

// Yerel + statik ilanları birleştir, yerel olanlar öncelikli ve tekilleştir
export function useListingPool() {
  const local = getLocalListings() || [];
  const staticOnes = SEED_LISTINGS || [];

  // id -> listing tekilleştirme (önce yerel, sonra statik)
  const byId = new Map();
  for (const raw of [...local, ...staticOnes]) {
    const n = normalizeListing(raw);
    const key = String(n.id);
    if (!byId.has(key)) byId.set(key, n);
  }

  return Array.from(byId.values());
}

 export default listings;
 