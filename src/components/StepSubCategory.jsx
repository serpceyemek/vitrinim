
import React, { useMemo, useEffect } from "react";
import { postingTree } from "../data/postingTree";

export default function StepSubCategory({ category, onBack, onSelect }) {
  const subs = useMemo(() => {
    if (!category) return [];
    // postingTree[category.slug] bekliyoruz: [{ title, slug }, ...]
    const node = postingTree?.[category.slug];
    if (Array.isArray(node)) return node;
    // Bazı veri yapılarında children altında olabilir
    if (node?.children && Array.isArray(node.children)) return node.children;
    return [];
  }, [category]);

   useEffect(() => {
    if (subs.length === 0 && category) {
      // Alt kategori yoksa direkt form adımına geç
      onSelect({ slug: null, title: category.title || category.name });
    }
  }, [subs, category, onSelect]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={onBack}
          className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
        >
          ← Geri
        </button>
        <h1 className="text-xl font-semibold">
          {category?.title || category?.name || "Alt Kategori"}
        </h1>
      </div>

      {subs.length === 0 ? (
        <div className="rounded-xl border p-4 bg-gray-50">
          Bu kategori için alt kategori bulunamadı. Doğrudan devam edebilirsin.
          <div className="mt-3">
            <button
              onClick={() => onSelect({ slug: null, title: "Genel" })}
              className="rounded-2xl bg-orange-500 px-4 py-2 text-white font-semibold hover:bg-orange-600"
            >
              Bu kategoride devam et
            </button>
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow-sm overflow-hidden">
          {subs.map((s) => (
            <li
              key={s.slug || s.title}
              className="px-4 py-3 cursor-pointer hover:bg-orange-50"
              onClick={() => onSelect(s)}
            >
              <div className="font-medium">{s.title || s.name || s.slug}</div>
              {s.description && (
                <div className="text-sm text-gray-500">{s.description}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
