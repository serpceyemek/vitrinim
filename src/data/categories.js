// src/data/categories.js
// Basit bir örnek veri + yardımcı fonksiyonlar

const categories = [
  { id: 1, name: "Emlak", path: "emlak", slug: "emlak" },
  { id: 2, name: "Vasıta", path: "vasita", slug: "vasita" },
  { id: 3, name: "İkinci El & Alışveriş", path: "ikinci-el-alisveris", slug: "ikinci-el-alisveris" },
  // Elektronik'i İkinci El & Alışveriş altında örnekledim:
  { id: 4, name: "Elektronik", path: "elektronik", slug: "elektronik", parentId: 3 },
  { id: 5, name: "Hizmetler", path: "hizmetler", slug: "hizmetler" },
  { id: 6, name: "Eğitim", path: "egitim", slug: "egitim" },
];

export default categories;
export { categories };

export function topLevelCategories() {
  return categories.filter((c) => !c.parentId);
}

export function findCategoryByPath(path) {
  const p = String(path ?? "").toLowerCase();
  return (
    categories.find(
      (c) =>
        (c.path && String(c.path).toLowerCase() === p) ||
        (c.slug && String(c.slug).toLowerCase() === p)
    ) || null
  );
}

export function getChildren(categoryId) {
  return categories.filter((c) => c.parentId === categoryId);
}

export function getBreadcrumbByPath(path) {
  const leaf = findCategoryByPath(path);
  if (!leaf) return [];
  const trail = [];
  let cur = leaf;
  const byId = (id) => categories.find((c) => c.id === id);
  while (cur) {
    trail.unshift(cur);
    cur = cur.parentId ? byId(cur.parentId) : null;
  }
  return trail;
}
