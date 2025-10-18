// src/pages/Arama.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Car,
  Briefcase,
  Wrench,
  BookOpen,
  PawPrint,
  Users,
  Mic,
} from "lucide-react";
import { rootCategories } from "../data/categories";

const iconMap = {
  home: Home,
  car: Car,
  briefcase: Briefcase,
  wrench: Wrench,
  book: BookOpen,
  paw: PawPrint,
  users: Users,
};

export default function Arama() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // 🎙️ Sesle arama
  function handleVoiceSearch() {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Tarayıcınız sesli aramayı desteklemiyor.");
      return;
    }
    const r = new window.webkitSpeechRecognition();
    r.lang = "tr-TR";
    r.interimResults = false;
    r.maxAlternatives = 1;
    r.start();
    r.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setQuery(text);
    };
    r.onerror = (e) => {
      console.error("Speech error:", e.error);
      alert("Mikrofon erişiminde bir hata oluştu.");
    };
  }

  // 🔎 Yazıya/konuşmaya göre filtre
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rootCategories;
    return rootCategories.filter((c) => {
      const name = (c.name || c.title || "").toLowerCase();
      const desc = (c.desc || c.description || "").toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [query]);

  return (
    <section className="mx-auto max-w-screen-md px-4 py-6 min-h-screen pb-24">
      {/* Arama kutusu */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4 shadow-sm">
        <input
          type="text"
          placeholder="Kelime veya ilan no. ile ara"
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleVoiceSearch}
          className="ml-2 text-orange-500"
          aria-label="Sesle ara"
          title="Sesle ara"
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>

      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Arama</h1>
        <p className="text-gray-600 mt-1">
          Kategori veya ilan adı ile arama yapabilirsiniz
        </p>
      </header>

      <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow-sm overflow-hidden">
        {filtered.map((cat) => {
          const Icon = iconMap[cat.icon] || Home;
          return (
            <li
              key={cat.slug}
              onClick={() => navigate(`/kategori/${cat.slug}`)}
              className="flex items-center justify-between p-4 hover:bg-orange-50 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="font-medium">
                    {cat.name || cat.title || cat.slug}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {cat.desc || cat.description}
                  </p>
                </div>
              </div>
              <span className="text-gray-400">{">"}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
