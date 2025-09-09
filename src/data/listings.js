// src/data/listings.js
import { getLocalListings } from "../services/localListings";

export const SEED_LISTINGS = [
  {
    id: 1001,
    title: "Freelance Web Geliştirme Hizmeti",
    price: 15000,
    image: "",
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
    categoryPath: [3, 4], // üst: ikinci el, alt: elektronik
    postedAt: "2025-08-30",
    location: "Konak, İzmir",
  },
  {
    id: 3001,
    title: "Temiz Renault Clio 1.3, 2019, 85.000 km",
    price: 485000,
    image: "",
    categoryId: 2,
    categoryPath: [2],     // Vasıta
    postedAt: "2025-09-03",
    location: "Keçiören, Ankara",
  },
  {
    id: 2001,
    title: "Sıfıra yakın kamp çadırı (2 kişilik)",
    price: 2500,
    image: "",
    categoryId: 3,
    categoryPath: [3],     // İkinci El & Alışveriş
    postedAt: "2025-09-05",
    location: "Nilüfer, Bursa",
  },
  {
    id: 6001,
    title: "Birebir Matematik Özel Ders (LGS-YKS)",
    price: 500,
    image: "",
    categoryId: 6,
    categoryPath: [6],     // Eğitim
    postedAt: "2025-09-06",
    location: "Bornova, İzmir",
  },
];

export function normalizeListing(l) {
  const firstImage =
    Array.isArray(l.images) && typeof l.images[0] === "string"
      ? l.images[0]
      : (l.image || "");

  return {
    id: String(l.id),
    title: l.title || "",
    price: Number(l.price) || 0,
    image: firstImage,
    images: Array.isArray(l.images) ? l.images : (firstImage ? [firstImage] : []),
    location: l.location || "",
    postedAt: l.postedAt || new Date().toISOString(),
    categoryId: l.categoryId ?? null,
    categoryPath: l.categoryPath ?? (l.categoryId ? [l.categoryId] : []),
    isFeatured: Boolean(l.isFeatured),
    isLocal: Boolean(l.isLocal),
  };
}

export function getListingById(id) {
  const all = [...SEED_LISTINGS, ...(getLocalListings() || [])].map(normalizeListing);
  return all.find((l) => String(l.id) === String(id)) || null;
}

// Yerel + statik ilanları tek havuzda birleştir ve id'ye göre tekilleştir
export function useListingPool() {
  const local = getLocalListings() || [];
  const staticOnes = SEED_LISTINGS;

  const byId = new Map();
  for (const raw of [...local, ...staticOnes]) {
    const n = normalizeListing(raw);
    const key = String(n.id);
    if (!byId.has(key)) byId.set(key, n); // yerel varsa öncelik yerelde
  }
  return Array.from(byId.values());
}
