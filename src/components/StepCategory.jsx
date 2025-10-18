import React from "react";
import { rootCategories } from "../data/categories";

export default function StepCategory({ onSelect }) {
  const cats = Array.isArray(rootCategories) ? rootCategories : [];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-3">Kategori Seç</h1>

      {/* Basit arama kutusu istersen ileride burada state ekleriz */}
      <div className="mb-4">
        <input
          className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Kategori ara (yakında)"
          disabled
        />
      </div>

      <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow-sm overflow-hidden">
        {cats.map((cat) => (
          <li
            key={cat.slug}
            className="px-4 py-3 cursor-pointer hover:bg-orange-50"
            onClick={() => onSelect(cat)}
          >
            <div className="font-medium">{cat.title || cat.name || cat.slug}</div>
            {cat.description && (
              <div className="text-sm text-gray-500">{cat.description}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
