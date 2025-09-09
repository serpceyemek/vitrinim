// src/data/listings.js
import { getLocalListings } from "../services/localListings";

/** Örnek (seed) ilanlar – tüm üst kategoriler kapsansın diye 1..6 */
export const SEED_LISTINGS = [
  // 1) Emlak
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
  // 2) Vasıta
  {
    id: 2001,
    title: "Temiz Renault Clio 1.3, 2019, 85.000 km",
    price: 465000,
    image: "",
    categoryId: 2,
    categoryPath: [2],
    postedAt: "2025-09-03",
    location: "Keçiören, Ankara",
    isFeatured: true,
  },
  // 3) İkinci El & Alışveriş  (üst)
  {
    id: 3001,
    title: "Sıfıra yakın kamp çadırı (2 kişilik)",
    price: 2500,
    image: "",
    categoryId: 3,
    categoryPath: [3],
    postedAt: "2025-09-05",
    location: "Nilüfer, Bursa",
    isFeatured: false,
  },
  // 4) Elektronik (İkinci El altında)
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
  // 5) Hizmetler
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
  // 6) Eğitim
  {
    id: 6001,
    title: "Birebir Matematik Özel Ders (LGS-YKS)",
    price: 500,
    image: "",
    categoryId: 6,
    categoryPath: [6],
    postedAt: "2025-09-06",
    location: "Bornova, İzmir",
    isFeatured: true,
  },
];

/** İlan normalize */
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

/** ID ile ilan bul */
export function getListingById(id) {
  const all = [...SEED_LISTINGS, ...getLocalListings()];
  return all.find((l) => String(l.id) === String(id)) || null;
}

/** Yerel + statik havuz (tekilleştirilmiş, yerel öncelikli) */
export function useListingPool() {
  const local = getLocalListings() || [];
  const staticOnes = SEED_LISTINGS || [];
  const byId = new Map();
  for (const raw of [...local, ...staticOnes]) {
    const n = normalizeListing(raw);
    const key = String(n.id);
    if (!byId.has(key)) byId.set(key, n);
  }
  return Array.from(byId.values());
}
