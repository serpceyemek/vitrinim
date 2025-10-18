import React, { useState } from "react";
import { rootCategories } from "../data/categories";

export default function StepCategory({ onSelect }) {
  const cats = Array.isArray(rootCategories) ? rootCategories : [];
  const [search, setSearch] = useState("");

  const filtered = cats.filter((c) =>
    (c.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-center">İlan Ver</h1>

      <div className="flex items-center gap-2 mb-4">
        <input
          className="flex-1 rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Kategori ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => alert('Sesli arama yakında eklenecek 🎙️')}
          className="rounded-full border border-gray-300 p-2 hover:bg-gray-50"
        >
          🎤
        </button>
      </div>

      <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow-sm overflow-hidden">
        {filtered.map((cat) => (
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
