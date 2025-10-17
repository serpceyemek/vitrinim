import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Car, Briefcase, BookOpen, Users, Wrench, PawPrint } from "lucide-react";

export default function NewListing() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Emlak",
      desc: "Konut, İş Yeri, Arsa, Konut Projeleri",
      icon: <Home className="w-6 h-6 text-orange-500" />,
    },
    {
      name: "Vasıta",
      desc: "Otomobil, SUV & Pickup, Motosiklet",
      icon: <Car className="w-6 h-6 text-orange-500" />,
    },
    {
      name: "İş İlanları",
      desc: "Avukatlık, Eğitim, Eğlence, Danışmanlık",
      icon: <Briefcase className="w-6 h-6 text-orange-500" />,
    },
    {
      name: "Yedek Parça, Aksesuar, Donanım & Tuning",
      desc: "Otomotiv ekipmanları, Motosiklet aksesuarları",
      icon: <Wrench className="w-6 h-6 text-orange-500" />,
    },
    {
      name: "Özel Ders Verenler",
      desc: "Lise & Üniversite, İlkokul & Ortaokul",
      icon: <BookOpen className="w-6 h-6 text-orange-500" />,
    },
    {
      name: "Hayvanlar Alemi",
      desc: "Evcil hayvanlar, Akvaryum balıkları, kuşlar",
      icon: <PawPrint className="w-6 h-6 text-orange-500" />,
    },
    {
      name: "Yardımcı Arayanlar",
      desc: "Bebek, yaşlı, hasta bakıcısı ilanları",
      icon: <Users className="w-6 h-6 text-orange-500" />,
    },
  ];

  return (
    <section className="mx-auto max-w-screen-md px-4 py-6">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">İlan Ver</h1>
        <p className="text-gray-600 mt-1">Adım adım kategori seçimi</p>
      </header>

      <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow-sm overflow-hidden">
        {categories.map((cat, idx) => (
          <li
            key={idx}
            onClick={() => navigate(`/ilan-ver/${cat.name.toLowerCase().replace(/ /g, "-")}`)}
            className="flex items-center justify-between p-4 hover:bg-orange-50 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-3">
              {cat.icon}
              <div>
                <p className="font-medium">{cat.name}</p>
                <p className="text-gray-500 text-sm">{cat.desc}</p>
              </div>
            </div>
            <span className="text-gray-400">{">"}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
