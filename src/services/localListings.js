// src/services/localListings.js
const KEY = "vitrinim_local_listings";

export function getLocalListings() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writeLocalListings(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
}

export function addLocalListing(item) {
  const list = getLocalListings();
  const id = "local-" + Date.now();
  const record = {
    ...item,
    id,
    createdAt: new Date().toISOString(),
    isLocal: true,
  };
  list.unshift(record);
  writeLocalListings(list);
  return record;
}

// Eski (yanlış küçük harfli) import'lar bozulmasın diye takma adlar:
export const getlocalListings = getLocalListings;
export const writelocalListings = writeLocalListings;
