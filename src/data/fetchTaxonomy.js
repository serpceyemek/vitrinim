// src/data/fetchTaxonomy.js
import localTaxonomy from "./taxonomy.json";

export async function fetchTaxonomy() {
  const url = "https://script.google.com/macros/s/AKfycbw-ckiSJ5ODuC0QUyR3T1LiWSpcXjW2FCMN4JH71DoXOJWoaBYMnSnO9C-Ca8YnzWGm/exec";
  const cacheBust = `_=${Date.now()}`;

  try {
    const response = await fetch(`${url}?${cacheBust}`);
    if (!response.ok) throw new Error(`HTTP hata: ${response.status}`);
    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
      console.warn("⚠️ Google Script boş veri döndürdü, local taxonomy.json kullanılıyor.");
      return localTaxonomy;
    }

    console.log("✅ Taxonomy verisi alındı:", data);
    return data;
  } catch (err) {
    console.error("🚨 Taxonomy verisi alınamadı:", err);
    console.log("📦 Local taxonomy yüklendi.");
    return localTaxonomy;
  }
}
