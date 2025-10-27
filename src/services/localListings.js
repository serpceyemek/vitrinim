export function getLocalListings() {
  return [
    {
      id: 1,
      title: "3+1 Modern Daire",
      price: "2.150.000 ₺",
      location: "İstanbul / Kadıköy",
      image: "https://picsum.photos/seed/ev1/800/480",
    },
    {
      id: 2,
      title: "SUV 2020 Model",
      price: "950.000 ₺",
      location: "İzmir / Karşıyaka",
      image: "https://picsum.photos/seed/araba/800/480",
    },
  ];
}

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

export function clearDraftListing() {
  try {
    localStorage.removeItem("draftListing");
  } catch {}
}

export function clearPreviewListing() {
  try {
    localStorage.removeItem("previewListing");
  } catch {}
}

export function publishListing(listing) {
  try {
    const all = JSON.parse(localStorage.getItem("publishedListings") || "[]");
    const newListing = {
      ...listing,
      id: Date.now(),
      isLocal: true,
      postedAt: new Date().toISOString(),
    };
    const updated = [newListing, ...all];
    localStorage.setItem("publishedListings", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Yayınlanmış ilan kaydedilemedi:", e);
  }
}
