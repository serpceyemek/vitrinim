// src/pages/NewListingStep.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postingTree } from "../data/postingTree";
import { ChevronRight, Mic } from "lucide-react";

function buildKey(...parts) {
  return parts.filter(Boolean).join("/");
}

export default function NewListingStep() {
  const navigate = useNavigate();
  const { slug1, slug2, slug3 } = useParams();
  const key = buildKey(slug1, slug2, slug3);

  const node = postingTree[key];
  if (!node) {
    navigate("/ilan-ver", { replace: true });
    return null;
  }

  const goDeeper = (childSlug) => {
    const next = buildKey(slug1, slug2, slug3, childSlug);
    const hasMore = postingTree[next];
    navigate(hasMore ? `/ilan-ver/${next}` : `/ilan-ver/form?path=${next}`);
  };

  return (
    <section className="p-4 flex flex-col h-[calc(100vh-130px)] overflow-hidden">
      {/* 🔍 Arama Kutusu + Mikrofon */}
      {/* 🔸 Arama kutusu sadece ana “/ilan-ver” sayfasında görünsün */}
{!node.slug && (
  <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4 shadow-sm">
    <input
      type="text"
      placeholder="Ne satıyorsun/kiralıyorsun? (Ör: Koltuk)"
      className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
    />
    <button
      onClick={() => alert('Sesli arama özelliği yakında eklenecek!')}
      className="ml-2 text-orange-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v9m0 0v9m0-9H3m9 0h9" />
      </svg>
    </button>
  </div>
)}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4 shadow-sm">
        <input
          type="text"
          placeholder="Ne satıyorsun/kiralıyorsun? (Ör: Koltuk)"
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
        <button
          onClick={() => alert('Sesli arama özelliği yakında!')}
          className="ml-2 text-orange-500"
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-1">İlan Ver</h2>
      <p className="text-gray-500 mb-4">Adım adım kategori seçimi</p>

      <div className="flex-1 overflow-y-auto pb-24">
        {node.children?.length ? (
          <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow-sm overflow-hidden">
            {node.children.map((c) => (
              <li
                key={c.slug}
                onClick={() => goDeeper(c.slug)}
                className="flex items-center justify-between p-4 hover:bg-orange-50 cursor-pointer transition-all"
              >
                <span className="font-medium">{c.title}</span>
                <ChevronRight className="text-gray-400 w-5 h-5" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            Bu seviyede alt kategori yok. (Form aşamasına yönlendirileceksiniz.)
          </div>
        )}
      </div>
    </section>
  );
}
