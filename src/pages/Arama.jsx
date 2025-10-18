// src/pages/Arama.jsx
import React from "react";
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

  return (
    <section className="mx-auto max-w-screen-md px-4 py-6 min-h-screen pb-24">
      {/* Arama kutusu */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4 shadow-sm">
        <input
          type="text"
          placeholder="Kelime veya ilan no. ile ara"
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
        <button
          onClick={() => alert("Sesli arama yakında!")}
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
        {rootCategories.map((cat) => {
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
                  <p className="font-medium">{cat.name}</p>
                  <p className="text-gray-500 text-sm">{cat.desc}</p>
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
