// src/pages/NewListing.jsx
import { useState, useMemo, useRef, useEffect } from "react";
import { postingTree } from "../data/postingTree";
import { ChevronRight, Search, Mic } from "lucide-react";

export default function NewListing() {
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // --- Mikrofon kurulumu (Web Speech API)
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recog = new SpeechRecognition();
    recog.lang = "tr-TR";
    recog.interimResults = false;
    recog.maxAlternatives = 1;

    recog.onresult = (e) => {
      const spoken = e.results[0][0].transcript;
      setQuery((prev) => (prev ? prev + " " + spoken : spoken));
      setListening(false);
    };
    recog.onerror = () => setListening(false);
    recog.onend = () => setListening(false);

    recognitionRef.current = recog;

    return () => {
      try {
        recognitionRef.current?.stop();
      } catch {}
      recognitionRef.current = null;
    };
  }, []);

  const toggleListen = () => {
    const recog = recognitionRef.current;
    if (!recog) return;
    if (listening) {
      try {
        recog.stop();
      } catch {}
      setListening(false);
    } else {
      try {
        recog.start();
        setListening(true);
      } catch {
        setListening(false);
      }
    }
  };

  // --- Kategoriler
  const rootKeys = useMemo(
    () => Object.keys(postingTree).filter((k) => !k.includes("/")),
    []
  );

  const filteredRoots = useMemo(() => {
    if (!query.trim()) return rootKeys;
    return rootKeys.filter((rk) =>
      postingTree[rk]?.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [rootKeys, query]);

  return (
    <div className="min-h-[calc(100vh-88px)] bg-white py-8">
      {/* Başlık */}
      <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
        İlan Ver
      </h1>

      {/* Arama kutusu */}
      <div className="max-w-[760px] mx-auto px-4 mb-6">
        <div className="relative flex items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kategori ara..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-20 outline-none focus:ring-2 focus:ring-orange-400"
          />
          {/* Mikrofon butonu */}
          <button
            onClick={toggleListen}
            title={listening ? "Mikrofon dinliyor" : "Sesli arama başlat"}
            className={`absolute right-10 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition ${
              listening ? "bg-orange-100 text-orange-600" : "text-orange-500"
            }`}
          >
            <Mic size={18} />
          </button>
          {/* Büyüteç ikonu */}
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* Kategori listesi */}
      <div className="max-w-[760px] mx-auto px-4">
        <div className="flex flex-col gap-3">
          {filteredRoots.map((rk) => (
            <button
              key={rk}
              className="flex justify-between items-center w-full bg-gray-100 hover:bg-gray-200 rounded-xl px-4 py-4 text-left transition"
            >
              <span className="text-gray-800 font-medium">
                {postingTree[rk]?.title || rk}
              </span>
              <ChevronRight size={18} className="text-gray-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
