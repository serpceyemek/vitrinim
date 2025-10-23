// src/services/localListings.js

export function getLocalListings() {
  return [
    {
      id: 1,
      title: "3+1 Modern Daire",
      price: "2.150.000 ₺",
      location: "İstanbul / Kadıköy",
      image: "https://picsum.photos/seed/ev1/800/480"
    },
    {
      id: 2,
      title: "SUV 2020 Model",
      price: "950.000 ₺",
      location: "İzmir / Karşıyaka",
      image: "https://picsum.photos/seed/araba/800/480"
    },
    {
      id: 3,
      title: "Full Stack Yazılımcı İş İlanı",
      price: "Maaş: 45.000 ₺",
      location: "Remote / Türkiye",
      image: "https://picsum.photos/seed/yazilim/800/480"
    },
    {
      id: 4,
      title: "Antika Masa Takımı",
      price: "7.500 ₺",
      location: "Bursa / Nilüfer",
      image: "https://picsum.photos/seed/antika/800/480"
    },
    {
      id: 5,
      title: "Elektrikli Scooter",
      price: "18.900 ₺",
      location: "Ankara / Çankaya",
      image: "https://picsum.photos/seed/scooter/800/480"
    }
  ];
}

// --- Önizleme ilanını sakla ve getir --- //
export function savePreviewListing(listing) {
  try {
    localStorage.setItem("previewListing", JSON.stringify(listing));
  } catch (e) {
    console.error("Önizleme kaydedilemedi:", e);
  }
}

export function getPreviewListing() {
  try {
    const raw = localStorage.getItem("previewListing");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Önizleme okunamadı:", e);
    return null;
  }
}

export function clearPreviewListing() {
  localStorage.removeItem("previewListing");
}
