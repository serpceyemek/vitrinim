// src/services/localListings.js
const STORAGE_KEY = "local_listings_v1";

export function getLocalListings() {
  try {
    const raw =
      typeof localStorage !== "undefined"
        ? localStorage.getItem(STORAGE_KEY)
        : null;
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function writeLocalListings(listings) {
  try {
    const arr = Array.isArray(listings) ? listings : [];
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    }
    return true;
  } catch {
    return false;
  }
}
