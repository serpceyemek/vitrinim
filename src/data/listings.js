// src/data/listings.js
import { getLocalListings } from "../services/localListings.js"; // ← .js uzantısı

// Statik tohum veriler
export const SEED_LISTINGS = [
  { id: 1001, title: "Freelance Web Geliştirme Hizmeti", price: 15000, image: "", categoryId: 5, categoryPath: [5], postedAt: "2025-09-01", location: "Online", isFeatured: true },
  { id: 1002, title: "Merkezde 2+1 Geniş Daire",        price: 2750000, image: "", categoryId: 1, categoryPath: [1], postedAt: "2025-08-28", location: "Kadıköy, İstanbul", isFeatured: true },
  { id: 1003, title: "Tertemiz iPhone 14 Pro 256GB",     price: 38990,   image: "", categoryId: 4, categoryPath: [3, 4], postedAt: "2025-08-30", location: "Konak, İzmir",  isFeatured: false },
];

// Tekil ilan normalize edici
export function normalizeListing(l) {
  return {
    id: l.id,
    title: l.title || "",
    price: Number(l.price) || 0,
    image: l.image || (Array.isArray(l.images) && typeof l.images[0] === "string" ? l.images[0] : ""),
    location: l.location || "",
    postedAt: l.postedAt || new Date().toISOString(),
    categoryId: l.categoryId ?? null,
    categoryPath: l.categoryPath ?? (l.categoryId ? [l.categoryId] : []),
    isFeatured: Boolean(l.isFeatured),
    isLocal: Boolean(l.isLocal),
  };
}

// ID ile tek ilan
export function getListingById(id) {
  const all = [...SEED_LISTINGS, ...getLocalListings()];
  return all.find((l) => String(l.id) === String(id)) || null;
}

// Yerel + statik havuz (tekilleştirilmiş)
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

// 👉 Named export bekleyen yerler için stabil bir dizi verelim
export const listings = SEED_LISTINGS;

// 👉 Uyumluluk için default export da ver (hala bir yerde default import varsa build kırılmasın)
export default listings;
