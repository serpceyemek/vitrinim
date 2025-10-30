// src/pages/Arama.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postingTree } from "../data/postingTree";
import { ChevronRight, ArrowLeft, Home, Mic } from "lucide-react";

export default function Arama() {
  const [path, setPath] = useState([]); // örn: ["emlak", "konut", "satilik"]
  const navigate = useNavigate();

  // 🔹 Kök anahtarlar
  const rootKeys = useMemo(
    () => Object.keys(postingTree).filter((k) => !k.includes("/")),
    []
  );

  // 🔹 Şu anki dal
  const currentKey = path.join("/");
  const currentNode = path.length === 0 ? null : postingTree[currentKey] || null;

  // 🔹 Breadcrumb (Emlak › Konut › Satılık)
  const breadcrumb = useMemo(() => {
    if (path.length === 0) return [];
    return path.map((_, i) => {
      const key = path.slice(0, i + 1).join("/");
      return postingTree[key]?.title || key;
    });
  }, [path]);

  // 🔹 Üst kategoriye tıklama
  const handleSelectRoot = (rootKey) => setPath([rootKey]);

  // 🔹 Alt dal seçimi
  const handleSelectChild = (slug) => {
    const newPath = [...path, slug];
    const nextKey = newPath.join("/");

    if (postingTree[nextKey]) {
      setPath(newPath);
    } else {
      // 🌳 Hayat Ağacı: seçilen dalı kaydet
      const selectedChild = currentNode?.children?.find((c) => c.slug === slug);
      const selectedTitle =
        (currentNode?.title || "") + " › " + (selectedChild?.title || slug);

      localStorage.setItem("selectedCategoryPath", JSON.stringify(newPath));
      localStorage.setItem("selectedCategoryTitle", selectedTitle);

      const leafCat = `${currentKey}/${slug}`;
      setTimeout(() => {
        navigate(`/magaza?cat=${encodeURIComponent(leafCat)}`, {
          replace: true,
        });
      }, 100);
    }
  };

  const handleBack = () => {
    if (path.length > 0) setPath(path.slice(0, -1));
  };

  const handleHome = () => setPath([]);

  return (
    <div className="min-h-[calc(100vh-88px)] bg-white p-4 pb-[88px] max-w-2xl mx-auto">
      {/* 🔸 Başlık ve kontrol butonları */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h1 className="text-xl font-semibold text-gray-800">
          {currentNode ? currentNode.title : "Kategoriler"}
        </h1>

        <div className="flex gap-3">
          {path.length > 0 && (
            <>
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft size={16} /> Geri
              </button>
              <button
                onClick={handleHome}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
              >
                <Home size={16} /> Ana Sayfa
              </button>
            </>
          )}
        </div>
      </div>

      {/* 🔍 Arama çubuğu */}
      <div className="mb-4 flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm">
        <input
          type="text"
          placeholder="Kategori veya ilan adı ile ara..."
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
        />
        <button className="ml-2 text-orange-500 hover:text-orange-600">
          <Mic size={18} />
        </button>
      </div>

      {/* 🔸 Breadcrumb (yol göstergesi) */}
      {breadcrumb.length > 0 && (
        <div className="text-sm text-gray-500 mb-3 px-2">
          {breadcrumb.join(" › ")}
        </div>
      )}

      {/* 🔸 Kategori listesi (dikey görünüm, İlan Ver ile hizalı) */}
      <div className="flex flex-col gap-2 px-2">
        {(path.length === 0 ? rootKeys : currentNode?.children || []).map(
          (item) => {
            const slug = path.length === 0 ? item : item.slug;
            const title =
              path.length === 0 ? postingTree[item]?.title : item.title;
            const handleClick = () =>
              path.length === 0
                ? handleSelectRoot(slug)
                : handleSelectChild(slug);

            return (
              <div
                key={slug}
                onClick={handleClick}
                className="cursor-pointer flex justify-between items-center bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-3 transition-all"
              >
                <span className="text-gray-800 font-medium">{title}</span>
                <ChevronRight size={18} className="text-gray-500" />
              </div>
            );
          }
        )}
      </div>

      {/* 🔸 Alt kategori yoksa uyarı */}
      {path.length > 0 && !currentNode?.children?.length && (
        <div className="text-gray-500 text-center mt-10">
          Alt kategori bulunamadı.
        </div>
      )}
    </div>
  );
}
