// src/services/localListings.js
export function addLocalListing(item) {
  console.log("[addLocalListing] run", item);
  // ...
}

export const STORAGE_KEY = "user_listings";

export function getLocalListings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addLocalListing(item) {
 console.log("[addLocalListing] run", item);
 const list = getLocalListings();
  const id = "local-" + Date.now();
  const createdAt = new Date().toISOString();

  const record = {
    id,
    createdAt,
    title: item.title,
    price: Number(item.price) || 0,
    categoryId: item.categoryId,
    desc: item.desc || "",
    image: item.image || "https://placehold.co/640x400?text=ilan",
  };

  list.push(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return record;
}
