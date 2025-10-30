import { useState } from "react";
import categories from "../data/categories";

export default function Arama() {
  const [path, setPath] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const currentNode = path.reduce((acc, key) => acc?.children?.[key], categories);

  const handleCategoryClick = (key) => {
    if (currentNode?.children?.[key]) {
      setPath([...path, key]);
      setSearchTerm("");
    }
  };

  const handleBack = () => {
    setPath(path.slice(0, -1));
    setSearchTerm("");
  };

  const filteredCategories = Object.entries(currentNode?.children || {}).filter(
    ([key, value]) =>
      key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      value?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-88px)] flex flex-col items-center bg-white pt-6 pb-24 px-4">
      {/* Başlık */}
      <h2 className="text-lg font-semibold mb-4 text-center">Arama</h2>

      <div className="w-full max-w-md">
        {/* Arama kutusu */}
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 shadow-sm mb-4">
          <input
            type="text"
            placeholder="Kategori veya ilan adı ile ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
          />
          {/* Mikrofon aktif ve görünür */}
          <button
            className="text-orange-500 ml-2 hover:text-orange-600 transition"
            title="Sesli Arama"
          >
            🎤
          </button>
        </div>

        {/* Geri - Ana Sayfa */}
        {path.length > 0 && (
          <div className="flex justify-start items-center gap-3 text-sm text-gray-600 mb-2">
            <button onClick={handleBack} className="text-blue-600 font-medium">
              ← Geri
            </button>
            <span>/</span>
            <button onClick={() => setPath([])} className="text-blue-600 font-medium">
              Ana Sayfa
            </button>
          </div>
        )}

        {/* Kategoriler */}
        <div className="grid gap-2">
          {filteredCategories.length > 0 ? (
            filteredCategories.map(([key, value]) => (
              <div
                key={key}
                onClick={() => handleCategoryClick(key)}
                className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-3 cursor-pointer transition"
              >
                <span className="text-gray-700 font-medium">{value.title}</span>
                <span className="text-gray-400">›</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">Alt kategori bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
}
