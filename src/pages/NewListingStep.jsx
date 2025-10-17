// src/pages/NewListingStep.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postingTree } from "../data/postingTree";
import { ChevronRight } from "lucide-react";

function buildKey(...parts) {
  return parts.filter(Boolean).join("/");
}

export default function NewListingStep() {
  const navigate = useNavigate();
  const { slug1, slug2, slug3 } = useParams();
  const key = buildKey(slug1, slug2, slug3);

  // mevcut düğümü bul
  const node = postingTree[key];
  if (!node) {
    // yanlış yol → başa dön
    navigate("/ilan-ver", { replace: true });
    return null;
  }

  // bir alt seviyeye git
  const goDeeper = (childSlug) => {
    const next = buildKey(slug1, slug2, slug3, childSlug);
    // eğer daha derin seviye varsa oraya; yoksa form yerine placeholder sayfaya
    const hasMore = postingTree[next];
    navigate(hasMore ? `/ilan-ver/${next}` : `/ilan-ver/form?path=${next}`);
  };

  return (
    <section className="mx-auto max-w-screen-md px-4 py-6">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">İlan Ver</h1>
        <p className="text-gray-600 mt-1">{node.title}</p>
      </header>

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
        <div className="text-center text-gray-500">
          Bu seviyede alt kategori yok. (Form aşamasına yönlendirileceksiniz.)
        </div>
      )}
    </section>
  );
}
