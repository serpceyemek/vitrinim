// src/data/listings.js
import { getLocalListings } from "../services/localListings";

// Örnek (seed) ilanlar
export const SEED_LISTINGS = [
  {
    id: 1001,
    title: "Freelance Web Geliştirme Hizmeti",
    price: 15000,
    image: "",
    categoryId: 5,          // Hizmetler
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
    categoryId: 1,          // Emlak
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
    categoryId: 4,          // Elektronik (üstü: İkinci El & Alışveriş = 3)
    categoryPath: [3, 4],
    postedAt: "2025-08-30",
    location: "Konak, İzmir",
    isFeatured: false,
  },
  {
    id: 1004,
    title: "Temiz Hatchback 2016",
    price: 465000,
    image: "",
    categoryId: 2,          // Vasıta
    categoryPath: [2],
    postedAt: "2025-09-02",
    location: "Keçiören, Ankara",
    isFeatured: false,
  },
  {
    id: 1005,
    title: "Matematik Özel Ders (LGS/AYT)",
    price: 600,
    image: "",
    categoryId: 6,          // Eğitim
    categoryPath: [6],
    postedAt: "2025-09-03",
    location: "Online",
    isFeatured: false,
  },
];

// İlanı tek biçime çevir
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

// Tek ilan getir (ID ile)
export function getListingById(id) {
  const pool = useListingPool();
  return pool.find((l) => String(l.id) === String(id)) || null;
}

// Yerel + seed ilanları birleştir; yerel olanlar öncelikli ve tekilleştirilmiş
export function useListingPool() {
  const localArr = (() => {
    try {
      const v = getLocalListings?.();
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  })();

  const staticArr = SEED_LISTINGS;

  const byId = new Map();
  for (const raw of [...localArr, ...staticArr]) {
    const n = normalizeListing(raw);
    const key = String(n.id);
    if (!byId.has(key)) byId.set(key, n); // yerel ilan varsa seed'i ezer
  }

  return Array.from(byId.values());
}
