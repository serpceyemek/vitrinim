// src/data/listings.js — kanonik havuz (tek kaynak: seed + localStorage)

export const SEED_LISTINGS = [
  { id: "ilan-1001", title: "Merkezde 2+1 Geniş Daire", price: 2750000,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    location: "Kadıköy, İstanbul", postedAt: "2025-08-28", category: "Emlak",
    isFeatured: true, description: "Merkezî konumda, ulaşım ve alışveriş noktalarına yakın, bakımlı 2+1 daire." },
  { id: "ilan-1002", title: "Tertemiz iPhone 14 Pro 256GB", price: 38990,
    image: "https://images.unsplash.com/photo-1603899122328-2eaa9c9c5c65?q=80&w=1200&auto=format&fit=crop",
    location: "Konak, İzmir", postedAt: "2025-08-30", category: "İkinci El",
    isFeatured: true, description: "Kutusu ve faturası mevcut. Pil sağlığı %92." },
  { id: "ilan-1003", title: "Sıfır Ayarında Elektrikli Scooter", price: 9500,
    image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1200&auto=format&fit=crop",
    location: "Nilüfer, Bursa", postedAt: "2025-08-20", category: "İkinci El",
    isFeatured: false, description: "30km menzil, hızlı şarj, katlanabilir." },
  { id: "ilan-1004", title: "Freelance Web Geliştirme Hizmeti", price: 15000,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop",
    location: "Online", postedAt: "2025-09-01", category: "Hizmet",
    isFeatured: true, description: "React, Next.js, Tailwind projeleri." },
  { id: "ilan-1005", title: "Aracılık Yok: 2016 Model Dizel Hatchback", price: 455000,
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1200&auto=format&fit=crop",
    location: "Yenimahalle, Ankara", postedAt: "2025-08-15", category: "Vasıta",
    isFeatured: false, description: "Yetkili servis bakımlı, düşük tramer." },
  { id: "ilan-1006", title: "Sıfır Kutu Gaming PC (Ryzen)", price: 32990,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    location: "Pendik, İstanbul", postedAt: "2025-08-18", category: "Teknoloji",
    isFeatured: false, description: "Ryzen 5 / 16GB / 1TB SSD." },
];

// Tarayıcıdaki gerçek anahtarınla uyumlu:
const LS_KEY_PRIMARY = "user_listings";
const LS_KEY_FALLBACK = "vitrinim_listings_local";

function safeParse(json) {
  try { const v = JSON.parse(json); return Array.isArray(v) ? v : []; } catch { return []; }
}

export function readLocalListings() {
  const r1 = localStorage.getItem(LS_KEY_PRIMARY);  if (r1) return safeParse(r1);
  const r2 = localStorage.getItem(LS_KEY_FALLBACK); if (r2) return safeParse(r2);
  return [];
}

export function writeLocalListings(arr) {
  try { localStorage.setItem(LS_KEY_PRIMARY, JSON.stringify(arr || [])); } catch {}
}

export function normalizeListing(l, idx = 0) {
  const now = new Date();
  return {
    id: l.id || `local-${now.getTime()}-${idx}`,
    title: l.title || `Başlıksız #${idx}`,
    price: Number.isFinite(l.price) ? l.price : 0,
    image: l.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&auto=format&fit=crop",
    location: l.location || "Türkiye",
    postedAt: (l.postedAt || now.toISOString()).slice(0, 10),
    category: l.category || "Diğer",
    isFeatured: Boolean(l.isFeatured),
    description: l.description || "",
  };
}

// React hook: statik + yerel birleşik havuz
import { useEffect, useMemo, useState } from "react";
export function useListingPool() {
  const [localListings, setLocalListings] = useState(() => readLocalListings().map(normalizeListing));

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === LS_KEY_PRIMARY || e.key === LS_KEY_FALLBACK) {
        setLocalListings(readLocalListings().map(normalizeListing));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const pool = useMemo(() => {
    const map = new Map();
    for (const s of SEED_LISTINGS) map.set(s.id, s);
    localListings.forEach((l, i) => map.set(l.id || `local-${i}`, normalizeListing(l, i)));
    return Array.from(map.values());
  }, [localListings]);

  return { pool, localCount: localListings.length };
}

export function getListingById(pool, id) {
  return pool.find((l) => l.id === id);
}
