// src/data/categories.js
// Vitrinim — Kategori verisi (MVP)

export const categories = [
  // ——— EMLAK ———
  { id: "emlak", slug: "emlak", path: "emlak", name: "Emlak" },
  { id: "emlak-konut", slug: "konut", path: "emlak/konut", name: "Konut", parentId: "emlak" },
  { id: "emlak-konut-satilik", slug: "satilik", path: "emlak/konut/satilik", name: "Satılık", parentId: "emlak-konut" },
  { id: "emlak-konut-kiralik", slug: "kiralik", path: "emlak/konut/kiralik", name: "Kiralık", parentId: "emlak-konut" },

  { id: "emlak-is-yeri", slug: "is-yeri", path: "emlak/is-yeri", name: "İş Yeri", parentId: "emlak" },
  { id: "emlak-is-yeri-satilik", slug: "satilik", path: "emlak/is-yeri/satilik", name: "Satılık", parentId: "emlak-is-yeri" },
  { id: "emlak-is-yeri-kiralik", slug: "kiralik", path: "emlak/is-yeri/kiralik", name: "Kiralık", parentId: "emlak-is-yeri" },

  { id: "emlak-arsa", slug: "arsa", path: "emlak/arsa", name: "Arsa", parentId: "emlak" },
  { id: "emlak-arsa-satilik", slug: "satilik", path: "emlak/arsa/satilik", name: "Satılık", parentId: "emlak-arsa" },
  { id: "emlak-arsa-kiralik", slug: "kiralik", path: "emlak/arsa/kiralik", name: "Kiralık", parentId: "emlak-arsa" },

  // ——— VASITA ———
  { id: "vasita", slug: "vasita", path: "vasita", name: "Vasıta" },
  { id: "vasita-otomobil", slug: "otomobil", path: "vasita/otomobil", name: "Otomobil", parentId: "vasita" },
  { id: "vasita-motosiklet", slug: "motosiklet", path: "vasita/motosiklet", name: "Motosiklet", parentId: "vasita" },
  { id: "vasita-ticari-arac", slug: "ticari-arac", path: "vasita/ticari-arac", name: "Ticari Araç", parentId: "vasita" },
  { id: "vasita-deniz-araclari", slug: "deniz-araclari", path: "vasita/deniz-araclari", name: "Deniz Araçları", parentId: "vasita" },
  { id: "vasita-hasarli-parca", slug: "hasarli-parca", path: "vasita/hasarli-parca", name: "Hasarlı / Parça", parentId: "vasita" },

  // ——— İŞ / ELEMAN ———
  { id: "is-eleman", slug: "is-eleman", path: "is-eleman", name: "İş / Eleman" },
  { id: "is-eleman-tam-zamanli", slug: "tam-zamanli", path: "is-eleman/tam-zamanli", name: "Tam Zamanlı", parentId: "is-eleman" },
  { id: "is-eleman-yari-zamanli", slug: "yari-zamanli", path: "is-eleman/yari-zamanli", name: "Yarı Zamanlı", parentId: "is-eleman" },
  { id: "is-eleman-uzaktan", slug: "uzaktan", path: "is-eleman/uzaktan", name: "Uzaktan", parentId: "is-eleman" },

  // ——— HİZMETLER ———
  { id: "hizmetler", slug: "hizmetler", path: "hizmetler", name: "Hizmetler" },
  { id: "hizmetler-temizlik", slug: "temizlik", path: "hizmetler/temizlik", name: "Temizlik", parentId: "hizmetler" },
  { id: "hizmetler-bakici", slug: "bakici", path: "hizmetler/bakici", name: "Bakıcı", parentId: "hizmetler" },
  { id: "hizmetler-usta", slug: "usta", path: "hizmetler/usta", name: "Usta", parentId: "hizmetler" },
  { id: "hizmetler-nakliye", slug: "nakliye", path: "hizmetler/nakliye", name: "Nakliye", parentId: "hizmetler" },

  // ——— İKİNCİ EL & ALIŞVERİŞ ———
  { id: "ikinci-el", slug: "ikinci-el", path: "ikinci-el", name: "İkinci El & Alışveriş" },
  { id: "ikinci-el-elektronik", slug: "elektronik", path: "ikinci-el/elektronik", name: "Elektronik", parentId: "ikinci-el" },
  { id: "ikinci-el-mobilya", slug: "mobilya", path: "ikinci-el/mobilya", name: "Mobilya", parentId: "ikinci-el" },
  { id: "ikinci-el-giyim", slug: "giyim", path: "ikinci-el/giyim", name: "Giyim", parentId: "ikinci-el" },
  { id: "ikinci-el-hobi-oyuncak", slug: "hobi-oyuncak", path: "ikinci-el/hobi-oyuncak", name: "Hobi & Oyuncak", parentId: "ikinci-el" },

  // ——— EĞİTİM ———
  { id: "egitim", slug: "egitim", path: "egitim", name: "Eğitim" },
  { id: "egitim-ders-veren", slug: "ders-veren", path: "egitim/ders-veren", name: "Ders Veren", parentId: "egitim" },
  { id: "egitim-ders-alan", slug: "ders-alan", path: "egitim/ders-alan", name: "Ders Alan", parentId: "egitim" },
  { id: "egitim-kurs", slug: "kurs", path: "egitim/kurs", name: "Kurs", parentId: "egitim" },
  { id: "egitim-atolye", slug: "atolye", path: "egitim/atolye", name: "Atölye", parentId: "egitim" },
];

// Yardımcılar
export function getChildren(parentId) {
  return categories.filter((c) => c.parentId === parentId);
}
export function findCategoryByPath(path) {
  return categories.find((c) => c.path === path);
}
export function getBreadcrumbByPath(path) {
  const parts = path.split("/");
  const crumbs = [];
  for (let i = 0; i < parts.length; i++) {
    const p = parts.slice(0, i + 1).join("/");
    const cat = findCategoryByPath(p);
    if (cat) crumbs.push(cat);
  }
  return crumbs;
}
export const topLevelCategories = categories
  .filter((c) => !c.parentId)
  .map((c) => ({ id: c.id, slug: c.slug, path: c.path, name: c.name }));
